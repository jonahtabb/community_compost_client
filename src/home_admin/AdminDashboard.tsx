import '../App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import {RouteComponentProps, withRouter} from "react-router";
import {APIURL, CLIENTURL} from "../helpers/environment";
import { getOwnAdminProfile, getOwnCommunityProfile, getOwnUserData } from '../helpers';
import {AdminProfile, CommunityProfile, User} from '../types'

type AdminDashboardProps = {} & RouteComponentProps
type AdminDashboardState = {}

class AdminDashboard extends Component<AdminDashboardProps, AdminDashboardState>{
    constructor(props: AdminDashboardProps){
        super(props)
    }

    render(){
        return (
            <h2>Admin Dashboard</h2>
        )
    }
}

export default withRouter(AdminDashboard)