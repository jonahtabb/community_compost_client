import React, { Component } from "react";
import "../App.css";
import { RegisterState, RegisterProps } from "./Register";
import APIURL from '../helpers/environment'
import { UserProfile } from "../App";

type UserRegisterState = {
    formInput: {
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        confirmEmail: string | null;
        password: string | null;
        confirmPassword: string | null;
        allValidated: boolean;
    };
};

type UserRegisterProps = 
    RegisterState
    & UserProfile
    & { incrementRegStep: () => void } & RegisterProps

export class UserRegister extends Component<
    UserRegisterProps,
    UserRegisterState
> {
    constructor(props: UserRegisterProps) {
        super(props);
        this.state = {
            formInput: {
                firstName: null,
                lastName: null,
                email: null,
                confirmEmail: null,
                password: null,
                confirmPassword: null,
                allValidated: true,
            },
        };
    }

    updateInputState(e: React.ChangeEvent<HTMLInputElement>): void {
        let stateName: string = e.target.id;
        this.setState((prevState) => ({
            formInput: {
                ...prevState.formInput,
                [stateName]: e.target.value,
            },
        }));
    }

    createAccount = async (): Promise<any> => {
        
        try {
            let res = await fetch(`${APIURL}/user/register`,
            {
                method: 'POST',
                body: JSON.stringify({
                    user:{
                        email: this.state.formInput.email,
                        password: this.state.formInput.password,
                        is_admin: this.props.asAdmin ? "1" : "0"
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            })
            let json = await res.json()

            //Store Session Token
            this.props.setSessionToken(json.sessionToken)

            //Update User Profile info in App.js State
            this.props.setUserProfile(this.state.formInput.firstName, this.state.formInput.lastName)

            //Increment Registration Step in Register.js State
            this.props.incrementRegStep()
            
        } catch (error) {
            console.log({
                error
            })
        }
        

    }

    render() {
        return (
            <div className="user-register">
                REGISTER COMPONENT
                <div className="user-register-form">
                    <button onClick={() => console.log(this.state)}>
                        UserRegister STATE CHECKER
                    </button>
                    <input
                        className="register-input"
                        type=""
                        placeholder="First Name"
                        id="firstName"
                        onChange={(e) => this.updateInputState(e)}
                    />
                    <input
                        className="register-input"
                        type=""
                        placeholder="Last Name"
                        id="lastName"
                        onChange={(e) => this.updateInputState(e)}
                    />
                    <input
                        className="register-input"
                        type=""
                        placeholder="Email"
                        id="email"
                        onChange={(e) => this.updateInputState(e)}
                    />
                    <input
                        className="register-input"
                        type=""
                        placeholder="Confirm Email"
                        id="confirmEmail"
                        onChange={(e) => this.updateInputState(e)}
                    />
                    <input
                        className="register-input"
                        type=""
                        placeholder="Password"
                        id="password"
                        onChange={(e) => this.updateInputState(e)}
                    />
                    <input
                        className="register-input"
                        type=""
                        placeholder="Confirm Password"
                        id="confirmPassword"
                        onChange={(e) => this.updateInputState(e)}
                    />
                    <button 
                        className=""
                        onClick={this.createAccount}
                        >Create Account</button>
                </div>
            </div>
        );
    }
}
