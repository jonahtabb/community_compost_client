import '../App.css';
import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps, Link } from "react-router-dom";
import { AdminHome } from '../home_admin'
import { IsAdmin } from '../types';
import { Header } from '../common';
import { MemberHome } from '../home_member';


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
                        <MemberHome />
                    </Route>
                </Switch>


            </div>
        )
    }
}

export default withRouter(Home)