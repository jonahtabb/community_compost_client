import React, { Component } from "react";
import { SessionToken, UserProfile } from "../App";
import "../App.css";
import { UserRegister } from "./UserRegister";
import { AdminRegister } from "./AdminRegister";

export type RegisterState = {
    asAdmin: boolean;
    registrationStep: number;

};

export type RegisterProps = 
    SessionToken
    & UserProfile
    & { setSessionToken: (newToken: string) => void}
    & { setUserProfile: (firstName: string | null, lastName: string | null) => void}

export class Register extends Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            asAdmin: true,
            registrationStep: 1,
        };

    }

    incrementRegStep = ():void  => {
        this.setState((prevState) => {
            let newStep = prevState.registrationStep + 1
            localStorage.setItem("registrationStep", newStep.toString())
            return (            
                {
                ...prevState,
                registrationStep: newStep
                }
            )
        })
    }


    componentDidMount() {
        let regStep = localStorage.getItem("registrationStep")
        this.setState({
            registrationStep: regStep ? +regStep : 1
        })
    }
    
    render() {
        return (
           <div>
                <button onClick={() => console.log(this.state)}>
                Register STATE CHECKER
                </button>
                {
                    this.state.registrationStep === 1
                    ?   <UserRegister
                            asAdmin={this.state.asAdmin}
                            registrationStep= {this.state.registrationStep}
                            incrementRegStep = {this.incrementRegStep}
                            sessionToken= {this.props.sessionToken}
                            setSessionToken = {this.props.setSessionToken}
                            userProfile = {this.props.userProfile}
                            setUserProfile = {this.props.setUserProfile}
                        />
                    : this.state.asAdmin === true && this.state.registrationStep === 2
                    ?   <AdminRegister
                            asAdmin={this.state.asAdmin}
                            registrationStep= {this.state.registrationStep}
                            incrementRegStep = {this.incrementRegStep}
                            sessionToken= {this.props.sessionToken}
                            setSessionToken = {this.props.setSessionToken}
                            userProfile = {this.props.userProfile}
                            setUserProfile = {this.props.setUserProfile}
                        />
                    : null
                }

            </div>
        );
    }
}
