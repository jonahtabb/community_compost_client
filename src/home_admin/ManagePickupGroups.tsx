import { group } from "console";
import React, { Component } from "react";
import {
    RouteComponentProps, withRouter , Link
} from "react-router-dom";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addNewPickupGroup, dayConverterNumToString, deletePickupGroup } from "../helpers";
import {
    CommunityMembers,
    MemberFullInfo,
    NewPickupGroup,
    PickupGroup,
    PickupGroups,
    SetMemberGroup,
    SetPickupGroups
} from "../types";

/*  Welcome to the Manage Pickup Groups Component!
    You've notices that there is a lot of chained filtering, sorting and mapping! 
    One of my goals for this project has been to experiment with different levels of display my mapping.
    This has been useful for me to access the practicality, readability displaying the data using different approaches.
*/ 

type ManagePickupGroupsProps = RouteComponentProps & {
    pickupGroups: PickupGroups;
} & {setPickupGroups: SetPickupGroups} & { communityMembers: CommunityMembers } & { setMemberGroup: SetMemberGroup } & {setNeedsUpdate: () => void};

type ManagePickupGroupsState = { dropdownOpen: boolean, addNewGroupModal:boolean, deleteGroupModal:boolean, groupToDeleteId:number | null, groupToDeleteName: string } & {newPickupGroup: NewPickupGroup};
 
class ManagePickupGroups extends Component<
    ManagePickupGroupsProps,
    ManagePickupGroupsState
