import '../App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import {RouteComponentProps, withRouter} from "react-router";
import { IsAdmin, SetIsAdmin, SetRegComplete, SetSessionToken, SetUser, User } from "../types";
import {APIURL, CLIENTURL} from "../helpers/environment";
import { Register, Login } from '.';



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

    setUser: SetUser = (email, firstName, lastName) => {
        this.setState({
            email,
            firstName,
            lastName
        })
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
                <Route exact path ={`${this.props.match.path}/login`}>
                    <Login
                    setSessionToken = {this.props.setSessionToken}
                    isAdmin = {this.props.isAdmin}
                    setIsAdmin = {this.props.setIsAdmin}
                    user = {this.state}
                    setUser = {this.setUser}
                    setRegComplete= {this.props.setRegComplete}
                    />
                </Route>

                <Route exact path={`${this.props.match.path}/register`}>
                    <Register
                        setSessionToken = {this.props.setSessionToken}
                        isAdmin = {this.props.isAdmin}
                        setIsAdmin = {this.props.setIsAdmin}
                        user = {this.state}
                        setUser = {this.setUser}
                        setRegComplete= {this.props.setRegComplete}
                    />
                </Route>
            </Switch>
            </div>
        )
    }
}

export default withRouter(Auth)