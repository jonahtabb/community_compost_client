
import { Component } from "react";
import { SetSessionToken, IsAdmin, SetIsAdmin, User, SetUser, SetRegStep, SetRegComplete} from "../types";
import {RouteComponentProps, withRouter} from "react-router";
import {RegisterUser, RegisterAdmin, RegisterMember} from "./"

type RegisterProps =
    RouteComponentProps &
    {
        setSessionToken: SetSessionToken,
        isAdmin: IsAdmin,
        setIsAdmin: SetIsAdmin,
        user: User,
        setUser: SetUser,
        setRegComplete: SetRegComplete
    }

type RegisterState = {registrationStep: number}

class Register extends Component<RegisterProps, RegisterState>{
    constructor(props: RegisterProps){
        super(props)
        this.state = {
            registrationStep: 1
        }
    }

    //Method that increments registration step
    setRegStep: SetRegStep = () => {

        this.setState((prevState) => (
            {
                registrationStep: prevState.registrationStep + 1
            }
        ))
    }

    componentDidMount(){
        let registrationStep = localStorage.getItem("registrationStep")
        if (registrationStep){
            this.setState({registrationStep: +registrationStep})
        }
    }

    componentDidUpdate(){
        localStorage.setItem("registrationStep", this.state.registrationStep.toString())
    }

    render() {
        return (
            <div className="App register-container">
            {
                this.props.isAdmin
                ?    <>
                    <h2>Register As Compost Coordinator</h2>
                    <p>
                        Create an account to get started creating amazing
                        compost with help from your community!
                    </p>
                    </>

                :   <>
                    <h2>Register As Member</h2>
                    <p>
                        Create an account to get compost picked-up directly
                        from your house and help making healthy soil!
                    </p>
                    </>
                
            }
            
            {
                this.state.registrationStep === 1
                ?   <RegisterUser 
                        setSessionToken = {this.props.setSessionToken}
                        isAdmin = {this.props.isAdmin}
                        setIsAdmin = {this.props.setIsAdmin}
                        user = {this.props.user}
                        setUser = {this.props.setUser}
                        setRegStep = {this.setRegStep}
                    />
                :   (this.props.isAdmin)
                ?   <RegisterAdmin
                        user = {this.props.user}
                        setRegStep = {this.setRegStep}
                        setRegComplete = {this.props.setRegComplete}
                    />
                :   <RegisterMember 
                        user = {this.props.user}
                        setRegStep = {this.setRegStep}
                        setRegComplete = {this.props.setRegComplete}
                    />
            }

            {/* Toggle between Admin and Member Registration */}
            {this.props.isAdmin ? (
                    <div>
                        <p>Not a coordinator?</p>
                        <button
                            className="link-like-button"
                            onClick={() => this.props.setIsAdmin(false)}
                        >
                            Register as Member
                        </button>
                    </div>
                ) : (
                    <div>
                        <p>Not a member?</p>
                        <button
                            className="link-like-button"
                            onClick={() => this.props.setIsAdmin(true)}
                        >
                            Register as a Compost Coordinator
                        </button>
                    </div>
                )}

            </div>
        )
    }
}

export default withRouter(Register)