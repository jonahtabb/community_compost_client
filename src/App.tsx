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
    firstName: string | null,
    lastName: string | null
  }
}

export type SessionToken = {
  sessionToken: string | null,
}

export type AppState = SessionToken & UserProfile


export class App extends Component<{}, AppState> {
  constructor(props: {}){
    super(props)
    this.state = {
      sessionToken : null,
      userProfile: {
        firstName: null,
        lastName: null
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

  setUserProfile = (firstName: string | null, lastName: string |null): void => {
    this.setState({
      userProfile:{
        firstName,
        lastName,
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
              />
            </Route>
          </Switch>
          </div>
      </Router>

    )
  }
}
