import React, { Component } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { loading_spinner } from "../assets";
import { camelToSentenceConverter, dayConverterNumToString } from '../helpers';
import { AdminProfile, CommunityMembers, CommunityProfile, MemberFullInfo, PickupGroup, PickupGroups, User } from '../types';


type AdminDashboardProps =
    RouteComponentProps & 
    {userData: User} &
    {adminProfile: AdminProfile} &
    {communityProfile: CommunityProfile} & 
    {communityMembers: CommunityMembers} &
    {pickupGroups: PickupGroups}

type AdminDashboardState = {memberModal: boolean, myProfileModal: boolean} & {selectedMember: MemberFullInfo}

class AdminDashboard extends Component<AdminDashboardProps, AdminDashboardState>{
    constructor(props: AdminDashboardProps){
        super(props)
        this.state= {
            memberModal: false,
            myProfileModal: false,
            selectedMember: {
                userProfile: {
                    id: null,
                    email: '',
                    firstName: '',
                    lastName: ''
                },
                memberProfile: {
                    secondaryEmail: "",
                    primaryPhone: "",
                    primaryPhoneType: "",
                    secondaryPhone: "",
                    secondaryPhoneType: "",
                    bio: "",
                    locationName: "",
                    locationAddress1: "",
                    locationAddress2: "",
                    locationCity: "",
                    locationZip: "",
                    locationState: "",
                    locationNotes: "",
                    pickupGroupId: null,
                }
            }
        }
    }

    toggleMemberModal = () => {

        this.setState((prevState) => ({
            ...prevState,
            memberModal: !prevState.memberModal
        }))
    }

    populateMemberModal = (userId: number) => {
        const selectedUser = this.props.communityMembers.find(member => member.userProfile.id === userId)
        if (selectedUser) {
            const {id, email, firstName, lastName} = selectedUser.userProfile
            const {
                secondaryEmail,
                primaryPhone,
                primaryPhoneType,
                secondaryPhone,
                secondaryPhoneType,
                bio,
                locationName,
                locationAddress1,
                locationAddress2,
                locationCity,
                locationZip,
                locationState,
                locationNotes,
                pickupGroupId
            } = selectedUser.memberProfile

            this.setState({
                selectedMember:{
                    userProfile: {
                        id: id,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                    },
                    memberProfile: {
                        secondaryEmail,
                        primaryPhone,
                        primaryPhoneType,
                        secondaryPhone,
                        secondaryPhoneType,
                        bio,
                        locationName,
                        locationAddress1,
                        locationAddress2,
                        locationCity,
                        locationZip,
                        locationState,
                        locationNotes,
                        pickupGroupId,
                    },
                }
            })
        }
    
    }

    handleClickDetails = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        let userId = +(event.currentTarget.getAttribute("user-id") ?? 0)
        this.populateMemberModal(userId)
        this.toggleMemberModal()
        console.warn("These errors are from the react-strap dependency. Either need an dependency update or to refactor the modal")
    }

    toggleMyProfileModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            myProfileModal: !prevState.myProfileModal
        }))
    }

    handleClickMyProfile = () => {
        this.toggleMyProfileModal()
    }


    render(){

        return (
            <div className="container-sm px-5">
                <h2>Coordinator Dashboard</h2>  
                <div className="row">
                    <div className="col-md">
                        {/* Community Details Summary */}
                        {
                            Object.values(this.props.communityProfile).some((value) => value === null || undefined)
                            ?   <img src={loading_spinner} alt="" />
                            :   <div className="dashboard-card-container">
                                <div className="card-header-container">
                                    <div>
                                        <p className="card-header-title">Community Details</p>
                                        <div className="card-header-title-underline"></div>
                                    </div>
                                    <button  className="link-button-small" style={{fontSize: ".7rem"}} onClick={() => this.handleClickMyProfile()}>Profile</button>
                                </div>

                                <div className="card-content-container">
                                    <h3 className="card-content-header">Name</h3>
                                    <p className="card-content-text">{this.props.communityProfile.communityName}</p>
                                    <h3 className="card-content-header">Description</h3>
                                    <p className="card-content-text">{this.props.communityProfile.communityDescription}</p>
                                </div>
                            </div>
                        }


                    <Modal isOpen={this.state.myProfileModal} toggle={this.toggleMyProfileModal} scrollable={true}>
                    <ModalHeader toggle={this.toggleMyProfileModal}>{this.state.selectedMember.userProfile.firstName} {this.state.selectedMember.userProfile.lastName}</ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <p>Name: {this.props.userData.firstName} {this.props.userData.lastName}</p> 
                            <p>Primary Email: {this.props.userData.email}</p> 
                            <p>Secondary Email: {this.props.adminProfile.secondaryEmail}</p> 
                            <p>Primary Phone: {this.props.adminProfile.phone}</p> 
                            <p>Bio: {this.props.adminProfile.bio}</p> 
                        </div>

                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>


                    {/* Pickup Groups List */}
                    <div className="dashboard-card-container">
                        <div className="card-header-container">
                            <div>
                                <p className="card-header-title">Pickup Groups</p> 
                                <div className="card-header-title-underline"></div>
                            </div>
                            <Link to={`/home/admin/groups`} className="link-button-small" style={{fontSize: ".7rem"}}> Manage Pickups</Link>
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
                            <h3 className="manage-link-text">Manage Pickups ???</h3>
                            {/* <h3 className="manage-link-arrow"></h3> */}
                        </Link>

                    </div>

                    </div>

                    <div className="col">
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
                                            <p className="card-content-text">{member.userProfile.email}</p>
                                            <p className="card-content-text">{member.memberProfile.primaryPhone}</p>
                                        </div>
                                        <div className="col-sm">
                                            <button  className="link-like-button" onClick={(e) => this.handleClickDetails(e)} user-id={member.userProfile.id}>Details</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
                {/* Member Details Modal */}
                <Modal isOpen={this.state.memberModal} toggle={this.toggleMemberModal} scrollable={true}>
                    <ModalHeader toggle={this.toggleMemberModal}>{this.state.selectedMember.userProfile.firstName} {this.state.selectedMember.userProfile.lastName}</ModalHeader>
                    <ModalBody>
                        {
                            //Map and display user data
                            Object.values(this.state.selectedMember.userProfile).map((value, index) => {
                                const userProfileKeys = Object.keys(this.state.selectedMember.userProfile)
                                const prettyKey = camelToSentenceConverter(userProfileKeys[index])
                                return (
                                    <p key={`userData${index}`}><strong>{prettyKey}:</strong> {value}</p>
                                )
                            })
                        }
                        {
                            //Map and display Member data
                            Object.values(this.state.selectedMember.memberProfile).map((value, index) => {
                                const memberProfileKeys = Object.keys(this.state.selectedMember.memberProfile)
                                const prettyKey = camelToSentenceConverter(memberProfileKeys[index])
                                return (
                                    <p key={`memberData${index}`}><strong>{prettyKey}:</strong> {value}</p>
                                )
                            })
                        }
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default withRouter(AdminDashboard)