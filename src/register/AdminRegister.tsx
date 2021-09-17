import React, { Component } from "react";
import "../App.css";
import {
    AsAdmin,
    RegistrationStep,
} from "./Register";
import APIURL from "../helpers/environment";
import { AdminProfile, CommunityProfile, SetRegistrationComplete, SessionToken, SetAdminProfile, SetCommunityProfile, UserProfile } from "../App";

type AdminRegisterProps = 
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
    AdminProfile & 
    {setAdminProfile: SetAdminProfile} &
    CommunityProfile &
    {setCommunityProfile: SetCommunityProfile} &
    {setRegistrationComplete: SetRegistrationComplete}

export class AdminRegister extends Component<AdminRegisterProps, {}> {
    constructor(props: AdminRegisterProps) {
        super(props);
    }

    handleChooseEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let primaryEmail = this.props.userProfile.email;
        let secondaryEmailField = document.getElementById(
            "secondary-email"
        ) as HTMLInputElement;
        let checked = e.target.checked;
        console.log(e.target.checked);
        if (checked) {
            secondaryEmailField.value = primaryEmail || "";
            secondaryEmailField.disabled = true;
        } else {
            secondaryEmailField.value = "";
            secondaryEmailField.disabled = false;
        }
    };

    handleChoosePhoneType =  (e: React.ChangeEvent<HTMLInputElement>, adminProfile: any): void => {
        const chosenType= e.target.getAttribute("data-select");
        const {bio, phone, secondary_email} = adminProfile

        this.props.setAdminProfile(bio, phone, chosenType, secondary_email)

        console.log(adminProfile)
    }

    createAccount = async (adminProfile: any): Promise<any> => {
        try {
            //Collect input values
            const secondaryEmail = (document.getElementById("secondary-email") as HTMLInputElement).value
            const phone = (document.getElementById("phone-number") as HTMLInputElement).value
            const {phone_type} = adminProfile
            const bio = (document.getElementById("bio") as HTMLInputElement).value
            const communityName = (document.getElementById("community-name") as HTMLInputElement).value
            const communityDesc = (document.getElementById("community-description") as HTMLInputElement).value
            console.log(communityName, communityDesc)
            //Update input values in App.js State
            this.props.setRegistrationComplete(true)
            this.props.setCommunityProfile(undefined, communityName, communityDesc)
            this.props.setAdminProfile(secondaryEmail, phone, phone_type, bio)
            //Create new admin profile associated with user profile
            let adminResponse = await fetch(`${APIURL}/admin/create`, {
                method: "POST",
                body: JSON.stringify({
                    admin: {
                        email_secondary: secondaryEmail,
                        phone: phone,
                        phone_type: phone_type,
                        bio: bio
                    }
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.sessionToken}`
                })
            })
            let adminJson = await adminResponse.json()
            
            //Create new community profile associated with user profile
            let communityResponse = await fetch(`${APIURL}/community/create`, {
                method: "POST",
                body: JSON.stringify({
                    community: {
                        name: communityName,
                        description: communityDesc
                    }
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.sessionToken}`
                })
            })
            let communityJson = await communityResponse.json()

            
            

        
        } catch (err) {
            console.error(err)
        }
        
    }

    render() {
        return (
            <div>
                <h2>{`Welcome ${this.props.userProfile.firstName}`}</h2>
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
                                    this.handleChooseEmail(e);
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
                                        this.handleChoosePhoneType(e, this.props.adminProfile)
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
                                        this.handleChoosePhoneType(e, this.props.adminProfile)
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
                                        this.handleChoosePhoneType(e, this.props.adminProfile)
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

                        <button className="" onClick={() => this.createAccount(this.props.adminProfile)}>
                            Create Your Compost Community!
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}
