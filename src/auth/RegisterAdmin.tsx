import React, { Component } from "react";
import { APIURL } from "../helpers/environment";
import { AdminProfile, CommunityProfile, SetRegComplete, SetRegStep, User } from "../types";

type RegisterAdminProps = 
    {
        user: User,
        setRegStep: SetRegStep ,
        setRegComplete: SetRegComplete
    }
type RegisterAdminState = AdminProfile & CommunityProfile

const phoneNumberTypes = ["Mobile", "Office", "Home"]

export default class RegisterAdmin extends Component<RegisterAdminProps, RegisterAdminState>{
    constructor(props: RegisterAdminProps){
        super(props)
        this.state = {
            secondaryEmail: '',
            phone: '',
            phoneType: '',
            bio: '',
            communityName: '',
            communityDescription: ''
        }
    }

    handleChooseEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let primaryEmail = this.props.user.email;
        let secondaryEmailField = document.getElementById("secondaryEmail") as HTMLInputElement
        let checked = e.target.checked;
        console.log(e.target.checked);
        if (checked) {
            this.setState({secondaryEmail: primaryEmail}) ;
            secondaryEmailField.disabled = true;
        } else {
            this.setState({secondaryEmail: ''});
            secondaryEmailField.disabled = false;
        }
    };

    updateInputState(e: 
        React.ChangeEvent<HTMLInputElement> |
        React.ChangeEvent<HTMLTextAreaElement>
        ): void {
        let stateName: string = e.target.name;
        let stateValue: string = e.target.value;
        this.setState((prevState) => ({
            ...prevState,
            [stateName]: stateValue
        }))
    }

    handleChoosePhoneType = (
        e: React.ChangeEvent<HTMLInputElement> 
        ) => {
        const chosenType = e.target.getAttribute("data-select");
        if (chosenType) {
            this.setState({
                phoneType: chosenType
            })
        }
    }

    handleFormSubmit = async (): Promise<any> => {
        ///Destructure State Object
        const {secondaryEmail, phone, phoneType, bio, communityName, communityDescription} = this.state

        //Update State
        this.props.setRegComplete(true)

        //Get Session Token
        const token = localStorage.getItem("token")
        try {
            //Create new admin profile associated with user profile
            let adminResponse = await fetch(`${APIURL}/admin/create`, {
                method: "POST",
                body: JSON.stringify({
                    admin: {
                        email_secondary: secondaryEmail,
                        phone: phone,
                        phone_type: phoneType,
                        bio: bio
                    }
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                })
            })
            let adminJson = await adminResponse.json()

            console.log(adminJson)
            //Create new community profile associated with user profile
            await fetch(`${APIURL}/community/create`, {
                method: "POST",
                body: JSON.stringify({
                    community: {
                        name: communityName,
                        description: communityDescription
                    }
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                })
            })

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


        } catch (error) {
            console.log(error)
        }

    }

    render(){
        return (
            <div>
                <h2>{`Welcome ${this.props.user.firstName}`}</h2>
                <p>Answer a few more questions and we'll get you set up!</p>
                <div className="user-register-form">
                    <form onSubmit={(e)=> {this.handleFormSubmit()}} className="user-register-form">
                        {/* Email Address */}
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
                            type="email"
                            placeholder="Secondary Email"
                            id="secondaryEmail"
                            name="secondaryEmail"
                            value={this.state.secondaryEmail}
                            onChange={(e) => this.updateInputState(e)}
                        />

                        {/* Phone Number */}
                        <input
                            className="outlined-input"
                            type="tel"
                            placeholder="Phone Number"
                            id="phone"
                            name="phone"
                            value= {this.state.phone}
                            onChange={(e) => this.updateInputState(e)}
                        />

                        {/* Phone Number Type */}
                        <div style={{ marginTop: "2rem"}}>
                            <p>Phone Number Type </p>
                        {
                            phoneNumberTypes.map(type => (
                                <label key={type} className="check-container">
                                {type}
                                <input
                                    type="radio"
                                    id={`phoneType_${type}`}
                                    data-select={type}
                                    name="phoneNumberType"
                                    onChange={(e) => {
                                        this.handleChoosePhoneType(e)
                                    }}
                                />
                                <span className="checkmark"></span>
                            </label>
                            ))
                        }
                        </div>

                        {/* Bio */}
                        <label htmlFor="bio">
                                    Bio. Let everybody know a little bit about who you are!
                        </label>
                        <textarea
                            className="outlined-input"
                            style={{minHeight: "8rem", maxHeight:"30vh", maxWidth: '100%', minWidth: '100%' }}
                            placeholder="Your Bio"
                            id="bio"
                            name="bio"
                            value= {this.state.bio}
                            onChange={(e) => this.updateInputState(e)}
                        />
                        {/* Community Name */}
                        <label htmlFor="communityName">
                                    Choose a name for your compost pick-up community.  This might be the name of your neighborhood, business, or community garden.
                        </label>
                        <input
                            className="outlined-input"
                            type="text"
                            placeholder="Community Name"
                            id="communityName"
                            name="communityName"
                            value={this.state.communityName}
                            onChange={(e) => this.updateInputState(e)}
                        />

                        {/* Community Description */}

                        <label htmlFor="communityDescription">
                                    Description. What should members know about your community composting group?
                        </label>
                        <textarea
                            className="outlined-input"
                            style={{minHeight: "8rem", maxHeight:"30vh", maxWidth: '100%', minWidth: '100%' }}
                            placeholder="Community Description"
                            id="communityDescription"
                            name="communityDescription"
                            value={this.state.communityDescription}
                            onChange={(e) => this.updateInputState(e)}
                        />

                        <button type="submit"> Create Your Composting Community!</button>
                    </form>

                </div>
            </div>
        )
    }
    

}