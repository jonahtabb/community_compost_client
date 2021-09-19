import '../App.css';
import React, { Component } from "react";
import { SetSessionToken, RegisterUserForm, IsAdmin, SetIsAdmin, User, SetUser, SetRegStep} from "../types";
import {APIURL} from "../helpers/environment";
import {RouteComponentProps, withRouter} from "react-router";


type RegisterUserProps = 
RouteComponentProps &
{setSessionToken: SetSessionToken} &
{isAdmin: IsAdmin} &
{setIsAdmin: SetIsAdmin} &
{user: User} &
{setUser: SetUser} &
{setRegStep: SetRegStep}

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
            emailNotAvail: false
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

    handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault()
        const { firstName, lastName, email, password } = this.state
        const isAdmin = this.props.isAdmin
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
            
            let json = await res.json()
            
            if (res.status === 201) {
                let token = await json.sessionToken
                //Store Session Token in App State
                this.props.setSessionToken(token)

                //Update User Profile info in App.js State
                this.props.setUser(email, firstName, lastName)

                //Increment Registration Step
                this.props.setRegStep()
            } else throw {message: json, response: res}

        } catch (error: any){
            console.error(error.message)
            if (error.response.status === 409) {
                this.setState({
                    emailNotAvail: true
                })
            }

        }    
    }
    // componentDidUpdate(){
    //     if (this.state.emailNotAvail) {
    //         console.log("test")
    //     }
    // }

    render(){
        return(
            <div className="user-register">

                <form 
                    className="user-register-form" 
                    onSubmit={(e) => {this.handleFormSubmit(e)}}>

                    <button onClick={(e) => {e.preventDefault(); console.log(this.state)}}>
                        Register STATE CHECKER
                    </button>

                    {this.state.emailNotAvail === true
                        ?   <p style={{color: "red"}}>Please choose a different email address.  This email is not available.</p>
                        :   <></>
                    }
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