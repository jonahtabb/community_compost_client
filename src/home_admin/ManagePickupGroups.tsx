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
                    <div key={`group${group.id}`}>
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
                                <div className="container">
                                    <div className="row">
                                        <div className="col my-auto">
                                            <p className="group-member-text" key={`userid${member.userProfile.id}`}>
                                                {
                                                    `${member.userProfile.firstName} ${member.userProfile.lastName} | ${member.memberProfile.locationAddress1}`
                                                }
                                            </p>
                                        </div>
                                        {/* <div className="col-4 my-auto d-flex"> */}
                                        <div className="dropdown col my-1">
                                            <button className="dropbtn">Change Group</button>
                                                <div className="dropdown-content">
                                                    {/* Dropdown list of pick-up groups */}
                                                    {
                                                        this.props.pickupGroups
                                                            //Only display groups that member does not belong to
                                                            .filter((group:PickupGroup) => (
                                                                group.id !== member.memberProfile.pickupGroupId
                                                            ))
                                                            //Display available pickup groups in dropdown
                                                            .map((group: PickupGroup) => (
                                                            <button 
                                                                key={`groupbutton${group.id}`}
                                                                onClick={(e) => {
                                                                this.props.setMemberGroup(member.userProfile.id, group.id)
                                                                }}
                                                            >
                                                                {group.name}
                                                            </button>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        {/* </div> */}
                                        
                                    </div>


                                </div>


                                
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