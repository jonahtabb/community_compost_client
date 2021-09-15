import './App.css';
import React, { Component } from "react";
import Header from './common/Header';
import Login from './login/Login';
import { Register } from './register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//https://reactrouter.com/web/guides/quick-start

export type UserProfile = {
  userProfile: {
    email: string | null,
    firstName: string | null,
    lastName: string | null
  }
}

export type AdminProfile = {
  adminProfile: {
    secondary_email: string | null,
    phone: string | null,
    phone_type: string | null,
    bio: string | null
  }
}

export type CommunityProfile = {
  communityProfile: {
    name: string | null,
    description: string | null
  }
}

export type SetAdminProfile = (
  secondary_email: string | null,
  phone: string | null,
  phone_type: string | null,
  bio: string | null
) => void

export type SetCommunityProfile = (
  name: string | null,
  description: string | null
) => void

export type SessionToken = {
  sessionToken: string | null,
}

export type AppState = SessionToken & UserProfile & AdminProfile & CommunityProfile


export class App extends Component<{}, AppState> {
  constructor(props: {}){
    super(props)
    this.state = {
      sessionToken : null,
      userProfile: {
        email: null,
        firstName: null,
        lastName: null
      },
      adminProfile: {
        secondary_email: null,
        phone: null,
        phone_type: null,
        bio: null
      },
      communityProfile: {
        name: null,
        description: null
      }
    }
  }

  setSessionToken = (newToken: string): void => {
    localStorage.setItem("token", newToken)
    if (newToken) {
      this.setState({
        sessionToken: newToken
      })
    } else (
      console.log("Tried to save a new sessionToken but was unable to find one")
    )
  }

  setUserProfile = (
    email: string | null,
    firstName: string | null,
    lastName: string | null
  ): void => {
    this.setState({
      userProfile:{
        email,
        firstName,
        lastName,
      }
    })
  }

  setAdminProfile: SetAdminProfile = (
    secondary_email,
    phone,
    phone_type,
    bio,
  ) => {
    this.setState({
      adminProfile: {
        secondary_email,
        phone,
        phone_type,
        bio,
      }
    })
  }

 setCommunityProfile: SetCommunityProfile = (
   name,
   description
 ) => {
    this.setState({
      communityProfile: {
        name, 
        description
      }
    })
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
          <hr/>
          <Link to="/register">Register</Link>
          <Switch>
            <Route path="/login"><Login /></Route>
            <Route path="/register">
              <Register
                sessionToken= {this.state.sessionToken}
                setSessionToken = {this.setSessionToken}
                userProfile = {this.state.userProfile}
                setUserProfile = {this.setUserProfile}
                adminProfile = {this.state.adminProfile}
                setAdminProfile = {this.setAdminProfile}
                communityProfile= {this.state.communityProfile}
                setCommunityProfile= {this.setCommunityProfile}
              />
            </Route>
          </Switch>
          </div>
      </Router>

    )
  }
}
