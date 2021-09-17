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

export class MemberRegister extends Component<{}, {}> {
    constructor(props: {}) {
        super(props)
    }

    render() {
        return (
            <h2>{`Welcome ----! Answer a few more questions to help you get set up!`}</h2>
        )
    }
}