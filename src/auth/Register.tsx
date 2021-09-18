import '../App.css';
import React, { Component } from "react";
import { SetSessionToken, RegisterUserForm, IsAdmin, SetIsAdmin, RegisterState} from "../types";
import {APIURL} from "../helpers/environment";
import {RouteComponentProps, withRouter} from "react-router";
import {RegisterUser, RegisterAdmin} from "./"

type RegisterProps =
RouteComponentProps &
{setSessionToken: SetSessionToken} &
{isAdmin: IsAdmin} &
{setIsAdmin: SetIsAdmin}

class Register extends Component<RegisterProps, RegisterState>{
    constructor(props: RegisterProps){
        super(props)
        this.state = {
            registrationStep: 1
        }
    }

    render() {
        return (
            <>
            <h3>REGISTER COMPONENT</h3>
            {
                this.state.registrationStep === 1
                ?   <RegisterUser 
                        setSessionToken = {this.props.setSessionToken}
                        isAdmin = {this.props.isAdmin}
                        setIsAdmin = {this.props.setIsAdmin}
                    />
                :   (this.props.isAdmin)
                ?   <RegisterAdmin />
                :   <h3>REGISTER MEMBER COMPONENT</h3>
            }

            </>
        )
    }
}

export default withRouter(Register)