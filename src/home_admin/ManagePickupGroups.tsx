import '../App.css';
import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps, Link } from "react-router-dom";
import { CommunityMembers, MemberDetailed, MemberFullInfo, MemberProfile, PickupGroup, PickupGroupMembers, PickupGroups, SetMemberGroup, UserDetailed } from '../types';
import { getAllMembersOfPickupGroup } from '../helpers';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



type ManagePickupGroupsProps = 
    RouteComponentProps &
    {pickupGroups: PickupGroups} &
    {communityMembers: CommunityMembers} &
    {setMemberGroup: SetMemberGroup}
    
type ManagePickupGroupsState = {dropdownOpen: boolean}

class ManagePickupGroups extends Component<ManagePickupGroupsProps, ManagePickupGroupsState>{
    constructor(props:ManagePickupGroupsProps){
        super(props)
        this.state = {
            dropdownOpen: false
        }
}


   
    render(){
        return (
            <>
            <h3>Manage Pickup Groups</h3>

            {/* <button onClick={this.test}>Test fetch</button> */}
            {
                this.props.pickupGroups.map((group: PickupGroup )=> (
                    <div>
                        {/* Group Header Info */}
                        <div className="card-header-container">
                            <div>
                            <p key={`groupid${group.id}`} className="card-header-title">
                                {group.name}
                            </p>
                            <div className="card-header-title-underline"></div>

                            </div>
                            
                        </div>
                        {/* Group Members */}
                        <div className="card-content-container">
                        {
                            
                            this.props.communityMembers
                            .filter((member: MemberFullInfo ) => (
                                member.memberProfile.pickupGroupId === group.id)
                            )
                            .map((member: MemberFullInfo) => (
                                <h3 className="card-content-header" key={`userid${member.userProfile.id}`}>
                                    {
                                        `${member.userProfile.firstName} ${member.userProfile.lastName} | ${member.memberProfile.locationAddress1}`
                                    }
                                    <div className="dropdown">
                                    <button className="dropbtn">Change Group</button>
                                        <div className="dropdown-content">
                                            {
                                                this.props.pickupGroups.map((group: PickupGroup) => (
                                                    <button onClick={(e) => {
                                                        let userId = member.userProfile.id;
                                                        let groupId = group.id
                                                        this.props.setMemberGroup(userId, groupId)
                                                    }}>{group.name}</button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </h3>
                            ))
                            
                        }   

                        {/* Members not assigned to group */}
                        
                        </div>
                    </div>
                ))
            }
        
            </>
            )
    }
}

export default withRouter(ManagePickupGroups)