> {
    constructor(props: ManagePickupGroupsProps) {
        super(props);
        this.state = {
            dropdownOpen: false,
            addNewGroupModal: false,
            deleteGroupModal: false,
            groupToDeleteId: null,
            groupToDeleteName: '',
            newPickupGroup: {
                name: '',
                description: '',
                publicNotes: '',
                startTime: '',
                endTime: '',
                day: 1
            }
        };
    }

    toggleAddNewGroupModal = () => {
        this.setState((prevState) => ({
            ...prevState,
            addNewGroupModal: !prevState.addNewGroupModal
        }))
    }
 
    handleAddNewGroup = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault(); 
        const token: string = localStorage.getItem("token") || ''
        const newPickupGroup: NewPickupGroup = this.state.newPickupGroup;
        if (token && newPickupGroup){
            const res = await addNewPickupGroup(token, newPickupGroup)
            const addedPickupGroup = await res.newPickupGroup
            this.props.setPickupGroups(addedPickupGroup)
            this.setState((prevState) => ({
                ...prevState,
                addNewGroupModal: false,
                newPickupGroup: {
                    name: '',
                    description: '',
                    publicNotes: '',
                    startTime: '',
                    endTime: '',
                    day: 1
                }
            }))
        }
    }

    handleNewGroupOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
        let stateName: string = e.target.name;
        let stateValue: string = e.target.value;
        this.setState((prevState) => ({
            ...prevState,
            newPickupGroup:{
                ...prevState.newPickupGroup,
                [stateName]: stateValue
            }
        }));
    }

    handleNewGroupSelectDay(e:React.ChangeEvent<HTMLSelectElement>):void {
        const dayNum = +(e.target.value)
        this.setState((prevState) => ({
            ...prevState,
            newPickupGroup:{
                ...prevState.newPickupGroup,
                day: dayNum
            }
        }))
    }

    toggleDeleteGroupModal = () => {
        console.log("triggered")
        this.setState((prevState) => ({
            ...prevState,
            deleteGroupModal: !prevState.deleteGroupModal
        }))
    }

    handleClickDeleteDashboard = (e: React.MouseEvent<HTMLButtonElement>) => {
        let element = e.currentTarget
        let groupId = parseInt(element.getAttribute("data-group-id") || '-1');
        let groupIndex = this.props.pickupGroups.findIndex((value) => value.id === groupId);
        let groupName = this.props.pickupGroups[groupIndex].name;
        console.log(groupName)
        if (typeof groupId)
        this.setState({
            groupToDeleteId: groupId,
            groupToDeleteName: groupName
        })
        this.toggleDeleteGroupModal()
    }

    handleClickDeleteModal= async (): Promise<any> => {
        let token = localStorage.getItem("token")
        let groupId = this.state.groupToDeleteId ?? -1
        if (token) {
            try {
                this.props.setNeedsUpdate()
                this.toggleDeleteGroupModal();
                await deletePickupGroup(token, groupId);
                
            }catch (error) {
                console.error({error, message: "delete failed"})
            }

        }
        
    }

    render() {
        /*  
            Pre-sort and / or copy the arrays that will be used for mapping and filtered in the JSX return.
            This avoids trying to mutate the original arrays which is stored in state.
            The also maps the mapping and filtering look a little cleaner, and provides a 'table of contents' of the arrays that will be used below.
            I've noticed that destructuring of a full array automatically passes the type info into the duplicated array - that's cool!
        */  
        const pickupGroups = [...this.props.pickupGroups].sort((a,b)=>(+(a.id || 0) - +(b.id || 0)))
        const communityMembers = [...this.props.communityMembers]
        
        return (
            <div className="container" style={{paddingBottom:'100px'}}>
                <h3>Manage Pickup Groups</h3>
                <div className="row d-flex justify-content-between">
                    <div className="col">
                        <button className="link-button-small my-4" onClick={this.toggleAddNewGroupModal}>Add New Group</button>
                    </div>
                    <div className="col">
                        <button
                            onClick={() => {this.props.history.goBack()}}
                            className="link-button-small my-4"
                            type="button"
                        >
                            Back to Dashboard 
                        </button>
                    </div>
                </div>
                

                {/* Sort, Map, and Display the name of each pickup group */}
                {/* Note: this .sort() method just below only sorts by group id. An additional order field should be added for proper sorting */}
                {pickupGroups.map((group: PickupGroup) => (
                    <div key={`group${group.id}`}>
                        {/* Group Header Info */}
                        <div className="container card-header-container my-3"
                                key={`groupid${group.id}`}
                        >
                            <div className="row w-50 justify-content-between">
                            <div className="col">
                                <p

                                    className="card-header-title"
                                >
                                    {group.name} 
                                    <br></br>
                                    <span style={{fontSize: ".8rem", fontWeight:200}}>{dayConverterNumToString(group.day)}s from {group.startTime} to {group.endTime}</span> 
                                </p>
                                <div className="card-header-title-underline"></div>
                            </div>
                            <div className="col">
                                <button 
                                    onClick={(e) => this.handleClickDeleteDashboard(e)}
                                    className="link-button-small"
                                    data-group-id={group.id}
                                    style={{fontSize: ".65rem"}}>
                                    Delete {group.name}
                                </button>
                            </div>
                            </div>
                        </div>
                        {/* Group Members */}
                        <div className="card-content-container">
                            {communityMembers
                            //Filter the group members to only display members from this pickup group
                                .filter(
                                    (member: MemberFullInfo) =>
                                        member.memberProfile.pickupGroupId ===
                                        group.id
                                )
                            //Map over the filtered members to display details from each member
                                .map((member: MemberFullInfo) => (
                                    <div
                                        className="container pickup-group-container"
                                        key={`userid${member.userProfile.id}`}
                                    >
                                        <div className="row">
                                            <div className="col my-auto">
                                                <p className="group-member-text">
                                                    <strong>{`${member.userProfile.firstName} ${member.userProfile.lastName}`}</strong> | {`${member.memberProfile.locationAddress1}`}
                                                </p>
                                            </div>
                                            <div className="col d-flex">
                                            <div className="dropdown my-1">
                                                <button className="dropbtn">
                                                    Change Group
                                                </button>
                                                <div className="dropdown-content">
                                                    {/* Dropdown list of pick-up groups */}
                                                    {pickupGroups
                                                        //Filter the list of Pickup Groups to remove the group that the member currently belongs to
                                                        .filter(
                                                            (
                                                                group: PickupGroup
                                                            ) =>
                                                                group.id !==
                                                                member
                                                                    .memberProfile
                                                                    .pickupGroupId
                                                        )
                                                        //Display available pickup groups in dropdown
                                                        .map(
                                                            (
                                                                group: PickupGroup
                                                            ) => (
                                                                <button
                                                                    key={`groupbutton${group.id}`}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        this.props.setMemberGroup(
                                                                            member
                                                                                .userProfile
                                                                                .id,
                                                                            group.id
                                                                        );
                                                                    }}
                                                                >
                                                                    {group.name}
                                                                </button>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                ))}

                        </div>
                    </div>
                ))}
                {/* Unassigned Members */}
                {
                    <div style={{marginBottom: "100px"}}>
                        {/* Unassigned Member Header */}
                        <div className="card-header-container">
                            <div>
                                <p className="card-header-title">Unassigned</p>
                                <div className="card-header-title-underline"></div>
                            </div>
                        </div>
                        {/* Unassigned Members */}
                        <div className="card-content-container">
                            {communityMembers
                            // Filter the array of members to display only members who do not have a Pickup Group (PickupGroupId === null)
                                .filter(
                                    (member: MemberFullInfo) =>
                                        !member.memberProfile.pickupGroupId
                                )
                            //Map over the filtered member array to display details about each unassigned member
                                .map((member: MemberFullInfo) => (
                                    <div
                                        className="container"
                                        key={`userid${member.userProfile.id}`}
                                    >
                                        <div className="row">
                                            <div className="col my-auto">
                                                <p className="group-member-text">
                                                <strong>{`${member.userProfile.firstName} ${member.userProfile.lastName}`}</strong> | {`${member.memberProfile.locationAddress1}`}
                                                </p>
                                            </div>
                                            <div className="dropdown col my-1">
                                                <button className="dropbtn">
                                                    Change Group
                                                </button>
                                                <div className="dropdown-content">
                                                    {/* Dropdown list of pick-up groups */}
                                                    {pickupGroups
                                                        //Display available pickup groups in dropdown
                                                        .map(
                                                            (
                                                                group: PickupGroup
                                                            ) => (
                                                                <button
                                                                    key={`groupbutton${group.id}`}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        this.props.setMemberGroup(
                                                                            member
                                                                                .userProfile
                                                                                .id,
                                                                            group.id
                                                                        );
                                                                    }}
                                                                >
                                                                    {group.name}
                                                                </button>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                }
                    {/* Add New Group */}
                    
                    <Modal isOpen={this.state.addNewGroupModal} toggle={this.toggleAddNewGroupModal} scrollable={true}>
                    <ModalHeader toggle={this.toggleAddNewGroupModal}>Add New Pickup Group</ModalHeader>
                    <ModalBody>
                        <form className= "container add-group-modal-form" action="submit" onSubmit={(e) => {this.handleAddNewGroup(e)}}> 
                            <label htmlFor="name" >Group Name</label>
                            <input 
                                name="name"
                                type="text" 
                                value={this.state.newPickupGroup.name} 
                                onChange={e => {this.handleNewGroupOnChange(e)}} 
                            />
                            <label htmlFor="description">Description</label>
                            <input 
                                name="description"
                                type="text" 
                                value={this.state.newPickupGroup.description} 
                                onChange={e => {this.handleNewGroupOnChange(e)}} 
                            />
                            <label htmlFor="publicNotes">Notes</label>
                            <input 
                                name="publicNotes"
                                type="text" 
                                value={this.state.newPickupGroup.publicNotes} 
                                onChange={e => {this.handleNewGroupOnChange(e)}} 
                            />
                            <label htmlFor="startTime">Pickup Start Time</label>
                            <input 
                                name="startTime"
                                type="text" 
                                value={this.state.newPickupGroup.startTime} 
                                onChange={e => {this.handleNewGroupOnChange(e)}} 
                            />
                            <label htmlFor="endTime">Pickup End Time</label>
                            <input 
                                name="endTime"
                                type="text" 
                                value={this.state.newPickupGroup.endTime} 
                                onChange={e => {this.handleNewGroupOnChange(e)}} 
                            />
                            <label htmlFor="day">Pickup Day</label>
                            <select
                                name="day"
                                onChange={e => {this.handleNewGroupSelectDay(e)}} 
                            > 
                                <option value="1">Monday</option>
                                <option value="2">Tuesday</option>
                                <option value="3">Wednesday</option>
                                <option value="4">Thursday</option>
                                <option value="5">Friday</option>
                                <option value="6">Saturday</option>
                                <option value="7">Sunday</option>
                            
                            </select>
                            <button type="submit" className="link-button-small">Add New Group</button>
                        </form>
                        
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>

                {/* Delete Group Modal */}
                <Modal isOpen={this.state.deleteGroupModal} toggle={this.toggleDeleteGroupModal} scrollable={true}>
                    <ModalHeader toggle={this.toggleDeleteGroupModal}>Delete {this.state.groupToDeleteName}</ModalHeader>
                    <ModalBody>
                        <div><p>Are you should you want to delete the group "{this.state.groupToDeleteName}"? This cannot be undone, and will move all group members into un-assigned. </p></div>
                        <button className="delete-group-button" onClick={this.handleClickDeleteModal}>Delete Group</button>
                        
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </Modal>

                    
                    

            </div>
        );
    }
}

export default withRouter(ManagePickupGroups);
