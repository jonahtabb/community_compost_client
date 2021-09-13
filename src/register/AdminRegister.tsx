import React, { Component } from "react";
import "../App.css";
import { RegisterState, RegisterProps } from "./Register";
import APIURL from "../helpers/environment";
import { UserProfile } from "../App";

type AdminRegisterProps =
    RegisterState
    & UserProfile
    & { incrementRegStep: () => void }
    & RegisterProps;

export class AdminRegister extends Component<AdminRegisterProps, {}> {
    constructor(props: AdminRegisterProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>CREATE ADMIN PROFILE</h1>
                <h2>{`Welcome ${this.props.userProfile.firstName}`}</h2>
                <p>Answer a few more questions and we'll get you set up!</p>
                <div className="user-register">
                    REGISTER COMPONENT
                    <div className="user-register-form">
                         <input
                            className="outlined-input"
                            type=""
                            placeholder="Secondary Phone"
                            id="secondaryPhone"
                            onChange={()=>{}}
                        />
                        <input
                            className="outlined-input"
                            type=""
                            placeholder="Secondary Email"
                            id="secondaryEmail"
                            onChange={()=>{}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
