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

/*  Welcome to the Manage Pickup Groups Component!
    You've notices that there is a lot of chained filtering, sorting and mapping! 
    One of my goals for this project has been to experiment with different levels of display my mapping.
    This has been useful for me to access the practicality, readability displaying the data using different approaches.

*/

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
        /*  
            Pre-sort and / or copy the arrays that will be used for mapping and filtered in the JSX return.
            This avoids trying to mutate the original arrays which is stored in state.
            The also maps the mapping and filtering look a little cleaner, and provides a 'table of contents' of the arrays that will be used below.
            I've noticed that destructuring of a full array automatically passes the type info into the duplicated array - that's cool!
        */  
        const pickupGroups = [...this.props.pickupGroups].sort((a,b)=>(+(a.id || 0) - +(b.id || 0)))
        const communityMembers = [...this.props.communityMembers]
        
        return (
            <>
                <h3>Manage Pickup Groups</h3>
                {/* Sort, Map, and Display the name of each pickup group */}
                {/* Note: this .sort() method just below only sorts by group id. An additional order field should be added for proper sorting */}
                {pickupGroups.map((group: PickupGroup) => (
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
                            {communityMembers
                            //Filter the group members to only display members from this pickup group
                                .filter(
                                    (member: MemberFullInfo) =>
                                        member.memberProfile.pickupGroupId ===
                                        group.id
                                )
                            //Map over the filtered members to display details from each member
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
                                                    {pickupGroups
                                                        //Filter the list of Pickup Groups to remove the group that the member currently belongs to
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

                        </div>
                    </div>
                ))}
                {/* Unassigned Members */}
                {
                    <div style={{marginBottom: "100px"}}>
                        {/* Unassigned Member Header */}
                        <div className="card-header-container">
                            <div>
                                <p className="card-header-title">Unassigned</p>
                                <div className="card-header-title-underline"></div>
                            </div>
                        </div>
                        {/* Unassigned Members */}
                        <div className="card-content-container">
                            {communityMembers
                            // Filter the array of members to display only members who do not have a Pickup Group (PickupGroupId === null)
                                .filter(
                                    (member: MemberFullInfo) =>
                                        !member.memberProfile.pickupGroupId
                                )
                            //Map over the filtered member array to display details about each unassigned member
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
                                                    {pickupGroups
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
