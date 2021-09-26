import "../App.css";
import { Component } from "react";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";
import {
    IsAdmin,
    SetIsAdmin,
    SetRegComplete,
    SetSessionToken,
    SetUser,
    User,
} from "../types";
import { Register, Login, Landing } from ".";

type AuthProps = RouteComponentProps & { setSessionToken: SetSessionToken } & {
    isAdmin: IsAdmin;
} & { setIsAdmin: SetIsAdmin } & { setRegComplete: SetRegComplete };

type AuthState = User;

class Auth extends Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = {
            id: null,
            email: "",
            firstName: "",
            lastName: "",
        };
    }

    setUser: SetUser = (email, firstName, lastName) => {
        this.setState({
            email,
            firstName,
            lastName,
        });
    };

    componentWillUnmount() {
        console.info("AUTH HAS UNMOUNTED!");
    }

    render() {
        return (
            <>
                <Switch>

                    <Route exact path={`${this.props.match.path}`}>
                        <Landing
                            setIsAdmin={this.props.setIsAdmin}
                        />
                    </Route>

                    <Route path={`${this.props.match.path}/login`}>
                        <Login
                            setSessionToken={this.props.setSessionToken}
                            isAdmin={this.props.isAdmin}
                            setIsAdmin={this.props.setIsAdmin}
                            user={this.state}
                            setUser={this.setUser}
                            setRegComplete={this.props.setRegComplete}
                        />
                    </Route>

                    <Route exact path={`${this.props.match.path}/register`}>
                        <Register
                            setSessionToken={this.props.setSessionToken}
                            isAdmin={this.props.isAdmin}
                            setIsAdmin={this.props.setIsAdmin}
                            user={this.state}
                            setUser={this.setUser}
                            setRegComplete={this.props.setRegComplete}
                        />
                    </Route>
                </Switch>
            </>
        );
    }
}

export default withRouter(Auth);
