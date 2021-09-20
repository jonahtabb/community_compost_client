import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from "react-router-dom";
import { IsAdmin, RegComplete, SessionToken, SetIsAdmin, SetRegComplete, SetSessionToken } from "./types";
import {APIURL} from "./helpers/environment";
import {Auth} from './auth'
import {RouteComponentProps} from "react-router";
import { Home } from "./home";
import { getOwnUserData } from "./helpers";

//Resources
//https://reactrouter.com/web/guides/quick-start

//https://github.com/swftdev/here

type AppProps = RouteComponentProps

type AppState = 
{sessionToken: SessionToken} &
{isAdmin: IsAdmin} &
{regComplete: RegComplete}

//BEGIN APP COMPONENT
class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            sessionToken: null,
            isAdmin: false,
            regComplete: false //validation for the multi-step registration
    }}

    //Component Methods
    setSessionToken: SetSessionToken = (value) => {
        this.setState({ sessionToken: value})
    }

    setIsAdmin: SetIsAdmin = (value) => {
        this.setState({ isAdmin: value})
    }

    setRegComplete: SetRegComplete = (value) => {
        this.setState({regComplete: value})
    }
    async componentDidMount (){
        let token = localStorage.getItem("token")
        if (token) {
            let userObj = await getOwnUserData(token)
            let regComplete = userObj.userData.registration_complete
            this.setSessionToken(token)
            this.setState({regComplete})
        }
    }
    componentDidUpdate () {
        if (this.state.sessionToken){
            localStorage.setItem("token", this.state.sessionToken)
            localStorage.setItem("isAdmin", this.state.isAdmin ? "1" : "0")
        }
    }

    render() {
        return (
            <>
            <button onClick={()=>console.log(this.state)}>APP STATE CHECKER</button>
            <button onClick={()=> {console.log(this.props.match)}}>Check Router Match APP</button>
                {this.state.sessionToken && this.state.regComplete ? 
                    <Redirect to="/home" /> :
                    <Redirect to="/auth" />
                }

                <Switch>
                    <Route 
                        path="/auth">
                        <Auth 
                            setSessionToken={this.setSessionToken}
                            isAdmin={this.state.isAdmin}
                            setIsAdmin={this.setIsAdmin}
                            setRegComplete={this.setRegComplete}
                        />
                    </Route>
                    <Route path="/home">
                        <Home />
                    </Route>
                </Switch>
            
            </>
            
           
        )
    }


    }

export default withRouter(App)