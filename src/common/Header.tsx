import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Logout } from ".";
import {
    IsAdmin,
    SessionToken,
    SetIsAdmin,
    SetRegComplete,
    SetSessionToken,
    SetUser,
    User,
} from "../types";

type HeaderProps = { sessionToken: SessionToken } & {
    setSessionToken: SetSessionToken;
} & { setIsAdmin: SetIsAdmin } & { setRegComplete: SetRegComplete };

export default class Header extends Component<HeaderProps, {}> {


      handleClickLogout = ():void => {
        localStorage.clear()
        this.props.setSessionToken(null);
        this.props.setIsAdmin(false);
        this.props.setRegComplete(false);
    }

    render() {
        return (
            <div className="header">
                <h1>Community Compost</h1>

                <div className="login-logout-container">
                    {this.props.sessionToken ? (
                        <button
                            onClick={() => this.handleClickLogout()}
                            className="link-like-button"
                            type="button"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to={`/auth`}>
                            <button className="link-like-button" type="button">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}
