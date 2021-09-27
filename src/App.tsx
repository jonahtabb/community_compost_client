import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter } from "react-router-dom";
import { IsAdmin, RegComplete, SessionToken, SetIsAdmin, SetRegComplete, SetSessionToken } from "./types";
import {Auth} from './auth'
import {RouteComponentProps} from "react-router";
import { Home } from "./home";
import { getOwnUserData } from "./helpers";
import { Header } from './common';
import "./App.css";

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
        let isAdminLocal = localStorage.getItem("isAdmin")
        if (token) {
            let userObj = await getOwnUserData(token)
            let regComplete = userObj.userData.registration_complete
            this.setState({
                sessionToken: token,
                isAdmin: isAdminLocal === "1",
                regComplete: regComplete
            })
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
            <div id="wrapper">

            

                <Header
                    sessionToken = {this.state.sessionToken}
                    setSessionToken={this.setSessionToken}
                    setIsAdmin={this.setIsAdmin}
                    setRegComplete={this.setRegComplete}
                />
                
                {this.state.sessionToken && this.state.regComplete ? 
                    <Redirect to="/home" /> :
                    <Redirect to="/auth" />
                }
       
                    <Route 
                            path="/auth">
                            <Auth
                                sessionToken={this.state.sessionToken}
                                setSessionToken={this.setSessionToken}
                                isAdmin={this.state.isAdmin}
                                setIsAdmin={this.setIsAdmin}
                                setRegComplete={this.setRegComplete}
                            />
                        </Route>
                        <Route path="/home">
                            <Home 
                                isAdmin={this.state.isAdmin}
                            />
                        </Route>
                    
  

                
            
            </div>
            
           
        )
    }


    }

export default withRouter(App)