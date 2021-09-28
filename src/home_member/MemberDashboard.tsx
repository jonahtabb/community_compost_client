import { Component } from "react";
import {
    BrowserRouter as Switch,
    Route,
    Redirect,
    withRouter,
    RouteComponentProps,
    Link,
} from "react-router-dom";
import {
    CommunityMembers,
    CommunityProfile,
    MemberFullInfo,
    MemberProfile,
    MemberProfileOptions,
    PickupGroup,
    PickupGroups,
    SetMemberProfile,
    SetUserProfile,
    User,
    UserProfileOptions,
} from "../types";
import { camelToSentenceConverter, dayConverterNumToString, updateOwnUserProfile } from "../helpers";
import { isThisTypeNode } from "typescript";
import { updateOwnMemberProfile } from "../helpers/updateOwnMemberProfile";

/* 
    Member Dashboard Component
    This component is a practice in dynamic mapping to display the data in JSX.  
    The key-names of objects are copied and processed to display human-readable labels and to retrieve object values.

    Positives:
    This means that data models can be modified server-side and this component will still dynamically display the data.
    Copying and pasting JSX is unnecessary - Saves writing repetitive JSX divs.

    Draw-backs:
    Updates to data models still require updates to type information.
    Readability and 'code cleanliness' suffer in some ways.

    Challenges and Thoughts:
    It was a challenge to set up type checks for string variables used dynamic names of an object keys.

    Also - if you are reading this and have an opinion or suggestion, I would love to know!  
    I am learning what makes sense, and what doesn't - your input is appreciated.
*/

type MemberDashboardProps = 
    RouteComponentProps &
    { userProfile: User } & 
    { setUserProfile: SetUserProfile} &
    { memberProfile: MemberProfile } & 
    { communityProfile: CommunityProfile } & 
    { setMemberProfile: SetMemberProfile } &
    { pickupGroup: PickupGroup }

type MemberDashboardState = { canEditProfile: boolean };

class MemberDashboard extends Component<
    MemberDashboardProps,
    MemberDashboardState
