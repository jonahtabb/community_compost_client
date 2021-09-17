import React, { Component } from "react";
import APIURL from "../helpers/environment";
import { AdminProfile, CommunityProfile, SetRegistrationComplete, SessionToken, SetAdminProfile, SetCommunityProfile, UserProfile } from "../App";
import {
    AsAdmin,
    RegistrationStep,
} from "./Register";

export type MemberRegisterProps =
        AsAdmin &
        RegistrationStep &
        SessionToken &
        UserProfile & 
        { incrementRegStep: () => void } & 
        { setSessionToken: (newToken: string) => void } & 
        { setUserProfile: (
                email: string | null,
                firstName: string | null,
                lastName: string | null
            ) => void;
        } &
        {setRegistrationComplete: SetRegistrationComplete}

export class MemberRegister extends Component<MemberRegisterProps, {}> {
    constructor(props: MemberRegisterProps) {
        super(props)
    }

    handleChooseEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let primaryEmail = this.props.userProfile.email;
        let secondaryEmailField = document.getElementById(
            "secondary-email"
        ) as HTMLInputElement;
        let checked = e.target.checked;
        if (checked) {
            secondaryEmailField.value = primaryEmail || "";
            secondaryEmailField.disabled = true;
        } else {
            secondaryEmailField.value = "";
            secondaryEmailField.disabled = false;
        }
    };

    render() {
        return (
            

            <div>
                <h2>{`Welcome ${this.props.userProfile.firstName}! Answer a few more questions to help you get set up!`}</h2>
                <p>Answer a few more questions and we'll get you set up!</p>
                <div className="user-register">
                    <div className="user-register-form">
                        <p className="register-text">
                            Do you have another email address you would like to
                            be listed publicly?
                        </p>
                        <label className="check-container">
                            No, let's just use my primary email address.
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    this.handleChooseEmail(e)
                                }}
                            />
                            <span className="checkmark"></span>
                        </label>

                        <input
                            className="outlined-input"
                            type=""
                            placeholder="Secondary Email"
                            id="secondary-email"
                            name="secondary-email"
                        />
                        {/* Phone Number */}
                        <input
                            className="outlined-input"
                            type="tel"
                            placeholder="Phone Number"
                            id="phone-number"
                            name="phone-number"
                        />
                        <div style={{ marginTop: "2rem" }}>
                            <p>Number Type</p>
                            <label className="check-container">
                                Mobile
                                <input
                                    type="radio"
                                    id="phoneNumber_type_mobile"
                                    data-select="mobile"
                                    name="phoneNumber_type"
                                    onChange={(e) => {
 
                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>

                            <label className="check-container">
                                Office
                                <input
                                    type="radio"
                                    id="phoneNumber_type_office"
                                    data-select="office"
                                    name="phoneNumber_type"
                                    onChange={(e) => {

                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>

                            <label className="check-container">
                                Home
                                <input
                                    type="radio"
                                    id="phoneNumber_type_office"
                                    data-select="home"
                                    name="phoneNumber_type"
                                    onChange={(e) => {

                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        {/* Secondary Phone Number */}
                        <input
                            className="outlined-input"
                            type="tel"
                            placeholder="Phone Number"
                            id="secondary-phone-number"
                            name="secondary-phone-number"
                        />
                        <div style={{ marginTop: "2rem" }}>
                            <p>Number Type</p>
                            <label className="check-container">
                                Mobile
                                <input
                                    type="radio"
                                    id="s_phoneNumber_type_mobile"
                                    data-select="mobile"
                                    name="s_phoneNumber_type"
                                    onChange={(e) => {
 
                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>

                            <label className="check-container">
                                Office
                                <input
                                    type="radio"
                                    id="s_phoneNumber_type_office"
                                    data-select="office"
                                    name="s_phoneNumber_type"
                                    onChange={(e) => {

                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>

                            <label className="check-container">
                                Home
                                <input
                                    type="radio"
                                    id="s_phoneNumber_type_office"
                                    data-select="home"
                                    name="s_phoneNumber_type"
                                    onChange={(e) => {

                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        <label htmlFor="bio">
                                    Bio. Let everybody know a little bit about who you are!
                        </label>
                        <textarea
                            className="outlined-input"
                            style={{minHeight: "8rem", maxHeight:"30vh", maxWidth: '100%', minWidth: '100%' }}
                            placeholder="Your Bio"
                            id="bio"
                            name="bio"
                        />

                        <label htmlFor="community_name">
                                    Choose a name for your compost pick-up community.  This might be the name of your neighborhood, business, or community garden.
                        </label>
                        <input
                            className="outlined-input"
                            type="text"
                            placeholder="Community Name"
                            id="community-name"
                            name="community-name"
                        />

                        <label htmlFor="community_description">
                                    Description. What should members know about your community composting group?
                        </label>
                        <textarea
                            className="outlined-input"
                            style={{minHeight: "8rem", maxHeight:"30vh", maxWidth: '100%', minWidth: '100%' }}
                            placeholder="Community Description"
                            id="community-description"
                            name="community-description"
                        />

                        <button className="" >
                            Create Your Compost Community!
                        </button>
                    </div>

                </div>
            </div>
        )
    }
}