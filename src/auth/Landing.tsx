import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { SetIsAdmin } from "../types";
import { man_carrying_carrot,
    man_carrying_radish,
    woman_carrying_apple,
    woman_carrying_pepper} from '../assets'


type LandingProps = RouteComponentProps &
    {setIsAdmin: SetIsAdmin}

type LandingState = {};

class Landing extends Component<LandingProps, LandingState> {
    constructor(props: LandingProps) {
        super(props);
    }

    render() {
        return (
            <div className="container landing-container">
                <div className="container my-4">
                    <h2>
                        The app that makes door-to-door compost pick-ups easy.
                    </h2>
                </div>
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