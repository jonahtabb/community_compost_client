import React, { Component } from "react";
import { IsAdmin, SetIsAdmin, SetRegComplete, SetSessionToken, SetUser, User } from "../types";


type LogoutProps =
  {setSessionToken: SetSessionToken} &
  {setIsAdmin: SetIsAdmin} &
  {setRegComplete: SetRegComplete}

export default class Logout extends Component<LogoutProps, {}> {

    handleClickLogout = ():void => {
        localStorage.clear()
        this.props.setSessionToken(null);
        this.props.setIsAdmin(false);
        this.props.setRegComplete(false);
    }

    render(){
        return(
            <div className="logout-container">
                <button onClick={() => this.handleClickLogout()}className="logout-button">Logout</button>
            </div>
            
        )
    }
}
