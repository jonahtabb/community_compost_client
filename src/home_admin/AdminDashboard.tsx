import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps, Link } from "react-router-dom";
import { CommunityMembers, CommunityProfile,  MemberFullInfo,  PickupGroup, PickupGroups } from '../types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { dayConverterNumToString } from '../helpers';
import green_arrow from '../assets/green_arrow.svg'


type AdminDashboardProps =
    RouteComponentProps & 
    {communityProfile: CommunityProfile} & 
    {communityMembers: CommunityMembers} &
    {pickupGroups: PickupGroups}

type AdminDashboardState = {modal: boolean}

class AdminDashboard extends Component<AdminDashboardProps, AdminDashboardState>{
    constructor(props: AdminDashboardProps){
        super(props)
    }

    render(){
        return (
            <div>
                <h2>Admin Dashboard</h2>  
                <div>
                    {/* Community Details Summary */}
                    <div className="dashboard-card-container">
                        <div className="card-header-container">
                            <div>
                                <p className="card-header-title">Community Details</p>
                                <div className="card-header-title-underline"></div>
                            </div>
                            <div>
                                <p className="card-header-edit">Edit REMOVE IF NOT FINISHED</p>
                            </div>
                        </div>

                        <div className="card-content-container">
                            <h3 className="card-content-header">Name</h3>
                            <p className="card-content-text">{this.props.communityProfile.communityName}</p>
                            <h3 className="card-content-header">Description</h3>
                            <p className="card-content-text">{this.props.communityProfile.communityDescription}</p>
                        </div>
                    </div>


                    {/* Pickup Groups List */}
                    <div className="dashboard-card-container">
                        <div className="card-header-container">
                            <div>
                                <p className="card-header-title">Pickup Groups</p>
                                <div className="card-header-title-underline"></div>
                            </div>
                        </div>
                        {
                            this.props.pickupGroups.map((group: PickupGroup) => {
                                const {id, name, description, startTime, endTime, day} = group
                                const dayString = dayConverterNumToString(+day)
                                return (
                                    <div className="card-content-container" key={`${id}`}>
                                    <h3 className="card-content-header">{name}</h3>
                                    <p className="card-content-text">{description}</p>
                                <p className="card-content-text">Pickups on {dayString} from {startTime} to {endTime}</p>
                                </div>
                                )}
                            )
                        }

                        <Link to={`/home/admin/groups`} className="manage-link-container">

                            <h3 className="manage-link-text">Manage Pickups</h3>
                                <img className="manage-link-arrow" src={green_arrow} alt="arrow" />

                        </Link>

                    </div>
                    

                    {/* Community Members List */}
                    <div className="dashboard-card-container">
                    <div className="card-header-container">
                        <div>
                            <p className="card-header-title">Community Members</p>
                            <div className="card-header-title-underline"></div>
                        </div>
                    </div>
                    {
                        this.props.communityMembers.map((member: MemberFullInfo) => (
                            <div className="row card-content-container " key={`${member.userProfile.firstName}${member.userProfile.lastName}`}>
                                <div className="col">
                                    <h3 className="card-content-header">{`${member.userProfile.firstName} ${member.userProfile.lastName}`}</h3>
                                </div>
                                <div className="col">
                                    <p className="card-content-text">{member.userProfile.email}</p>
                                    <p className="card-content-text">{member.memberProfile.primaryPhone}</p>
                                </div>
                            </div>
                            // <div className="card-content-container" key={`${member.userProfile.firstName}${member.userProfile.lastName}`}>


                            //</div> 
                        ))
                    }

                </div>


                    </div>
            </div>
        )
    }
}

export default withRouter(AdminDashboard)