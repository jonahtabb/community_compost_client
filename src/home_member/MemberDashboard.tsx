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
    PickupGroup,
    PickupGroups,
    User,
} from "../types";
import { dayConverterNumToString } from "../helpers";
import { isThisTypeNode } from "typescript";

type MemberDashboardProps = RouteComponentProps & { userData: User } & {
    memberProfile: MemberProfile;
} & { communityProfile: CommunityProfile };

type MemberDashboardState = {canEditProfile: boolean};

class MemberDashboard extends Component<
    MemberDashboardProps,
    MemberDashboardState
> {
    constructor(props: MemberDashboardProps) {
        super(props);
        this.state = {
            canEditProfile: false
        };
    }

    camelToSentenceConverter = (keyValue: string) => {
        let changeCase = keyValue.replace(/([A-Z\d])/g, " $1");
        return changeCase.charAt(0).toUpperCase() + changeCase.slice(1);
    };

    render() {
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
                        <p>{this.props.communityProfile.communityDescription}</p>
                    </div>
                </div>

                <div className="member-dash-card">
                    <div className="member-dash-card-section">
                        <p>Profile</p>
                        
                        {Object.entries(this.props.memberProfile).map(
                            (member) => {
                                //Format Field Names
                                let prettyKey = this.camelToSentenceConverter(
                                    member[0]
                                );
                                
                                prettyKey = member[0] === "pickupGroupId" ? 
                                    "Pick-up Group" :
                                    member[0].includes('location') ?
                                    prettyKey.split(' ')[1] : 
                                    prettyKey

                                return (
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                {
                                                    this.state.canEditProfile ?
                                                    <p>"EDIT" {prettyKey} </p>
                                                    : <p className="my-3" style={{fontWeight:"bold"}}>{prettyKey}</p>
                                                }
                                                
                                            </div>
                                            <div className="col">
                                                {
                                                    this.state.canEditProfile ?
                                                    <p>"EDIT"{member[1]}</p>
                                                    : <p className="my-3">{member[1]}</p>
                                                }
                                                
                                            </div>
                                        </div>

                                    </div>
                                   
                                );
                            }
                        )}
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
