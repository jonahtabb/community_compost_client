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
    MemberFullInfo,
    PickupGroup,
    PickupGroups,
    SetMemberGroup,
} from "../types";

type ManagePickupGroupsProps = RouteComponentProps & {
    pickupGroups: PickupGroups;
} & { communityMembers: CommunityMembers } & { setMemberGroup: SetMemberGroup };

type ManagePickupGroupsState = { dropdownOpen: boolean };

class ManagePickupGroups extends Component<
    ManagePickupGroupsProps,
    ManagePickupGroupsState
> {
    constructor(props: ManagePickupGroupsProps) {
        super(props);
        this.state = {
            dropdownOpen: false,
        };
    }

    render() {
        return (
            <>
                <h3>Manage Pickup Groups</h3>
                {this.props.pickupGroups.map((group: PickupGroup) => (
                    <div key={`group${group.id}`}>
                        {/* Group Header Info */}
                        <div className="card-header-container">
                            <div>
                                <p
                                    key={`groupid${group.id}`}
                                    className="card-header-title"
                                >
                                    {group.name}
                                </p>
                                <div className="card-header-title-underline"></div>
                            </div>
                        </div>
                        {/* Group Members */}
                        <div className="card-content-container">
                            {this.props.communityMembers
                                .filter(
                                    (member: MemberFullInfo) =>
                                        member.memberProfile.pickupGroupId ===
                                        group.id
                                )
                                .map((member: MemberFullInfo) => (
                                    <div
                                        className="container pickup-group-container"
                                        key={`userid${member.userProfile.id}`}
                                    >
                                        <div className="row">
                                            <div className="col my-auto">
                                                <p className="group-member-text">
                                                    <strong>{`${member.userProfile.firstName} ${member.userProfile.lastName}`}</strong> | {`${member.memberProfile.locationAddress1}`}
                                                </p>
                                            </div>
                                            <div className="dropdown col my-1">
                                                <button className="dropbtn">
                                                    Change Group
                                                </button>
                                                <div className="dropdown-content">
                                                    {/* Dropdown list of pick-up groups */}
                                                    {this.props.pickupGroups
                                                        //Only display groups that member does not belong to
                                                        .filter(
                                                            (
                                                                group: PickupGroup
                                                            ) =>
                                                                group.id !==
                                                                member
                                                                    .memberProfile
                                                                    .pickupGroupId
                                                        )
                                                        //Display available pickup groups in dropdown
                                                        .map(
                                                            (
                                                                group: PickupGroup
                                                            ) => (
                                                                <button
                                                                    key={`groupbutton${group.id}`}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        this.props.setMemberGroup(
                                                                            member
                                                                                .userProfile
                                                                                .id,
                                                                            group.id
                                                                        );
                                                                    }}
                                                                >
                                                                    {group.name}
                                                                </button>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            {/* Members not assigned to group */}
                        </div>
                    </div>
                ))}
                {/* Unassigned Members */}
                {
                    <div style={{marginBottom: "100px"}}>
                        {/* Unassigned Header */}
                        <div className="card-header-container">
                            <div>
                                <p className="card-header-title">Unassigned</p>
                                <div className="card-header-title-underline"></div>
                            </div>
                        </div>
                        {/* Unassigned Members */}
                        <div className="card-content-container">
                            {this.props.communityMembers
                                .filter(
                                    (member: MemberFullInfo) =>
                                        !member.memberProfile.pickupGroupId
                                )
                                .map((member: MemberFullInfo) => (
                                    <div
                                        className="container"
                                        key={`userid${member.userProfile.id}`}
                                    >
                                        <div className="row">
                                            <div className="col my-auto">
                                                <p className="group-member-text">
                                                <strong>{`${member.userProfile.firstName} ${member.userProfile.lastName}`}</strong> | {`${member.memberProfile.locationAddress1}`}
                                                </p>
                                            </div>
                                            <div className="dropdown col my-1">
                                                <button className="dropbtn">
                                                    Change Group
                                                </button>
                                                <div className="dropdown-content">
                                                    {/* Dropdown list of pick-up groups */}
                                                    {this.props.pickupGroups
                                                        //Display available pickup groups in dropdown
                                                        .map(
                                                            (
                                                                group: PickupGroup
                                                            ) => (
                                                                <button
                                                                    key={`groupbutton${group.id}`}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        this.props.setMemberGroup(
                                                                            member
                                                                                .userProfile
                                                                                .id,
                                                                            group.id
                                                                        );
                                                                    }}
                                                                >
                                                                    {group.name}
                                                                </button>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default withRouter(ManagePickupGroups);
