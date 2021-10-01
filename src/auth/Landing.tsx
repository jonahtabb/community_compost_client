import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { IsAdmin, SessionToken, SetIsAdmin, SetRegComplete, SetSessionToken, SetUser, User } from "../types";
import { man_carrying_carrot,
    man_carrying_radish,
    woman_carrying_apple,
    woman_carrying_pepper,
    happy_carrot,
    speech_bubble} from '../assets'
import { ADMIN_DEMO_EMAIL, ADMIN_DEMO_PASSWORD, APIURL, loginUser, MEMBER_DEMO_EMAIL, MEMBER_DEMO_PASSWORD } from "../helpers";


type LandingProps = 
    RouteComponentProps &
    {
        sessionToken: SessionToken,
        setSessionToken: SetSessionToken,
        isAdmin: IsAdmin,
        setIsAdmin: SetIsAdmin,
        user: User,
        setUser: SetUser
        setRegComplete: SetRegComplete
    }

type LandingState = {
    speechBubble: boolean;
};


class Landing extends Component<LandingProps, LandingState> {
    constructor(props: LandingProps) {
        super(props);
        this.state = {
            speechBubble: false,
        }
    }

    toggleSpeechBubble = () => {
        this.setState({
            speechBubble: true
        })
    }

    loginDemo = async (e: React.MouseEvent<HTMLButtonElement>) => {
            const loginType = e.currentTarget.getAttribute("data-demo-type")
            let email = ''
            let password = ''
            if (loginType) {
                email = loginType === "admin" ? ADMIN_DEMO_EMAIL : MEMBER_DEMO_EMAIL
                password = loginType === "admin" ? ADMIN_DEMO_PASSWORD : MEMBER_DEMO_PASSWORD
            } else {
                throw new Error ("Was not able to find the login information for the demo.")
            }


            try {
                const res = await loginUser(email, password)
    
                if (res.status === 200) {
                    const json = await res.json()

                    //Get Name from json response
                    const {first_name, last_name, is_admin, registration_complete} = await json.user

                    let token = await json.sessionToken
                    //Store Session Token in App State
                    this.props.setSessionToken(token)
    
                    //Store isAdmin in App State
                    this.props.setIsAdmin(is_admin)
    
                    //Set regComplete in App State
                    this.props.setRegComplete(registration_complete)
                }

            } catch (error) {
                console.error({error})
            }
    }
    
    
    render() {
        
        return (
            <div className="container landing-container">

                <div className="container my-4">
                    <h2>
                        The app that makes door-to-door compost pick-ups easy.
                    </h2>
                </div>

                {
                    (this.props.sessionToken) ?

                        <Link 
                            to={`home/${this.props.isAdmin ? "admin" : "member"}/dashboard`}
                            className="react-router-link-button"
                            >
                                {this.props.isAdmin ? "Coordinator Dashboard" : "Member Dashboard"}
                        </Link>
                    :   <>
                            <div className="container d-flex justify-content-center">
                                
                                <Link 
                                    to={`${this.props.match.path}/register`}
                                    className="react-router-link-button"
                                    onClick={() => this.props.setIsAdmin(false)}
                                    >
                                        Schedule Your Compost Pick-Up
                                </Link>

                            </div>

                            <div className="container d-flex flex-column align-items-center">
                                <p style={{textAlign:"center"}}>
                                    Are you a community garden, farmer, or just an all-round
                                    awesome person?
                                </p>
                                <Link 
                                    to={`${this.props.match.path}/register`}
                                    className="link-like-button"
                                    onClick={() => this.props.setIsAdmin(true)}
                                    >
                                        Start composting in your neighborhood today!               
                                </Link>
                            </div>
                        

                
                

                            <div className="happy-carrot-container">
                                {
                                    this.state.speechBubble
                                    ?
                                        <>
                                        <div className="speech-bubble-container" onClick={this.toggleSpeechBubble}>

                                        <div className="speech-bubble-text-wrapper-toggled">
                                            <button 
                                                className="speech-bubble-text-toggled"
                                                data-demo-type="admin"
                                                onClick={(e) => this.loginDemo(e)}
                                                >Coordinator Demo 
                                            </button>
                                            <button
                                                className="speech-bubble-text-toggled"
                                                data-demo-type="member"
                                                onClick={(e) => this.loginDemo(e)}
                                                >Member Demo
                                            </button>
                                        </div>

                                        <img src={speech_bubble} alt="" className="speech-bubble"/>
                                        </div>

                                        <img src={happy_carrot} alt="Animated Smiling Carrot" className="happy-carrot-image clickable" onClick={this.toggleSpeechBubble} />
                                        </>  
                                    :   <>
                                        <div className="speech-bubble-container clickable" onClick={this.toggleSpeechBubble}>

                                        <div className="speech-bubble-text-wrapper" onClick={this.toggleSpeechBubble} >
                                            <p className="speech-bubble-text">Click me to view a demo!</p>
                                        </div>


                                        <img src={speech_bubble} alt="" className="speech-bubble"/>
                                        </div>

                                        <img src={happy_carrot} alt="Animated Smiling Carrot" className="happy-carrot-image clickable" onClick={this.toggleSpeechBubble} />
                                        </>     
                                }
                            </div>
                        </>
                }

                <div className="container d-flex justify-content-center align-items-end">
                    <div className="row">
                        <div className="col d-flex flex-column justify-content-end">
                            <img src={man_carrying_carrot}alt="" className="landing-image" />
                        </div>

                        <div className="col d-flex flex-column justify-content-end">
                            <img src={woman_carrying_pepper}alt="" className="landing-image" />
                        </div>

                        <div className="col d-flex flex-column justify-content-end">
                            <img src={woman_carrying_apple}alt=""className="landing-image"  />
                        </div>

                        <div className="col d-flex flex-column justify-content-end">
                            <img src={man_carrying_radish}alt=""className="landing-image"  />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Landing)