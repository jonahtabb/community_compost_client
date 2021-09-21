import '../App.css';
import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps } from "react-router-dom";

import { getOwnAdminProfile, getOwnCommunityProfile, getOwnUserData } from '../helpers';
import {AdminProfile, CommunityProfile, User} from '../types'
import { AdminDashboard } from '.';

type AdminHomeProps = {} & RouteComponentProps
type AdminHomeState = 
    {userData: User} & 
    {adminProfile: AdminProfile} &
    {communityProfile: CommunityProfile}

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
            }

        }
    }

    async componentDidMount(){
        const token = localStorage.getItem("token")
        if (token) {
            const userResponse = await getOwnUserData(token)
            const {email, first_name, last_name} = userResponse.userData

            const adminResponse = await getOwnAdminProfile(token)
            const {secondary_email, phone, phone_type, bio } = adminResponse.adminProfile

            const communityResponse = await getOwnCommunityProfile(token)
            const {name, description} = await communityResponse.communityProfile

            this.setState({
                userData:{
                    email,
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
                }
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
                        />
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default withRouter(AdminHome)