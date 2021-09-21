import '../App.css';
import { Component } from "react";
import { BrowserRouter as Switch, Route, Redirect, withRouter, RouteComponentProps, Link } from "react-router-dom";
import { CommunityProfile } from '../types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



type AdminDashboardProps = 
    {communityProfile: CommunityProfile} & 
    RouteComponentProps

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
            </div>
        )
    }
}

export default withRouter(AdminDashboard)