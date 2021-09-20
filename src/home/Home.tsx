import '../App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import {RouteComponentProps, withRouter} from "react-router";
import {APIURL, CLIENTURL} from "../helpers/environment";
import { AdminHome } from '../home_admin'

type HomeProps = {} & RouteComponentProps
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
                {/* Links */}
                <Link to={`${this.props.match.path}/admin`}>
                    <button type="button">Admin</button>
                </Link>
                <Link to={`${this.props.match.path}/member`}>
                    <button type="button">Member</button>
                </Link>

                {/* Routes */}
                <Switch>
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