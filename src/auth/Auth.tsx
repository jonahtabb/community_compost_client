import "../App.css";
import { Component } from "react";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import { RouteComponentProps, withRouter } from "react-router";
import {
    IsAdmin,
    SessionToken,
    SetIsAdmin,
    SetRegComplete,
    SetSessionToken,
    SetUser,
    User,
} from "../types";
import { Register, Login, Landing } from ".";
import { getOwnUserData } from "../helpers";

type AuthProps = 
    RouteComponentProps &
    { sessionToken: SessionToken} &
    { setSessionToken: SetSessionToken } &
    { isAdmin: IsAdmin } &
    { setIsAdmin: SetIsAdmin } &
    { setRegComplete: SetRegComplete } 

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

    getUserData = async (token: string): Promise<any> => {
        const json = await getOwnUserData(token)
        const {email, first_name, last_name} = await json.userData
        this.setUser(email, first_name, last_name)
    }

    //This fetches user data if a person completed the user registration, but did not complete the second page of registration.
    componentDidMount(){
        const token = localStorage.getItem("token")
        if (token) {
            this.getUserData(token)
        }
    }

    componentWillUnmount() {
        console.info("AUTH HAS UNMOUNTED!");
    }

    render() {
        console.info(`${this.props.match.path}/register`)
        return (
            <>
                



                    <Route exact path={`${this.props.match.path}/login`}>
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

                    <Route exact path={`${this.props.match.path}`}>
                        <Landing
                            setIsAdmin={this.props.setIsAdmin}
                        />
                    </Route>
                
            </>
        );
    }
}

export default withRouter(Auth);
