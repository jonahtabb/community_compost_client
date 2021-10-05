import { Component } from "react";
import {
    RouteComponentProps, withRouter
} from "react-router-dom";
import { Weather } from ".";
import { camelToSentenceConverter, dayConverterNumToString, updateOwnUserProfile } from "../helpers";
import { updateOwnMemberProfile } from "../helpers/updateOwnMemberProfile";
import {
    CommunityProfile, MemberProfile,
    MemberProfileOptions,
    PickupGroup, SetMemberProfile,
    SetUserProfile,
    User,
    UserProfileOptions
} from "../types";

/* 
    Member Dashboard Component
    This component is a practice in dynamic mapping to display the data in JSX.  
    The key-names of objects are copied and processed to display human-readable labels.

    Positives:
    This means that data models can be modified server-side and this component will still dynamically display the data.
    Copying and pasting JSX is unnecessary - Saves writing repetitive JSX divs.

    Draw-backs:
    Updates to data models still require updates to type information.
    Readability and 'code cleanliness' suffer in some ways.
    I am unsure if this would have performance issues for large amounts of data

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

    //Pre-process UserData Object for Display
    makeUserDataReady = (userProfile: User): any[][] => {
        // Copy the UserProfile object, removing values we don't want to display
        const { id, ...displayUserData } = userProfile;
        // Create an array copy of the UserProfile so it can be mapped in JSX
        let mappableUserData = Object.entries(displayUserData)
            .map((user, index) => {
                //Store the original index for future reference if necessary
                const originalIndex = index

                //Store the value
                const value = user[1]

                //Store and typegaurd the ugly key (original key)
                const uglyKey = typeof user[0] === "string" ? user[0] : ""; 
                let prettyKey = camelToSentenceConverter(user[0])
                
                //Custom sort display order by literal indexing
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
                return [originalIndex, newIndex, uglyKey, prettyKey, value ];
            })
            //Sort based on the newIndex
            .sort((a, b) => a[1] - b[1]);
        
            return mappableUserData
    }

    //Pre-process MemberProfile Data for Display
    makeMemberDataReady = (memberProfile: MemberProfile): any[][] => {
        // Copy the MemberProfile object, removing values we don't want to display
        let {pickupGroupId, ...filteredMemberData} = memberProfile
        // Create an array copy of the UserProfile so it can be mapped in JSX
        let mappableMemberData = 
            Object.entries(filteredMemberData).map(
                (member, index) => {
                    const originalIndex = index
                    const value = member[1]
                    const uglyKey = typeof member[0] === "string" ? member[0] : "";

                    //New Index Can be used with a switch to re-sort display order. 
                    //Currently we are not doing any custom sorting for the MemberProfile Data
                    let newIndex
                    newIndex = index

                    //Prettify and Format Member Profile Keys
                    let prettyKey = camelToSentenceConverter(member[0])

                    //Custom formats and exceptions for Key display
                    if (uglyKey === "locationName") {
                        prettyKey = "Location Name"
                    } else if ( uglyKey.includes('location')) {
                        prettyKey = prettyKey.split(" ").slice(1, 3).join(" ")
                    }

                    return [originalIndex, newIndex, uglyKey, prettyKey, value];
                }
            )
        
        return mappableMemberData
    }

    render() {

        return (
            <div className="member-dash-container">
                
                <h2>Member Dashboard</h2>

                {/* Overview Card */}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <div className="member-dash-card">
                                <h3>Welcome {this.props.userProfile.firstName}!</h3>
                                <div className="member-dash-card-section">
                                    <div className="row">
                                        <div className="col-sm">
                                            <p><strong>Your Community:</strong></p>
                                            <p>{this.props.communityProfile.communityName}</p>
                                            <p>{this.props.communityProfile.communityDescription}</p>
                                        </div>
                                        <div className="col">
                                            <p><strong>Your Pickup Group:</strong></p>
                                            {
                                                this.props.pickupGroup.name ?
                                                    <>
                                                        <p>{this.props.pickupGroup.name}</p>
                                                        <p>
                                                            Pickups are on{" "}
                                                            {dayConverterNumToString(this.props.pickupGroup.day)}{" "}
                                                            from{" "}{this.props.pickupGroup.startTime}{" "}to{" "}
                                                            {this.props.pickupGroup.endTime}
                                                        </p>
                                                    </>

                                                : <p>Your Coordinator must assign you a pickup group.</p> 
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>  
                        </div>


                        {/* Weather Card */}
                        <div className="col-md">
                            <Weather />
                        </div>


                    
                        {/* Member Profile Card */}
                        <div className="col-12">
                            <div className="member-dash-card">
                            <div className="member-dash-card-section">
                                <h1>Your Member Profile</h1>
                                {/* Edit-Save Profile Buttons */}
                                {this.state.canEditProfile 
                                    ?   <button onClick={() => this.handleSaveClick() } className="link-button-small my-3">Save Profile</button>
                                    :   <button onClick={() => this.handleEditClick()} className="link-button-small my-3">Edit Profile</button>
                                }

                                <div className="member-profile-container">
                                    {/* Map and display user data */}
                                    {
                                        <form className= "member-edit-container">
                                            {this.makeUserDataReady(this.props.userProfile).map((user) => {
                                                
                                                const [originalIndex, newIndex, uglyKey, prettyKey, value] = user
                                                        
                                                return (
                                                    <div key={`userData${newIndex}`} className="container">
                                                        <div className="row">
                                                            <div className="col">
                                                                <label
                                                                    htmlFor={uglyKey}
                                                                    className="my-3"
                                                                    style={{fontWeight: "bold"}}
                                                                >
                                                                    {prettyKey} 
                                                                </label>
                                                            </div>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    name={uglyKey}
                                                                    type="text"
                                                                    className="my-3"
                                                                    value={ value }
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
                                            {this.makeMemberDataReady(this.props.memberProfile).map((member) => {
                                            
                                                const [originalIndex, newIndex, uglyKey, prettyKey, value] = member

                                                return (
                                                    <div
                                                        key={`memberProfile${newIndex}`}
                                                        className="container"
                                                    >
                                                        <div className="row">
                                                            <div className="col">
                                                                <label
                                                                    htmlFor={uglyKey}
                                                                    className="my-3"
                                                                    style={{fontWeight:"bold"}}
                                                                >
                                                                    {prettyKey}
                                                                </label>
                                                            </div>
                                                            <div className="col-sm-8">
                                                                <input
                                                                    name={uglyKey}
                                                                    type="text"
                                                                    className="my-3"
                                                                    value={value}
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
                    
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(MemberDashboard);
