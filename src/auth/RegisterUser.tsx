import '../App.css';
import React, { Component } from "react";
import { SetSessionToken, RegisterUserForm, IsAdmin, SetIsAdmin} from "../types";
import {APIURL} from "../helpers/environment";
import {RouteComponentProps, withRouter} from "react-router";


type RegisterUserProps = 
RouteComponentProps &
{setSessionToken: SetSessionToken} &
{isAdmin: IsAdmin} &
{setIsAdmin: SetIsAdmin}

type RegisterUserState = RegisterUserForm

class RegisterUser extends Component<RegisterUserProps, RegisterUserState>{
    constructor(props: RegisterUserProps){
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
        }
    }

    updateInputState(e: React.ChangeEvent<HTMLInputElement>): void {
        let stateName: string = e.target.name;
        let stateValue: string = e.target.value;
        console.log(stateName, stateValue)
        this.setState((prevState) => ({
            ...prevState,
            [stateName]: stateValue
        }))
    }

    handleFormSubmit = async (): Promise<any> => {
        try {
            let res = await fetch(`${APIURL}/user/register`, {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        first_name: this.state.firstName,
                        last_name: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password,
                        is_admin: this.props.isAdmin ? "1" : "0",
                    },
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            });
            let json = await res.json();
        } catch (error){
            console.error({error})
        }
    }

    render(){
        return(
            <div className="user-register">

                <form className="user-register-form" onSubmit={(e)=>{e.preventDefault(); console.log(e)}}>
                    <button onClick={() => console.log(this.state)}>
                        UserRegister STATE CHECKER
                    </button>
                    <input
                        className="register-input"
                        type=""
                        placeholder="First Name"
                        id="firstName"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={(e) => this.updateInputState(e)}
                    />
                    <input
                        className="register-input"
                        type=""
                        placeholder="Last Name"
                        id="lastName"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={(e) => this.updateInputState(e)}
                    />
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
                        type=""
                        placeholder="Confirm Email"
                        id="confirmEmail"
                        name="confirmEmail"
                        value={this.state.confirmEmail}
                        onChange={(e) => this.updateInputState(e)}
                    />
                    <input
                        className="register-input"
                        type=""
                        placeholder="Password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={(e) => this.updateInputState(e)}
                    />
                    <input
                        className="register-input"
                        type=""
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={(e) => this.updateInputState(e)}
                    />
                    <button className="" type="submit">
                        Continue
                    </button>

                </form>
            </div>
        )
    }
}

export default withRouter(RegisterUser)