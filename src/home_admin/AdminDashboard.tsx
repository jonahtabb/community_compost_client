import '../App.css';
import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps, Link } from "react-router-dom";
import { CommunityMembers, CommunityProfile, MemberProfileSummary, PickupGroup, PickupGroups } from '../types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { dayConverterNumToString } from '../helpers';


type AdminDashboardProps =
    RouteComponentProps & 
    {communityProfile: CommunityProfile} & 
    {communityMembers: CommunityMembers} &
    {pickupGroups: PickupGroups}

type AdminDashboardState = {modal: boolean}

class AdminDashboard extends Component<AdminDashboardProps, AdminDashboardState>{
    constructor(props: AdminDashboardProps){
        super(props)
        this.state = {
            modal: false
        }
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    render(){
        return (
            <div>
                <h2>Admin Dashboard</h2>  
                <div>
                    {/* Community Details Summary */}
                    <div className="card-header-container">
                        <div>
                            <p className="card-header-title">Community Details</p>
                            <div className="card-header-title-underline"></div>
                        </div>
                        <div>
                            <p className="card-header-edit">Edit</p>
                        </div>
                    </div>

                    <div className="card-content-container">
                        <h3 className="card-content-header">Name</h3>
                        <p className="card-content-text">{this.props.communityProfile.communityName}</p>
                        <h3 className="card-content-header">Description</h3>
                        <p className="card-content-text">{this.props.communityProfile.communityDescription}</p>
                    </div>

                    {/* Pickup Groups List */}

                    <div className="card-header-container">
                        <div>
                            <p className="card-header-title">Pickup Groups</p>
                            <div className="card-header-title-underline"></div>
                        </div>
                        <div>
                            <p className="card-header-edit">Edit</p>
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

                    <Link to={`/home/admin/groups`}>
                        <div className="manage-link-container">
                        <h3 className="manage-link-text">Manage Pickups</h3>
                            <img className="manage-link-arrow" src='/assets/green_arrow.svg' alt="arrow" />
                        </div>
                    </Link>

                    {/* Community Members List */}
                    <div className="card-header-container">
                        <div>
                            <p className="card-header-title">Community Members</p>
                            <div className="card-header-title-underline"></div>
                        </div>
                        <div>
                            <p className="card-header-edit">Edit</p>
                        </div>
                    </div>
                    {
                        this.props.communityMembers.map((member: MemberProfileSummary) => (
                            <div className="card-content-container" key={`${member.userId}${member.lastName}`}>
                                <h3 className="card-content-header">{member.firstName} {member.lastName}</h3>
                                <p className="card-content-text">{member.email}</p>
                                <p className="card-content-text">{member.phonePrimary}</p>
                            </div>
                        ))
                    }

                </div>
                <Button color="danger" onClick={this.toggleModal}>Test Modal</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal">
                    <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                    <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
            </div>
        )
    }
}

export default withRouter(AdminDashboard)