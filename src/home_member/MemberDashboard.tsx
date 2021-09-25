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
    User,
} from "../types";
import { dayConverterNumToString } from "../helpers";
import { isThisTypeNode } from "typescript";

type MemberDashboardProps = RouteComponentProps & { userData: User } & {
    memberProfile: MemberProfile;
} & { communityProfile: CommunityProfile } & {
    setMemberProfile: SetMemberProfile;
};

type MemberDashboardState = { canEditProfile: boolean };

// type MemberProfileOptions = "secondaryEmail" | "primaryPhone" | "primaryPhoneType" | "secondaryPhone"

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

    camelToSentenceConverter = (keyValue: string) => {
        let changeCase = keyValue.replace(/([A-Z\d])/g, " $1");
        return changeCase.charAt(0).toUpperCase() + changeCase.slice(1);
    };

    handleEditClick = () => {
        this.setState((prevState) => ({
            ...prevState,
            canEditProfile: !prevState.canEditProfile,
        }));
    };

    //Documentation source.  Needs review https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

    isMemberProfileOption = (
        keyName: any
    ): keyName is MemberProfileOptions => {
        return (keyName as MemberProfileOptions) !== undefined;
    };

    updateMemberFormInputState = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        if (this.isMemberProfileOption(e.target.name)) {
            let stateName = e.target.name;
            let stateValue: string = e.target.value;
            this.props.setMemberProfile(stateName, stateValue);
        }
    };

    getMemberPropValue = (keyName: string): string | number => {
        if (this.isMemberProfileOption(keyName))
        return this.props.memberProfile[keyName] || ""
        else return ''
    };

    render() {
        //Pre-process UserData Object for Display

        const { id, ...displayUserData } = this.props.userData;
        let mappableUserData = Object.entries(displayUserData)
            .map((user) => {
                const uglyKey = typeof user[0] === "string" ? user[0] : "";
                let prettyKey = this.camelToSentenceConverter(user[0]);
                let newIndex =
                    user[0] === "firstName"
                        ? 0
                        : user[0] === "lastName"
                        ? 1
                        : 2;

                return [prettyKey, user[1], newIndex, uglyKey];
            })
            .sort((a, b) => a[2] - b[2]);

        //Pre-process MemberProfile Data for Display

        let mappableMemberData = Object.entries(this.props.memberProfile).map(
            (member) => {
                //Prettify and Format Member Profile Keys
                let prettyKey = this.camelToSentenceConverter(member[0]);


                //Custom formats and exceptions
                let numRegex = new RegExp("[d]", "g");
                prettyKey =
                    member[0] === "pickupGroupId"
                        ? "Pick-up Group"
                        : member[0].includes("location")
                        ? numRegex.test(member[0])
                            ? prettyKey.split(" ").slice(1, 3).join(" ")
                            : prettyKey.split(" ")[1]
                        : prettyKey;
                
                //Typegaurd for ugly key
                const uglyKey = typeof member[0] === "string" ? member[0] : "";

                return [prettyKey, member[1], uglyKey];
            }
        );

        return (
            <div className="member-dash-container">
                <h2>Member Dashboard</h2>
                <div className="member-dash-card">
                    <h3>Welcome {this.props.userData.firstName}!</h3>
                    <div className="member-dash-card-section">
                        <p>
                            <strong>Your Community:</strong>
                        </p>
                        <p>{this.props.communityProfile.communityName}</p>
                        <p>
                            {this.props.communityProfile.communityDescription}
                        </p>
                    </div>
                </div>

                <div className="member-dash-card">
                    <div className="member-dash-card-section">
                        <p>Profile</p>
                        <button onClick={() => this.handleEditClick()}>
                            Edit Profile
                        </button>
                        <div className="member-profile-container">
                            {/* Map and display user data */}
                            {this.state.canEditProfile ? (
                                <form>
                                    {mappableUserData.map((user, index) => {
                                        let keyValue = this.getMemberPropValue(
                                            user[3]
                                        );
                                        return (
                                            <div
                                                key={`userData${index}`}
                                                className="container"
                                            >
                                                <div className="row">
                                                    <div className="col">
                                                        <label
                                                            htmlFor={user[0]}
                                                            className="my-3"
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {user[0]}
                                                        </label>
                                                    </div>
                                                    <div className="col">
                                                        <input
                                                            name={user[0]}
                                                            type="text"
                                                            className="my-3"
                                                            value={keyValue}
                                                            onChange={(e) =>
                                                                this.updateMemberFormInputState(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </form>
                            ) : (
                                mappableUserData.map((user, index) => {
                                    //Format User Data Key

                                    return (
                                        <div
                                            key={`userData${index}`}
                                            className="container"
                                        >
                                            <div className="row">
                                                <div className="col">
                                                    <p
                                                        className="my-3"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {user[1]}
                                                    </p>
                                                </div>
                                                <div className="col">
                                                    <p className="my-3">
                                                        {user[1]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}

                            {/* Map and display member profile data */}

                            {
                                this.state.canEditProfile ?
                                <form>
                                   {
                                       mappableMemberData.map((member, index) => 
                                           {
                                                let keyName = this.isMemberProfileOption(member[2]) ? member[2] : "bio"

                                               return (
                                                <div
                                            key={`memberProfile${index}`}
                                            className="container"
                                        >
                                            <div className="row">
                                                <div className="col">

                                                        <label
                                                            htmlFor={typeof member[2] === "string" ? member[2] : '' }
                                                            className="my-3"
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            {member[0]}
                                                        </label>
                                   
                                                </div>
                                                <div className="col">
    
                                                        <input
                                                            name={typeof member[2] === "string" ? member[2] : ''}
                                                            type="text"
                                                            className="my-3"
                                                            value={this.props.memberProfile[keyName] || ''}
                                                            onChange={(e) =>
                                                                this.updateMemberFormInputState(
                                                                    e
                                                                )
                                                            }
                                                        />
                                                    
                                                </div>
                                            </div>
                                        </div>
                                               )

                                           }
                                        
                                    )


                                   } 
                                </form>

                                : mappableMemberData.map((member, index) => (
                                    <div
                                        key={`memberProfile${index}`}
                                        className="container"
                                    >
                                        <div className="row">
                                            <div className="col">
                                                    <p
                                                        className="my-3"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {member[0]}
                                                    </p>
                                    
                                            </div>
                                            <div className="col">

                             
                                             
                                                    <p className="my-3">
                                                        {member[1]}
                                                    </p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>

                    <div className="member-dash-card-section">
                        <p>
                            <strong>Your Community:</strong>
                        </p>
                        <p>{this.props.communityProfile.communityName}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(MemberDashboard);
