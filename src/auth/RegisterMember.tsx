import '../App.css';
import React, { Component } from "react";
import { SetRegStep, User, SetRegComplete, MemberProfile, chooseCommunity} from "../types";
import {APIURL} from "../helpers/environment";

type RegisterMemberProps = {
    user: User,
    setRegStep: SetRegStep,
    setRegComplete: SetRegComplete
}

type RegisterMemberState = MemberProfile & chooseCommunity

const phoneNumberTypes = ["Mobile", "Office", "Home"]

export default class RegisterMember extends Component<
    RegisterMemberProps,
    RegisterMemberState
> {
    constructor(props: RegisterMemberProps) {
        super(props);
        this.state = {
            secondaryEmail: "",
            primaryPhone: "",
            primaryPhoneType: "",
            secondaryPhone: "",
            secondaryPhoneType: "",
            bio: "",
            locationName: "",
            locationAddress1: "",
            locationAddress2: "",
            locationCity: "",
            locationZip: "",
            locationState: "",
            locationNotes: "",
            selectedCommunityId: 0,
            availableCommunities: [],
        };
    }

    updateInputState(
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.ChangeEvent<HTMLSelectElement>
    ): void {
        let stateName: string = e.target.name;
        let stateValue: string = e.target.value;
        console.log(stateName, stateValue)
        this.setState((prevState) => ({
            ...prevState,
            [stateName]: stateValue,
        }));

    }

    handleChooseEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let primaryEmail = this.props.user.email;
        let secondaryEmailField = document.getElementById(
            "secondaryEmail"
        ) as HTMLInputElement;
        let checked = e.target.checked;
        console.log(e.target.checked);
        if (checked) {
            this.setState({ secondaryEmail: primaryEmail });
            secondaryEmailField.disabled = true;
        } else {
            this.setState({ secondaryEmail: "" });
            secondaryEmailField.disabled = false;
        }
    };

    handleChoosePhoneType = (e: React.ChangeEvent<HTMLInputElement>) => {
        const chosenType = e.target.getAttribute("data-select");
        const chosenTypeGroup = e.target.name;
        if (chosenType) {
            this.setState((prevState) => ({
                ...prevState,
                [chosenTypeGroup]: chosenType,
            }));
        }
    };

    //Collect a list of all available communities
    setAvailableCommunities = async () => {
        try {

            let allCommResponse = await fetch(`${APIURL}/community/all`, {
                method: "GET",
                headers: new Headers({ "Content-Type": "application/json" }),
            });

            let allCommJson = await allCommResponse.json();
            let communityList = await allCommJson.allCommunities;
            console.log(communityList)
            this.setState({availableCommunities: await communityList});
            // console.log();
        } catch (error) {
            console.log(error);
        }
    };

    handleFormSubmit = async () => {
        // Destructure State Object
        const {
            secondaryEmail,
            primaryPhone,
            primaryPhoneType,
            secondaryPhone,
            secondaryPhoneType,
            bio,
            locationName,
            locationAddress1,
            locationAddress2,
            locationCity,
            locationZip,
            locationState,
            locationNotes,
            selectedCommunityId
        } = this.state

        //Update Global State for registration step
        this.props.setRegComplete(true)

        //Get Session Token
        const token = localStorage.getItem("token")

        try {
            //Create new member profile associated with user profile
            let res = await fetch(`${APIURL}/member/create`, {
                method: "POST",
                body: JSON.stringify({
                    member: {
                        email_secondary: secondaryEmail,
                        phone_primary: primaryPhone,
                        phone_primary_type: primaryPhoneType,
                        phone_secondary: secondaryPhone,
                        phone_secondary_type: secondaryPhoneType,
                        bio: bio,
                        location_name: locationName,
                        location_address1: locationAddress1,
                        location_address2 : locationAddress2,
                        location_city: locationCity,
                        location_zip: locationZip,
                        location_state: locationState,
                        location_notes: locationNotes,
                        CommunityId: selectedCommunityId

                    }
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                })
            })
            let json = await res.json()
            console.log(json)

            //Mark registration as complete
            await fetch(`${APIURL}/user/update`, {
                method: "PUT",
                body: JSON.stringify({
                    user: {
                        registration_complete: "1"
                    }
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                })
            })

        }catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.setAvailableCommunities()
    }

    render() {
        return (
            <div className="user-register">
                <h1>Register Member Component</h1>
                <button onClick={() => console.log(this.state)}>
                    REGISTER MEMBER STATE CHECKER
                </button>
                <h2>{`Welcome ${this.props.user.firstName}`}</h2>
                <p>Answer a few more questions and we'll get you set up!</p>

                <form className="user-register-form" onSubmit={this.handleFormSubmit}>
                    {/* Email */}
                    <p className="register-text">
                        Do you have another email address you would like to be
                        listed publicly?
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
                        type="email"
                        placeholder="Secondary Email"
                        id="secondaryEmail"
                        name="secondaryEmail"
                        value={this.state.secondaryEmail}
                        onChange={(e) => this.updateInputState(e)}
                    />

                    {/* Primary Phone Number */}
                    <input
                        className="outlined-input"
                        type="tel"
                        placeholder="Primary Phone Number"
                        id="primaryPhone"
                        name="primaryPhone"
                        value={this.state.primaryPhone}
                        onChange={(e) => this.updateInputState(e)}
                    />

                    {/* Primary Phone Number Type */}
                    <div style={{ marginTop: "2rem" }}>
                        <p>Phone Number Type </p>
                        {phoneNumberTypes.map((type) => (
                            <label
                                key={`primary_${type}`}
                                className="check-container"
                            >
                                {type}
                                <input
                                    type="radio"
                                    id={`primaryPhoneType_${type}`}
                                    data-select={type}
                                    name="primaryPhoneType"
                                    onChange={(e) => {
                                        this.handleChoosePhoneType(e);
                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>
                        ))}
                    </div>

                    {/* Secondary Phone Number */}
                    <input
                        className="outlined-input"
                        type="tel"
                        placeholder="Secondary Phone Number"
                        id="secondaryPhone"
                        name="secondaryPhone"
                        value={this.state.primaryPhone}
                        onChange={(e) => this.updateInputState(e)}
                    />

                    {/* Secondary Phone Number Type */}
                    <div style={{ marginTop: "2rem" }}>
                        <p>Phone Number Type </p>
                        {phoneNumberTypes.map((type) => (
                            <label
                                key={`secondary_${type}`}
                                className="check-container"
                            >
                                {type}
                                <input
                                    type="radio"
                                    id={`secondaryPhoneType_${type}`}
                                    data-select={type}
                                    name="secondaryPhoneType"
                                    onChange={(e) => {
                                        this.handleChoosePhoneType(e);
                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>
                        ))}
                    </div>

                    {/* Bio */}
                    <label htmlFor="bio">
                        Bio. Let everybody know a little bit about who you are!
                    </label>
                    <textarea
                        className="outlined-input"
                        style={{
                            minHeight: "8rem",
                            maxHeight: "30vh",
                            maxWidth: "100%",
                            minWidth: "100%",
                        }}
                        placeholder="Your Bio"
                        id="bio"
                        name="bio"
                        value={this.state.bio}
                        onChange={(e) => this.updateInputState(e)}
                    />

                    {/* Location Name */}
                    <label htmlFor="location-name">
                        {" "}
                        Let us know information about the location we will
                        picking up your compost!{" "}
                    </label>
                    <input
                        className="outlined-input"
                        type="text"
                        placeholder="Pick-Up Location Name"
                        id="locationName"
                        name="locationName"
                        value={this.state.locationName}
                        onChange={(e) => this.updateInputState(e)}
                    />

                    {/* Location Address 1 */}
                    <input
                        className="outlined-input"
                        type="text"
                        placeholder="Address Line 1"
                        id="locationAddress1"
                        name="locationAddress1"
                        value={this.state.locationAddress1}
                        onChange={(e) => this.updateInputState(e)}
                    />

                    {/* Location Address 2 */}
                    <input
                        className="outlined-input"
                        type="text"
                        placeholder="Address Line 1"
                        id="locationAddress2"
                        name="locationAddress2"
                        value={this.state.locationAddress2}
                        onChange={(e) => this.updateInputState(e)}
                    />
                    {/* Location City */}
                    <input
                        className="outlined-input"
                        type="text"
                        placeholder="City"
                        id="locationCity"
                        name="locationCity"
                        value={this.state.locationCity}
                        onChange={(e) => this.updateInputState(e)}
                    />
                    {/* Location Zip */}
                    <input
                        className="outlined-input"
                        type="text"
                        placeholder="Zip Code"
                        id="locationZip"
                        name="locationZip"
                        value={this.state.locationZip}
                        onChange={(e) => this.updateInputState(e)}
                    />
                    {/* Location State */}
                    <input
                        className="outlined-input"
                        type="text"
                        placeholder="State"
                        id="locationState"
                        name="locationState"
                        value={this.state.locationState}
                        onChange={(e) => this.updateInputState(e)}
                    />

                    {/* Location Notes */}

                    <label htmlFor="location-notes">
                        Is there anything we should know about your pick-up
                        location?
                        <textarea
                            className="outlined-input"
                            style={{
                                minHeight: "8rem",
                                maxHeight: "30vh",
                                maxWidth: "100%",
                                minWidth: "100%",
                            }}
                            placeholder="Location Instructions / Notes"
                            id="locationNotes"
                            name="locationNotes"
                            value={this.state.locationNotes}
                            onChange={(e) => this.updateInputState(e)}
                        />
                    </label>

                    {/* Select A Community */}
                    <label>
                        Choose a Composting Community to Join!
                    <select
                        name={"selectedCommunityId"} //Must match state property name
                        value={this.state.selectedCommunityId}
                        onChange={(e) => this.updateInputState(e)}
                    >
                    {
                        this.state.availableCommunities.map(c => (
                            <option key= {c.id} value={c.id}>{c.name}</option>
                        ))
                    }
                    </select>
                    </label>

                    <button type="submit">Join Your Compost Community!</button>
                </form>
            </div>
        );
    }
}