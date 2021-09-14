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

    handleCheckEmail = (e:React.ChangeEvent<HTMLInputElement>): void => {
        let primaryEmail = this.props.userProfile.email;
        let secondaryEmailField = document.getElementById("secondaryEmail") as HTMLInputElement;
        let checked = e.target.checked
        console.log(e.target.checked)
        if (checked) {
            secondaryEmailField.value = primaryEmail || ""
        } else {
            secondaryEmailField.value = ""
        }
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
                        <p className="register-text">Do you have another email address you would like to be listed publicly?</p>
                        <label className="check-container">
                            No, let's just use my primary email address.
                            <input
                                type="checkbox"
                                onChange={(e)=>{this.handleCheckEmail(e)}}/>
                            <span className="checkmark"></span>
                        </label>

                         <input
                            className="outlined-input"
                            type=""
                            placeholder="Secondary Email"
                            id="secondaryEmail"
                            name="secondaryEmail"
                            onChange={()=>{}}
                        />
                        
                        <input
                            className="outlined-input"
                            type="tel"
                            placeholder="Phone Number"
                            id="phoneNumber"
                            name="phoneNumber"
                            onChange={()=>{}}
                        />
                        <label className="check-container">
                            <input
                                type="checkbox"
                                onChange={(e)=>{this.handleCheckEmail(e)}}/>
                            <span className="checkmark"></span>
                        </label>


                    </div>
                </div>
            </div>
        );
    }
}
