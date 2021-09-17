import "./App.css";
import React, { Component } from "react";
import Header from "./common/Header";
import Login from "./login/Login";
import { Register } from "./register/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import APIURL from "./helpers/environment";

//Resources
//https://reactrouter.com/web/guides/quick-start

//TYPE DEFINITIONS -- Note -- type definitions are established in the component that store's their state or definition.  They are then exported so they can be imported into child components and used a types for prop-type declarations.
export type UserProfile = {
    userProfile: {
        email: string | null;
        firstName: string | null;
        lastName: string | null;
    };
};

export type AdminProfile = {
    adminProfile: {
        secondary_email: string | null;
        phone: string | null;
        phone_type: string | null;
        bio: string | null;
    };
};

export type CommunityProfile = {
    communityProfile: {
        name: string | null;
        description: string | null;
    };
};

export type SetUserProfile= (
  email: string | null,
  firstName: string | null,
  lastName: string | null
 ) => void;

export type SetAdminProfile = (
    secondary_email: string | null,
    phone: string | null,
    phone_type: string | null,
    bio: string | null
) => void;

export type SetCommunityProfile = (
    name: string | null,
    description: string | null
) => void;

export type SetSessionToken = (newToken: string) => void

export type SetRegistrationComplete = (registrationComplete: boolean) => void

export type SessionToken = {
    sessionToken: string | null;
};

export type RegistrationComplete = {
    registrationComplete: boolean;
};

export type IsAdmin = {
    isAdmin: boolean | null;
};

export type AppState = SessionToken &
    UserProfile &
    AdminProfile &
    CommunityProfile &
    RegistrationComplete &
    IsAdmin;

//BEGIN APP COMPONENT
export class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            sessionToken: null,
            registrationComplete: false,
            isAdmin: null,
            userProfile: {
                email: null,
                firstName: null,
                lastName: null,
            },
            adminProfile: {
                secondary_email: null,
                phone: null,
                phone_type: null,
                bio: null,
            },
            communityProfile: {
                name: null,
                description: null,
            },
        };
    }

    async componentDidMount() {
        // Get token from local storage
        let token = localStorage.getItem("token");
        console.log(typeof token, token)
        // If there is a token, get the user's own profile data
        if (token && token !== "undefined" ) {
            console.log(this.state.sessionToken);
            //Get user's own profile data from server
            let res = await fetch(`${APIURL}/user/me`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }),
            });
            let json = await res.json();
            console.log(json);
            const {
                email,
                first_name,
                is_admin,
                last_name,
                registration_complete,
            } = await json.userData;
            //Store user's own profile data in App.js state
            this.setState({
                sessionToken: token,
                registrationComplete: registration_complete,
                isAdmin: is_admin,
                userProfile: {
                    email: email,
                    firstName: first_name,
                    lastName: last_name,
                },
            });
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <button onClick={() => console.log(this.state)}>
                        App STATE CHECKER
                    </button>

                    <Link to="/login">Login</Link>

                    {this.state.sessionToken &&
                    this.state.registrationComplete ? null : (
                        <Link to="/register">Register</Link>
                    )}

                    <hr />

                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        {this.state.sessionToken &&
                        this.state.registrationComplete ? null : (
                            <Route path="/register">
                                <Register
                                    sessionToken={this.state.sessionToken}
                                    setSessionToken={this.setSessionToken}
                                    userProfile={this.state.userProfile}
                                    setUserProfile={this.setUserProfile}
                                    adminProfile={this.state.adminProfile}
                                    setAdminProfile={this.setAdminProfile}
                                    communityProfile={
                                        this.state.communityProfile
                                    }
                                    setCommunityProfile={
                                        this.setCommunityProfile
                                    }
                                    setRegistrationComplete={this.setRegistrationComplete}
                                />
                            </Route>
                        )}
                    </Switch>
                </div>
            </Router>
        );
    }

    //Helper Functions Bound to this Component
    

    setSessionToken: SetSessionToken = (newToken) => {
        localStorage.setItem("token", newToken);
        if (newToken) {
            this.setState({
                sessionToken: newToken,
            });
        } else
            console.log(
                "Tried to save a new sessionToken but was unable to find one"
            );
    };

    setRegistrationComplete: SetRegistrationComplete = (registrationComplete) => {
        this.setState({
            registrationComplete: true
        })
    }

    setUserProfile: SetUserProfile = (email, firstName, lastName) => {
        this.setState({
            userProfile: {
                email,
                firstName,
                lastName,
            },
        });
    };

    setAdminProfile: SetAdminProfile = (
        secondary_email,
        phone,
        phone_type,
        bio
    ) => {
        this.setState({
            adminProfile: {
                secondary_email,
                phone,
                phone_type,
                bio,
            },
        });
    };

    setCommunityProfile: SetCommunityProfile = (name, description) => {
        this.setState({
            communityProfile: {
                name,
                description,
            },
        });
    };
}
