import React, { Component } from "react";
import {Link} from "react-router-dom"
import { Logout } from ".";
import { IsAdmin, SetIsAdmin, SetRegComplete, SetSessionToken, SetUser, User } from "../types";

type HeaderProps =
  {setSessionToken: SetSessionToken} &
  {setIsAdmin: SetIsAdmin} &
  {setRegComplete: SetRegComplete}


export default class Header extends Component<HeaderProps, {}> {
  render() {
    return (
      <div className="header">
        Community Compost
        <Logout
          setSessionToken={this.props.setSessionToken}
          setIsAdmin={this.props.setIsAdmin}
          setRegComplete={this.props.setRegComplete}
        />
      </div>
    )
  }
}