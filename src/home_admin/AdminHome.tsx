import '../App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import {RouteComponentProps, withRouter} from "react-router";
import {APIURL, CLIENTURL} from "../helpers/environment";
import { getOwnAdminProfile, getOwnCommunityProfile, getOwnUserData } from '../helpers';
import {AdminProfile, CommunityProfile, User} from '../types'

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
            </div>
        )
    }
}

export default withRouter(AdminHome)