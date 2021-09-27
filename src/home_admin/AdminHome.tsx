import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps, Link} from "react-router-dom";
import { getOwnAdminProfile, getOwnCommunityProfile, getOwnUserData, getAllCommunityMembers, getAllPickupGroups, updateMemberPickupGroup } from '../helpers';
import {AdminProfile, CommunityProfile, User, MemberProfile, CommunityMembers, PickupGroups, MemberFullInfo, SetMemberGroup} from '../types'
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
                id: null,
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

    setMemberGroup: SetMemberGroup = (userId, groupId) => {
        //This updates the local state first for user experience speed
        let members = this.state.communityMembers
        
        //Find the index of the member in the communityMembers array
        let matchedIndex = members.findIndex(element => (
            element.userProfile.id === userId
        ))

        //Copy and mutate community members
        let membersCopy = [...this.state.communityMembers];
        let memberCopy = {...membersCopy[matchedIndex]}
        memberCopy.memberProfile.pickupGroupId = groupId
        membersCopy[matchedIndex] = memberCopy

        //Insert mutated array back into state
        this.setState(prevState => ({
            ...prevState,
            communityMembers: [
                ...membersCopy
            ]
        }
        ))

        //Assign member to group on backend
        let token = localStorage.getItem("token")
        if (token && userId && groupId)
        updateMemberPickupGroup(token, userId, groupId)
            else console.error({
                error: "Received a null value",
                token,
                userId,
                groupId
            })

    }

    async componentDidMount(){
        const token = localStorage.getItem("token")
        const isAdmin = localStorage.getItem("isAdmin")
        if (token) {
            //Get own user data
            const userResponse = await getOwnUserData(token)
            const {id, email, first_name, last_name} = userResponse.userData

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
                    userProfile: {
                        id: member.User.id,
                        email: member.User.email,
                        firstName: member.User.first_name,
                        lastName: member.User.last_name,
                    },
                    memberProfile: {
                        secondaryEmail: member.email_secondary,
                        primaryPhone: member.phone_primary,
                        primaryPhoneType: member.phone_primary_type,
                        secondaryPhone: member.phone_secondary,
                        secondaryPhoneType: member.phone_secondary_type,
                        bio: member.bio,
                        locationName: member.location_name,
                        locationAddress1: member.location_address1,
                        locationAddress2: member.location_address2,
                        locationCity: member.location_city,
                        locationZip: member.location_zip,
                        locationState: member.location_state,
                        locationNotes: member.location_notes,
                        pickupGroupId: member.PickupGroupId
                    }
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
                    id: id,
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
                            communityMembers = {this.state.communityMembers}
                            setMemberGroup = {this.setMemberGroup}
                        />
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default withRouter(AdminHome)