> {
    constructor(props: MemberDashboardProps) {
        super(props);
        this.state = {
            canEditProfile: false,
        };
    }

    // Handles clicking the 'Edit Profile' Button
    handleEditClick = () => {

        this.setState({
            canEditProfile: true
        });
    };

    // Handles clicking the 'Save Profile' Button
    handleSaveClick = () => {
        const token = localStorage.getItem("token")
        if(token){
            updateOwnMemberProfile(token, this.props.memberProfile)
            updateOwnUserProfile(token, this.props.userProfile)
            
        }
        
        this.setState({
            canEditProfile: false
        })
    }

    /*  Documentation source for the custom type checks.  
        https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates 
    */

    //  Custom type guard for UserProfile object keys
    isUserProfileOption = (
        keyName: any
    ): keyName is UserProfileOptions => {
        return (keyName as UserProfileOptions) !== undefined
    }

    //  Handles onChange of UserProfile input fields
    updateUserFormInputState = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if(this.isUserProfileOption(e.target.name)) {
            let stateName = e.target.name;
            let stateValue: string = e.target.value;
            this.props.setUserProfile(stateName, stateValue)
        }
    }

    //  Custom type guard for MemberProfile object keys
    isMemberProfileOption = (
        keyName: any
    ): keyName is MemberProfileOptions => {
        return (keyName as MemberProfileOptions) !== undefined;
    };

    //  Handles onChange of MemberProfile input fields
    updateMemberFormInputState = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (this.isMemberProfileOption(e.target.name)) {
            let stateName = e.target.name;
            let stateValue: string = e.target.value;
            this.props.setMemberProfile(stateName, stateValue);
        }
    };

    render() {

        //Pre-process UserData Object for Display

        // Copy the UserProfile object, removing values we don't want to display
        const { id, ...displayUserData } = this.props.userProfile;
        // Create an array copy of the UserProfile so it can be mapped in JSX
        let mappableUserData = Object.entries(displayUserData)
            .map((user) => {
                const uglyKey = typeof user[0] === "string" ? user[0] : ""; 
                let prettyKey = camelToSentenceConverter(user[0])
                // Literal indexing for values
                let newIndex
                switch (uglyKey) {
                    case "firstName":
                        newIndex = 0;
                        break;
                    case "lastName":
                        newIndex = 1;
                        break;
                    default:
                        newIndex = 2
                }
                return [prettyKey, user[1], newIndex, uglyKey];
            })
            //Sort based on the newIndex
            .sort((a, b) => a[2] - b[2]);

        //Pre-process MemberProfile Data for Display

        // Copy the MemberProfile object, removing values we don't want to display
        let {pickupGroupId, ...filteredMemberData} = this.props.memberProfile
        // Create an array copy of the UserProfile so it can be mapped in JSX
        let mappableMemberData = 
            Object.entries(filteredMemberData).map(
                (member) => {
                    //Prettify and Format Member Profile Keys
                    let prettyKey = camelToSentenceConverter(member[0])

                    //Typegaurd for ugly key
                    const uglyKey = typeof member[0] === "string" ? member[0] : "";

                    //Custom formats and exceptions for Key display
                    if (uglyKey === "locationName") {
                        prettyKey = "Location Name"
                    } else if ( uglyKey.includes('location')) {
                        prettyKey = prettyKey.split(" ").slice(1, 3).join(" ")
                    }

                    return [prettyKey, member[1], uglyKey];
                }
            )

        return (
            <div className="member-dash-container">
                <h2>Member Dashboard</h2>
                <div className="member-dash-card">
                    <h3>Welcome {this.props.userProfile.firstName}!</h3>
                    <div className="member-dash-card-section">
                        <div className="row">
                            <div className="col">
                                <p><strong>Your Community:</strong></p>
                                <p>{this.props.communityProfile.communityName}</p>
                                <p>{this.props.communityProfile.communityDescription}</p>
                            </div>
                            <div className="col">
                                <p><strong>Your Pickup Group:</strong></p>
                                <p>{this.props.pickupGroup.name || "None Assigned"}</p>
                                <p>
                                    Pickups are on{" "}
                                    {dayConverterNumToString(this.props.pickupGroup.day)}{" "}
                                    from{" "}{this.props.pickupGroup.startTime}{" "}to{" "}
                                    {this.props.pickupGroup.endTime}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="member-dash-card">
                    <div className="member-dash-card-section">
                        <p>Profile</p>
                        {/* Edit-Save Profile Buttons */}
                        {this.state.canEditProfile 
                            ?   <button onClick={() => this.handleSaveClick() } className="link-button-small">Save Profile</button>
                            :   <button onClick={() => this.handleEditClick()} className="link-button-small">Edit Profile</button>
                        }

                        <div className="member-profile-container">
                            {/* Map and display user data */}
                            {
                                <form className= "member-edit-container">
                                    {mappableUserData.map((user, index) => {
                                        //Define Dynamic key name to retrieve value from userProfile state
                                        let keyName = this.isUserProfileOption(user[3]) ? user[3] : "id";

                                        return (
                                            <div key={`userData${index}`} className="container">
                                                <div className="row">
                                                    <div className="col">
                                                        <label
                                                            htmlFor={user[3]}
                                                            className="my-3"
                                                            style={{fontWeight: "bold"}}
                                                        >
                                                            {user[0]} 
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <input
                                                            name={user[3]}
                                                            type="text"
                                                            className="my-3"
                                                            value={ this.props.userProfile[keyName] || "" }
                                                            onChange={(e) => this.updateUserFormInputState(e)}
                                                            disabled = {!this.state.canEditProfile}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </form>
                            }

                            {/* Map and display member profile data */}

                            {
                                //{Map and Display Member Profile Data}
                                <form className= "member-edit-container">
                                    {mappableMemberData.map((member, index) => {
                                        //Define Dynamic key name to retrieve value from memberProfile state
                                        let keyName: MemberProfileOptions = this.isMemberProfileOption(member[2]) ? member[2] : "bio";

                                        return (
                                            <div
                                                key={`memberProfile${index}`}
                                                className="container"
                                            >
                                                <div className="row">
                                                    <div className="col">
                                                        <label
                                                            htmlFor={member[2]}
                                                            className="my-3"
                                                            style={{fontWeight:"bold"}}
                                                        >
                                                            {member[0]}
                                                        </label>
                                                    </div>
                                                    <div className="col-sm-8">
                                                        <input
                                                            name={member[2]}
                                                            type="text"
                                                            className="my-3"
                                                            value={this.props.memberProfile[keyName] || ""}
                                                            onChange={(e) => this.updateMemberFormInputState(e)}
                                                            disabled={!this.state.canEditProfile}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MemberDashboard);
