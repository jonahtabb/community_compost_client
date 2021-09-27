import '../App.css';
import React, { Component } from "react";
import { SetSessionToken, IsAdmin, SetIsAdmin, User, SetUser, LoginUser, SetRegComplete} from "../types";
import {APIURL} from "../helpers/environment";
import {RouteComponentProps, withRouter} from "react-router";

type LoginProps = 
    RouteComponentProps &
    {
        setSessionToken: SetSessionToken,
        isAdmin: IsAdmin,
        setIsAdmin: SetIsAdmin,
        user: User,
        setUser: SetUser
        setRegComplete: SetRegComplete
    }

type LoginState = LoginUser

class Login extends Component<LoginProps, LoginState>{
    constructor(props: LoginProps){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    updateInputState(e: React.ChangeEvent<HTMLInputElement>): void {
        let stateName: string = e.target.name;
        let stateValue: string = e.target.value;
        this.setState((prevState) => ({
            ...prevState,
            [stateName]: stateValue
        }))
    }

    handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault()
        //Destructure State
        const {email, password} = this.state
        try {
            let res = await fetch(`${APIURL}/user/login`, {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        email,
                        password
                    }
                }),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            let json = await res.json()
            console.log(json)
            //Get Name from json response
            const {first_name, last_name, is_admin, registration_complete} = await json.user

            if (res.status === 200) {
                let token = await json.sessionToken
                //Store Session Token in App State
                this.props.setSessionToken(token)

                //Store isAdmin in App State
                this.props.setIsAdmin(is_admin)

                //Set regComplete in App State
                this.props.setRegComplete(registration_complete)

                // //Update User Profile info in Auth State
                // this.props.setUser(email, first_name, last_name)

            }
        }catch (error){
            console.log(error)
        }
    }

    render(){
        console.log(this.props)
        return (
            <div className="container">
                <h1>Login</h1>

                <form
                    className="user-login-form"
                    onSubmit={e => {this.handleFormSubmit(e)}}
                >

                    <input
                        className="register-input"
                        type="email"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={(e) => this.updateInputState(e)}
                    />

                    <input
                        className="register-input"
                        type="password"
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.updateInputState(e)}
                    />

                    <button type="submit"> Log In!</button>

                </form>
            </div>
        )
    }
}

export default withRouter(Login)