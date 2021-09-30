import { Component } from "react";
import { BrowserRouter as Switch, Redirect, Route, RouteComponentProps, withRouter } from "react-router-dom";
import '../App.css';
import { AdminHome } from '../home_admin';
import { MemberHome } from '../home_member';
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
                {/* Routes */}
                <Switch>
                    {this.props.isAdmin
                        ?   <Redirect to={`${this.props.match.path}/admin`} />
                        :   <Redirect to={`${this.props.match.path}/member`} />
                    }
                
                    <Route path = {`${this.props.match.path}/admin`}>
                        <AdminHome />
                    </Route>
                    <Route path = {`${this.props.match.path}/member`}>
                        <MemberHome />
                    </Route>
                </Switch>


            </div>
        )
    }
}

export default withRouter(Home)