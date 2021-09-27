import React, { Component } from "react";
import {
    BrowserRouter as Switch,
    Route,
    Redirect,
    withRouter,
    Router,
    Link,
} from "react-router-dom";
import { RouteComponentProps } from "react-router";
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
import { CLIENTURL } from "../helpers";
import logo1 from "../assets/logo1.svg";

type HeaderProps = RouteComponentProps & { sessionToken: SessionToken } & {
    setSessionToken: SetSessionToken;
} & { setIsAdmin: SetIsAdmin } & { setRegComplete: SetRegComplete };

class Header extends Component<HeaderProps, {}> {
    handleClickLogout = (): void => {
        localStorage.clear();
        this.props.setSessionToken(null);
        this.props.setIsAdmin(false);
        this.props.setRegComplete(false);
    };

    render() {
        console.info(this.props);
        return (
            <div className="header">
                <div className="header-image-container">
                    <Link to={`${this.props.match.url}auth`}>
                        <img
                            src={logo1}
                            alt="Community Compost Logo"
                            width="100%"
                        />
                    </Link>
                </div>

                <h1>Community Compost</h1>

                <div className="login-logout-container">
                    {this.props.sessionToken ? (
                        <button
                            onClick={() => this.handleClickLogout()}
                            className="link-button-small"
                            type="button"
                        >
                            Logout
                        </button>
                    ) : this.props.location.pathname.includes("login") ? (
                        <Link
                            to={`${this.props.match.url}auth/register`}
                            className="link-button-small"
                        >
                            Register
                        </Link>
                    ) : (
                        <Link
                            to={`${this.props.match.url}auth/login`}
                            className="link-button-small"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
