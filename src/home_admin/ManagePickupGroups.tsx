import '../App.css';
import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps, Link } from "react-router-dom";
import { MemberDetailed, MemberProfile, PickupGroupMembers, PickupGroups, UserDetailed } from '../types';
import { getAllMembersOfPickupGroup } from '../helpers';


type ManagePickupGroupsProps = 
    RouteComponentProps &
    {pickupGroups: PickupGroups}
    
type ManagePickupGroupsState = {
    pickupGroups: any[]
    
}

class ManagePickupGroups extends Component<ManagePickupGroupsProps, ManagePickupGroupsState>{
    constructor(props:ManagePickupGroupsProps){
        super(props)
        this.state = {
            pickupGroups: []

    }
}
    test = async () => {
        let token = localStorage.getItem("token")
        if (token) {
            let groups = this.props.pickupGroups
            let pickupGroups = []
            for (let i = 0 ; i < groups.length; i++) {
                let groupId = groups[i].id
                let res = await getAllMembersOfPickupGroup(token, groupId)
                let members = await res.members

                
                let groupMembers = await members.map((member: any) => ({
                    userDetailed: {
                        id: member.User.id,
                        email: member.User.email,
                        firstName: member.User.first_name,
                        lastName: member.User.last_name
                    },
                    memberProfile: {
                        secondaryEmail: member.email_secondary || '',
                        primaryPhone: member.phone_primary || '',
                        primaryPhoneType: member.phone_primary_type || '',
                        secondaryPhone: member.phone_secondary || '',
                        secondaryPhoneType: member.phone_secondary_type || '',
                        bio: member.bio || '',
                        locationName: member.location_name || '',
                        locationAddress1: member.location_address1 || '',
                        locationAddress2: member.location_address2 || '',
                        locationCity: member.city || '',
                        locationZip: member.location_zip || '',
                        locationState: member.location_state || '',
                        locationNotes: member.location_note || '',
                    }

                }))
                let pickupGroup = {
                    groupId: groupId,
                    groupMembers: await groupMembers
                }
                pickupGroups.push(pickupGroup)
            }
            console.info(pickupGroups)
            this.setState({
                pickupGroups: pickupGroups
            })
        }
    }

    render(){
        return (
            <>
            <h3>Manage Pickup Groups</h3>
            <button onClick={this.test}>Test fetch</button>
            {this.state.pickupGroups.map(group => (
                <div>
                    <h2>{group.groupId}</h2>
                    {group.groupMembers.map((member: any)=> (
                        <p>{member.userDetailed.firstName}</p>
                    ))}
                </div>
            ))
            }
        
            </>
            )
    }
}

export default withRouter(ManagePickupGroups)