import '../App.css';
import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps, Link } from "react-router-dom";
import { PickupGroups } from '../types';


type ManagePickupGroupsProps = 
    RouteComponentProps &
    {pickupGroups: PickupGroups}
    
type ManagePickupGroupsState = {}

class ManagePickupGroups extends Component<ManagePickupGroupsProps, ManagePickupGroupsState>{
    constructor(props:ManagePickupGroupsProps){
        super(props)
    }

    render(){
        return (
            <h3>Manage Pickup Groups</h3>
        )
    }
}

export default withRouter(ManagePickupGroups)