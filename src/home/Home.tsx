import '../App.css';
import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps, Link } from "react-router-dom";
import { AdminHome } from '../home_admin'
import { IsAdmin } from '../types';

type HomeProps = 
    {isAdmin: IsAdmin} & 
    RouteComponentProps

type HomeState = {}

class Home extends Component<HomeProps, HomeState>{
    constructor(props: HomeProps){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <div>
                
                <h1>Home Component</h1>
                {/* Temp Links */}
                <p>These are temporary links for easy access</p>
                <Link to={`${this.props.match.path}/admin`}>
                    <button type="button">Admin</button>
                </Link>
                <Link to={`${this.props.match.path}/member`}>
                    <button type="button">Member</button>
                </Link>

                {/* Routes */}
                <Switch>
                    {this.props.isAdmin
                        ?   <Redirect to={`${this.props.match.path}/admin`} />
                        :   <Redirect to={`${this.props.match.path}/member`} />
                    }
                
                    <Route exact path = {`${this.props.match.path}/admin`}>
                        <AdminHome />
                    </Route>
                    <Route exact path = {`${this.props.match.path}/member`}>
                        <h1>Member Components</h1>
                    </Route>
                </Switch>


            </div>
        )
    }
}

export default withRouter(Home)