import '../App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { IsAdmin, SetIsAdmin, SetRegComplete, SetSessionToken, User } from "../types";
import RegisterUser from "./RegisterUser";
import {RouteComponentProps, withRouter} from "react-router";
import {APIURL, CLIENTURL} from "../helpers/environment";
import { Register } from '.';


type AuthProps = 
    RouteComponentProps &
    {setSessionToken: SetSessionToken} &
    {isAdmin: IsAdmin} &
    {setIsAdmin: SetIsAdmin} &
    {setRegComplete: SetRegComplete}

type AuthState = User

class Auth extends Component<AuthProps, AuthState>{
    constructor(props: AuthProps){
        super(props)
        this.state = {
            email: '',
            firstName: '',
            lastName: ''
        }
    }

    render(){
        return(
            <div>
                <button onClick={()=> {console.log(this.props.match)}}>Check Router Match </button>

                
                <Link to={`${this.props.match.path}/login`}>
                    <button type="button">Login</button>
                </Link>
                <Link to={`${this.props.match.path}/register`}>
                    <button type="button">Register</button>
                </Link>
            
            <Switch>
                <Route exact path={`${this.props.match.path}/register`}>
                    <Register
                        setSessionToken = {this.props.setSessionToken}
                        isAdmin = {this.props.isAdmin}
                        setIsAdmin = {this.props.setIsAdmin}
                    />
                </Route>
            </Switch>
            </div>
        )
    }
}

export default withRouter(Auth)