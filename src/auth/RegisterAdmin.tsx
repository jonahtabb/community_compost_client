import '../App.css';
import React, { Component } from "react";
import { SetSessionToken, RegisterUserForm, IsAdmin, SetIsAdmin, AdminProfile} from "../types";
import {APIURL} from "../helpers/environment";

type RegisterAdminProps = {}
type RegisterAdminState = AdminProfile

export default class RegisterAdmin extends Component<RegisterAdminProps, RegisterAdminState>{
    constructor(props: RegisterAdminProps){
        super(props)
        this.state = {
            secondary_email: null,
            phone: null,
            phone_type: null,
            bio: null,
        }
    }
    render(){
        return (
            <div>
                <h1>Register Admin Component</h1>
            </div>
        )
    }
    

}