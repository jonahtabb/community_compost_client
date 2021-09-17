import React, { Component } from "react";
import { AdminProfile, CommunityProfile, SetRegistrationComplete, SessionToken, SetAdminProfile, SetCommunityProfile, SetSessionToken, SetUserProfile, UserProfile } from "../App";
import "../App.css";
import { UserRegister } from "./UserRegister";
import { AdminRegister } from "./AdminRegister";
import { MemberRegister } from "./MemberRegister";

// Import types and group them in props
export type RegisterProps = 
    SessionToken &
    UserProfile &
    AdminProfile & 
    CommunityProfile &
    {setSessionToken: SetSessionToken} & 
    {setUserProfile: SetUserProfile} & 
    {setAdminProfile: SetAdminProfile} &
    {setCommunityProfile: SetCommunityProfile} &
    {setRegistrationComplete: SetRegistrationComplete}

//
export type AsAdmin = { asAdmin: boolean };
export type RegistrationStep = { registrationStep: number };
export type RegisterState = AsAdmin & RegistrationStep;

export class Register extends Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            asAdmin: true,
            registrationStep: 1,
        };
    }

    incrementRegStep = (): void => {
        this.setState((prevState) => {
            let newStep = prevState.registrationStep + 1;
            localStorage.setItem("registrationStep", newStep.toString());
            return {
                ...prevState,
                registrationStep: newStep,
            };
        });
    };

    toggleAsAdmin = (): void => {
        this.setState((prevState) => ({
            ...prevState,
            asAdmin: !prevState.asAdmin,
            registrationStep: 1
        }));
    };

    componentDidMount() {

        //Increase registration step on mount if necessary
        let regStep = localStorage.getItem("registrationStep");
        let token = localStorage.getItem("token");
        if (token && regStep && +regStep === 1) {
            this.setState({
                registrationStep: regStep ? +regStep : 1,
            });
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => console.log(this.state)}>
                    Register STATE CHECKER
                </button>

                {this.state.asAdmin ? (
                    <div>
                        <h3>Register as Compost Coordinator</h3>
                        <p>
                            Create an account to get started creating amazing
                            compost with help from your community!
                        </p>
                    </div>
                ) : (
                    <div>
                        <h3>Register as Member</h3>
                        <p>
                            Create an account to get compost picked-up directly
                            from your house and help making healthy soil!
                        </p>
                    </div>
                )}
                {this.state.registrationStep === 1 ? (
                    <UserRegister
                        asAdmin={this.state.asAdmin}
                        registrationStep={this.state.registrationStep}
                        incrementRegStep={this.incrementRegStep}
                        sessionToken={this.props.sessionToken}
                        setSessionToken={this.props.setSessionToken}
                        userProfile={this.props.userProfile}
                        setUserProfile={this.props.setUserProfile}
                    />
                ) : this.state.asAdmin === true &&
                  this.state.registrationStep === 2 ? (
                    <AdminRegister
                        asAdmin={this.state.asAdmin}
                        registrationStep={this.state.registrationStep}
                        incrementRegStep={this.incrementRegStep}
                        sessionToken={this.props.sessionToken}
                        setSessionToken={this.props.setSessionToken}
                        userProfile={this.props.userProfile}
                        setUserProfile={this.props.setUserProfile}
                        adminProfile={this.props.adminProfile}
                        setAdminProfile={this.props.setAdminProfile}
                        communityProfile={this.props.communityProfile}
                        setCommunityProfile={this.props.setCommunityProfile}
                        setRegistrationComplete={this.props.setRegistrationComplete}
                    />
                ) : <MemberRegister 
                        asAdmin={this.state.asAdmin}
                        registrationStep={this.state.registrationStep}
                        incrementRegStep={this.incrementRegStep}
                        sessionToken={this.props.sessionToken}
                        setSessionToken={this.props.setSessionToken}
                        userProfile={this.props.userProfile}
                        setUserProfile={this.props.setUserProfile}
                        // adminProfile={this.props.adminProfile}
                        // setAdminProfile={this.props.setAdminProfile}
                        // communityProfile={this.props.communityProfile}
                        // setCommunityProfile={this.props.setCommunityProfile}
                        setRegistrationComplete={this.props.setRegistrationComplete}                        
                    />
                }

                {this.state.asAdmin ? (
                    <div>
                        <p>Not a coordinator?</p>
                        <button
                            className="link-like-button"
                            onClick={() => this.toggleAsAdmin()}
                        >
                            Register as Member
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>Not a member?</p>
                        <button
                            className="link-like-button"
                            onClick={() => this.toggleAsAdmin()}
                        >
                            Register as Admin
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
