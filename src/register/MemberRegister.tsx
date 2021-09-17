import React, { Component } from "react";
import APIURL from "../helpers/environment";
import { AdminProfile, CommunityProfile, SetRegistrationComplete, SessionToken, SetAdminProfile, SetCommunityProfile, UserProfile, SetMemberProfile, SetUserProfile, MemberProfile, AllCommunities } from "../App";
import {
    AsAdmin,
    RegistrationStep,
} from "./Register";

export type MemberRegisterProps =
        AsAdmin &
        RegistrationStep &
        SessionToken &
        UserProfile & 
        MemberProfile &
        CommunityProfile &
        AllCommunities &
        { incrementRegStep: () => void } & 
        { setSessionToken: (newToken: string) => void } & 
        { setUserProfile: SetUserProfile} &
        { setRegistrationComplete: SetRegistrationComplete} &
        { setMemberProfile: SetMemberProfile} &
        { setCommunityProfile: SetCommunityProfile }

export class MemberRegister extends Component<MemberRegisterProps, {}> {
    constructor(props: MemberRegisterProps) {
        super(props)
    }

    handleChooseEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let primaryEmail = this.props.userProfile.email;
        let secondaryEmailField = document.getElementById(
            "emailSecondary"
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

    handleSubmitForm = async (event:React.FormEvent<HTMLFormElement>): Promise<any> => {
        event.preventDefault();
        //Destructure memberProfile state of App.js
        const {
            emailSecondary,
            phonePrimary,
            phonePrimaryType,
            phoneSecondary,
            phoneSecondaryType,
            bio,
            locationName,
            locationAddress1,
            locationAddress2,
            locationCity,
            locationZip,
            locationState,
            locationNotes } = this.props.memberProfile
        

            let memberResponse = await fetch(`${APIURL}/member/create`, {
                method: "POST",
                body: JSON.stringify({
                    member: {
                        email_secondary: emailSecondary,
                        phone_primary: phonePrimary,
                        phone_primary_type: phonePrimaryType,
                        phone_secondary: phoneSecondary,
                        phone_secondary_type: phoneSecondaryType,
                        bio: bio,
                        location_name: locationName,
                        location_address1: locationAddress1,
                        location_address2:locationAddress2,
                        location_city: locationCity,
                        location_zip: locationZip,
                        location_state: locationState,
                        location_notes: locationNotes
                    }
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.props.sessionToken}`
                })
            })
            let memberJson = await memberResponse.json()
            console.log(memberJson)
    }
    //Create new member profile associated with user profile
    

    handleChoosePhoneType =  (e: React.ChangeEvent<HTMLInputElement>, propertyName: string): void => {
        const chosenType = e.target.getAttribute("data-select")
        if (chosenType) this.props.setMemberProfile(propertyName, chosenType)
            else console.error("Tried to pass a null or undefined value into phone type function in MemberRegister")
    }

    render() {
        return (
            

            <div>
                <h2>{`Welcome ${this.props.userProfile.firstName}! Answer a few more questions to help you get set up!`}</h2>
                <p>Answer a few more questions and we'll get you set up!</p>
                <div className="user-register">
                    <form 
                        className="user-register-form" 
                        onSubmit={this.handleSubmitForm}
                    >
                        {/* <label>
                            <p>Choose The Community You want to Join</p>
                            <select value={this.props.communityProfile.id}>

                        {
                            this.props.allCommunities.map(community => {
                                <option value={community.id}>TEST</option>
                            })
                        }
                            </select>
                        </label> */}
                        {/* <label>
                        Pick your favorite flavor:
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                        </label> */}
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
                            id="emailSecondary"
                            name="emailSecondary"
                            value={this.props.memberProfile.emailSecondary}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
                        />
                        {/* Phone Number */}
                        <input
                            className="outlined-input"
                            type="tel"
                            placeholder="Phone Number"
                            id="phonePrimary"
                            name="phonePrimary"
                            value={this.props.memberProfile.phonePrimary}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
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
                                        this.handleChoosePhoneType(e, "phonePrimaryType")
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
                                        this.handleChoosePhoneType(e, "phonePrimaryType")
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
                                        this.handleChoosePhoneType(e, "phonePrimaryType")
                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>
                        {/* Secondary Phone Number */}
                        <input
                            className="outlined-input"
                            type="tel"
                            placeholder="Secondary Phone Number"
                            id="phoneSecondary"
                            name="phoneSecondary"
                            value={this.props.memberProfile.phoneSecondary}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
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
                                        this.handleChoosePhoneType(e, "phoneSecondaryType")
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
                                        this.handleChoosePhoneType(e, "phoneSecondaryType")
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
                                        this.handleChoosePhoneType(e, "phoneSecondaryType")
                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        <label htmlFor="bio">
                        Introduce your self! Why are you interesting in composting?       
                        <textarea
                            className="outlined-input"
                            style={{minHeight: "8rem", maxHeight:"30vh", maxWidth: '100%', minWidth: '100%' }}
                            placeholder="Your Bio"
                            id="bio"
                            name="bio"
                            value={this.props.memberProfile.bio}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
                        />
                        </label>
                    <label htmlFor="location-name"> Let us know information about the location we will picking up your compost! </label>
                        <input
                            className="outlined-input"
                            type="text"
                            placeholder="Pick-Up Location Name"
                            id="locationName"
                            name="locationName"
                            value={this.props.memberProfile.locationName}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
                        />
                        <input
                            className="outlined-input"
                            type="text"
                            placeholder="Address Line 1"
                            id="locationAddress1"
                            name="locationAddress1"
                            value={this.props.memberProfile.locationAddress1}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
                        />
                        <input
                            className="outlined-input"
                            type="text"
                            placeholder="Address Line 1"
                            id="locationAddress2"
                            name="locationAddress2"
                            value={this.props.memberProfile.locationAddress2}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
                        />
                        <input
                            className="outlined-input"
                            type="text"
                            placeholder="City"
                            id="locationCity"
                            name="locationCity"
                            value={this.props.memberProfile.locationCity}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
                        />
                        <input
                            className="outlined-input"
                            type="text"
                            placeholder="Zip Code"
                            id="locationZip"
                            name="locationZip"
                            value={this.props.memberProfile.locationZip}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
                        />
                        <input
                            className="outlined-input"
                            type="text"
                            placeholder="State"
                            id="locationState"
                            name="locationState"
                            value={this.props.memberProfile.locationState}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
                        />

                        <label htmlFor="location-notes">
                        Is there anything we should know about your pick-up location?     
                        <textarea
                            className="outlined-input"
                            style={{minHeight: "8rem", maxHeight:"30vh", maxWidth: '100%', minWidth: '100%' }}
                            placeholder="Location Instructions / Notes"
                            id="locationNotes"
                            name="locationNotes"
                            value={this.props.memberProfile.locationNotes}
                            onChange={ e => {
                                this.props.setMemberProfile( e.target.name, e.target.value )
                            }}
                        />
                        </label>

                        <button className="" type="submit">
                            Join Your Compost Community!
                        </button>
                    </form>

                </div>
            </div>
        )
    }
}