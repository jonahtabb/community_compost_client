import "../App.css";
import React, { Component } from "react";
import {
    SetSessionToken,
    RegisterUserForm,
    IsAdmin,
    SetIsAdmin,
    User,
    SetUser,
    SetRegStep,
} from "../types";
import { APIURL } from "../helpers/environment";
import { RouteComponentProps, withRouter } from "react-router";
import { ETXTBSY } from "constants";

type RegisterUserProps = RouteComponentProps & {
    setSessionToken: SetSessionToken;
} & { isAdmin: IsAdmin } & { setIsAdmin: SetIsAdmin } & { user: User } & {
    setUser: SetUser;
} & { setRegStep: SetRegStep };

type RegisterUserState = RegisterUserForm;

class RegisterUser extends Component<RegisterUserProps, RegisterUserState> {
    constructor(props: RegisterUserProps) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            confirmEmail: "",
            password: "",
            confirmPassword: "",
            emailNotAvail: false,
            emailMatch: true,
            passwordMatch: true,
            emailValid: false,
            passwordValid: false,
            emailStyle: '',
            emailConfirmStyle: '',
            passwordStyle: '',
            passwordConfirmStyle:'',
        };
    }

    updateInputState(e: React.ChangeEvent<HTMLInputElement>): void {
        let stateName: string = e.target.name;
        let stateValue: string = e.target.value;
        this.setState((prevState) => ({
            ...prevState,
            [stateName]: stateValue,
        }));
    }

    handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const elementId = e.target.id
        const emailInput = document.getElementById(elementId) as HTMLInputElement
        if (emailInput) {
            const isEmailValid = emailInput.checkValidity()
            const isEmailMatch = this.state.confirmEmail === e.target.value
            this.setState({
                emailValid: isEmailValid,
                emailStyle: isEmailValid ? "register-valid" : "register-invalid",
                emailConfirmStyle: isEmailMatch ? "register-valid" : "register-invalid"
            })
        }
    }

    handleConfirmEmail(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value)
            const isEmailMatch = e.target.value === this.state.email
            this.setState({
                emailMatch: isEmailMatch,
                emailConfirmStyle: isEmailMatch ? "register-valid" : "register-invalid"
            })
    }

    handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        const elementId = e.target.id
        const passwordInput = document.getElementById(elementId) as HTMLInputElement
        if (passwordInput) {
            const isPasswordValid = passwordInput.checkValidity()
            const isPasswordMatch = this.state.confirmPassword === e.target.value
            this.setState({
                passwordValid: isPasswordValid,
                passwordStyle: isPasswordValid ? "register-valid" : "register-invalid",
                passwordConfirmStyle: isPasswordMatch ? "register-valid" : "register-invalid"
            })

        }
    }

    handleConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
            const isPasswordMatch = e.target.value === this.state.password
            this.setState({
                passwordMatch: isPasswordMatch,
                passwordConfirmStyle: isPasswordMatch ? "register-valid" : "register-invalid"
            })

    }

    handleFormSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<any> => {
        e.preventDefault();
        const { firstName, lastName, email, password } = this.state;
        const isAdmin = this.props.isAdmin;
        try {
            let res = await fetch(`${APIURL}/user/register`, {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password: password,
                        is_admin: isAdmin ? "1" : "0",
                    },
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            });

            let json = await res.json();

            if (res.status === 201) {
                let token = await json.sessionToken;
                //Store Session Token in App State
                this.props.setSessionToken(token);

                //Update User Profile info in App.js State
                this.props.setUser(email, firstName, lastName);

                //Increment Registration Step
                this.props.setRegStep();
            } else throw { message: json, response: res };
        } catch (error: any) {
            console.error(error.message);
            if (error.response.status === 409) {
                this.setState({
                    emailNotAvail: true,
                });
            }
        }
    };


    render() {
        return (
            <div className="container-sm">
                <div className="user-register">
                    <form
                        className="user-register-form"
                        onSubmit={(e) => {
                            this.handleFormSubmit(e);
                        }}
                    >
                        {this.state.emailNotAvail === true ? (
                            <p style={{ color: "red" }}>
                                Please choose a different email address. This
                                email is not available.
                            </p>
                        ) : (
                            <></>
                        )}
                        <input
                            
                            type=""
                            placeholder="First Name"
                            id="firstName"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={(e) => this.updateInputState(e)}
                        />
                        <input
                            
                            type=""
                            placeholder="Last Name"
                            id="lastName"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={(e) => this.updateInputState(e)}
                        />
 
                        <input
                            required
                            className={this.state.emailStyle}
                            type="email"
                            pattern='^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}'
                            title="Please input a valid email address"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={this.state.email}
                            onChange={(e) => {this.updateInputState(e); this.handleEmail(e)}}
                        />
                        <input
                            required
                            className={this.state.emailConfirmStyle}
                            type="email"
                            title="Please input a valid email address"
                            placeholder="Confirm Email"
                            id="confirmEmail"
                            name="confirmEmail"
                            value={this.state.confirmEmail}
                            onChange={(e) => {this.updateInputState(e); this.handleConfirmEmail(e)}}
                        />
                        <input
                            className={this.state.passwordStyle}
                            required
                            pattern={'^(?=.{5,10})(?=.*[a-z])(?=.*[A-Z]).*$'}
                            title="Password must be at least 5 characters, contain at least 1 uppercase character, a lowercase character, and a number"
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            minLength={5}
                            maxLength={10}
                            value={this.state.password}
                            onChange={(e) => {this.updateInputState(e); this.handlePassword(e)}}
                        />
                        <label htmlFor="password" className="register-validation-text">Password must be at least 5 characters, contain at least 1 uppercase character, a lowercase character, and a number</label>
                        <input
                            className={this.state.passwordConfirmStyle}
                            type="password"
                            placeholder="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={(e) => {this.updateInputState(e); this.handleConfirmPassword(e)}}
                        />
                        <button className="" type="submit">
                            Continue
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(RegisterUser);
