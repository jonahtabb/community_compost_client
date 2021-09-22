import '../App.css';
import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps } from "react-router-dom";
import { getOwnAdminProfile, getOwnCommunityProfile, getOwnUserData, getAllCommunityMembers, getAllPickupGroups } from '../helpers';
import {AdminProfile, CommunityProfile, User, MemberProfile, CommunityMembers, PickupGroups} from '../types'
import { AdminDashboard } from '.';
import ManagePickupGroups from './ManagePickupGroups';

type AdminHomeProps = {} & RouteComponentProps
type AdminHomeState = 
    {userData: User} & 
    {adminProfile: AdminProfile} &
    {communityProfile: CommunityProfile} &
    {communityMembers: CommunityMembers} &
    {pickupGroups: PickupGroups}

class AdminHome extends Component<AdminHomeProps, AdminHomeState>{
    constructor(props: AdminHomeProps){
        super(props)
        this.state = {
            userData: {
                email: '',
                firstName: '',
                lastName: ''
            },
            adminProfile: {
                secondaryEmail: '',
                phone: '',
                phoneType: '',
                bio: ''
            },
            communityProfile:{
                communityName: '',
                communityDescription: ''
            },
            communityMembers: [],
            pickupGroups: []
        }
    }

    async componentDidMount(){
        const token = localStorage.getItem("token")
        const isAdmin = localStorage.getItem("isAdmin")
        if (token) {
            //Get own user data
            const userResponse = await getOwnUserData(token)
            const {email, first_name, last_name} = userResponse.userData

            //Get own admin profile data
            const adminResponse = await getOwnAdminProfile(token)
            const {secondary_email, phone, phone_type, bio } = adminResponse.adminProfile

            //Get own community profile data
            const communityResponse = await getOwnCommunityProfile(token)
            const {name, description} = await communityResponse.communityProfile

            //Get a list of all members belonging to own community
            const membersResponse = await getAllCommunityMembers(token)
            let communityMembers = await membersResponse.allMembers.map((member: any )=> (
                {
                    userId: member.User.id,
                    email: member.User.email,
                    firstName: member.User.first_name,
                    lastName: member.User.last_name,
                    phonePrimary: member.phone_primary,
                    locationAddress1: member.location_address1,
                    locationAddress2: member.location_address2,
                    locationCity: member.location_city,
                    locationName: member.location_name

                }
            ))

            //Get a list of all pickup groups belonging to the community
            const groupsResponse = await getAllPickupGroups(token)
            let pickupGroups = await groupsResponse.pickupGroups.map((group: any) => (
                {
                    id: group.id,
                    name: group.name,
                    description: group.description,
                    publicNotes: group.public_notes,
                    startTime: group.start_time,
                    endTime: group.end_time,
                    day: group.day
                }
            ))

            this.setState({
                userData:{
                    email: email,
                    firstName: first_name,
                    lastName: last_name
                },
                adminProfile:{
                    secondaryEmail: secondary_email,
                    phone: phone,
                    phoneType: phone_type,
                    bio: bio
                },
                communityProfile:{
                    communityName: name,
                    communityDescription: description
                },
                communityMembers: communityMembers,
                pickupGroups: pickupGroups
            })
        }

    }

    render(){
        return(
            <div>
                                <h2>Admin Home</h2>
                <button onClick={()=> {console.log(this.state)}}>Check Admin Home State</button>
                <button onClick={()=> {console.log(this.props.match.path)}}>Check Admin Home Path</button>
                
                <Switch>
                <Redirect to={`${this.props.match.path}/dashboard`} />

                    <Route exact path ={`${this.props.match.path}/dashboard`}>     
                        <AdminDashboard 
                            communityProfile={this.state.communityProfile}
                            communityMembers={this.state.communityMembers}
                            pickupGroups={this.state.pickupGroups}
                        />
                    </Route>
                    <Route exact path ={`${this.props.match.path}/groups`}>
                        <ManagePickupGroups 
                            pickupGroups = {this.state.pickupGroups}
                        />
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default withRouter(AdminHome)