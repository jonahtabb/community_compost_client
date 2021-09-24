import '../App.css';
import { Component } from "react";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom"
import {RouteComponentProps, withRouter} from "react-router";
import { IsAdmin, SetIsAdmin, SetRegComplete, SetSessionToken, SetUser, User } from "../types";
import { Register, Login } from '.';



type AuthProps = 
    RouteComponentProps &
    {setSessionToken: SetSessionToken} &
    {isAdmin: IsAdmin} &
    {setIsAdmin: SetIsAdmin} &
    {setRegComplete: SetRegComplete}

type AuthState = User

class Auth extends Component<AuthProps, AuthState>{
    constructor(props: AuthProps){
        super(props)
        this.state = {
            id: null,
            email: '',
            firstName: '',
            lastName: ''
        }
    }

    setUser: SetUser = (email, firstName, lastName) => {
        this.setState({
            email,
            firstName,
            lastName
        })
    }

    componentWillUnmount(){
        console.info("AUTH HAS UNMOUNTED!")
    }

    render(){
        return(
            <div>
                <Switch>
                <button onClick={()=> {console.log(this.props.match)}}>Check Router Match Auth </button>
                <h1>Auth Component</h1>
                <Link to={`${this.props.match.path}/login`}>
                    <button type="button">Login</button>
                </Link>
                <Link to={`${this.props.match.path}/register`}>
                    <button type="button">Register</button>
                </Link>
            
            
                <Route exact path ={`${this.props.match.path}/login`}>
                    <Login
                    setSessionToken = {this.props.setSessionToken}
                    isAdmin = {this.props.isAdmin}
                    setIsAdmin = {this.props.setIsAdmin}
                    user = {this.state}
                    setUser = {this.setUser}
                    setRegComplete= {this.props.setRegComplete}
                    />
                </Route>

                <Route exact path={`${this.props.match.path}/register`}>
                    <Register
                        setSessionToken = {this.props.setSessionToken}
                        isAdmin = {this.props.isAdmin}
                        setIsAdmin = {this.props.setIsAdmin}
                        user = {this.state}
                        setUser = {this.setUser}
                        setRegComplete= {this.props.setRegComplete}
                    />
                </Route>
            </Switch>
            </div>
        )
    }
}

export default withRouter(Auth)