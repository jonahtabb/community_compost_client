import { Component } from "react";
import {
    BrowserRouter as Switch, Redirect, Route, RouteComponentProps, withRouter
} from "react-router-dom";
import { MemberDashboard } from ".";
import {
    getOwnMemberProfile,
    getOwnPickupGroup,
    getOwnUserData
} from "../helpers";
import { getOwnCommunityProfileForMember } from "../helpers/getOwnCommunityProfileForMember";
import { CommunityProfile, MemberProfile, PickupGroup, SetMemberProfile, SetUserProfile, User } from "../types";

type MemberHomeProps = RouteComponentProps;

type MemberHomeState = 
    { userProfile: User } & 
    { memberProfile: MemberProfile } & 
    { communityProfile: CommunityProfile} &
    { pickupGroup: PickupGroup }

class MemberHome extends Component<MemberHomeProps, MemberHomeState> {
    constructor(props: MemberHomeProps) {
        super(props);
        this.state = {
            userProfile: {
                id: null,
                email: "",
                firstName: "",
                lastName: "",
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
            },
            communityProfile: {
                communityName: "",
                communityDescription: "",
            },
            pickupGroup: {
                id: null,
                name: "",
                description: "",
                publicNotes: "",
                startTime: "",
                endTime: "",
                day: -1,
            }
        };
    }

    setMemberProfile: SetMemberProfile = (keyName, value) => {
        this.setState((prevState) => ({
            ...prevState,
            memberProfile: {
                ...prevState.memberProfile,
                [keyName]: value
            }
        }))
    }

    setUserProfile: SetUserProfile = (keyName, value) => {
        this.setState((prevState) => ({
            ...prevState,
            userProfile: {
                ...prevState.userProfile,
                [keyName]: value
            }
        }))
    }


    updateState = async (): Promise<any> => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                //Get own user data
                const userResponse = await getOwnUserData(token);
                const { id, email, first_name, last_name } =
                    userResponse.userData;

                // Get own member profile data
                const memberResponse = await getOwnMemberProfile(token);
                const {
                    email_secondary,
                    phone_primary,
                    phone_primary_type,
                    phone_secondary,
                    phone_secondary_type,
                    bio,
                    location_name,
                    location_address1,
                    location_address2,
                    location_city,
                    location_zip,
                    location_state,
                    location_notes,
                    PickupGroupId,
                } = memberResponse.memberProfile;

                //Get own community profile data
                const communityResponse = await getOwnCommunityProfileForMember(
                    token
                );
                const { name, description } = await communityResponse.communityProfile;
                
                //Add Data to State
                this.setState({
                    userProfile: {
                        id: id,
                        email: email,
                        firstName: first_name,
                        lastName: last_name,
                    },
                    memberProfile: {
                        secondaryEmail: email_secondary,
                        primaryPhone: phone_primary,
                        primaryPhoneType: phone_primary_type,
                        secondaryPhone: phone_secondary,
                        secondaryPhoneType: phone_secondary_type,
                        bio: bio,
                        locationName: location_name,
                        locationAddress1: location_address1,
                        locationAddress2: location_address2,
                        locationCity: location_city,
                        locationZip: location_zip,
                        locationState: location_state,
                        locationNotes: location_notes,
                        pickupGroupId: PickupGroupId,
                    },
                    communityProfile: {
                        communityName: name,
                        communityDescription: description,
                    }
                });

                // Get own pickup group data, if pickup group is not null
                
                if (PickupGroupId) {
                    const pickupGroupResponse = await getOwnPickupGroup(token);
                    
                    const {
                        id: gId,
                        name: gName,
                        description: gDesc,
                        public_notes: gNotes,
                        start_time: gStart,
                        end_time: gEnd,
                        day: gDay} = await pickupGroupResponse.pickupGroup

                    this.setState({            
                        pickupGroup:{
                            id: gId,
                            name: gName,
                            description: gDesc,
                            publicNotes: gNotes,
                            startTime: gStart,
                            endTime: gEnd,
                            day: gDay,
                    }
                    })
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        this.updateState();
    }


    render() {
        return (
                <Switch>
                    <Redirect to={`${this.props.match.path}/dashboard`} />
                    <Route exact path={`${this.props.match.path}/dashboard`}>
                        <MemberDashboard
                            userProfile={this.state.userProfile}
                            setUserProfile={this.setUserProfile}
                            memberProfile={this.state.memberProfile}
                            communityProfile={this.state.communityProfile}
                            setMemberProfile={this.setMemberProfile}
                            pickupGroup={this.state.pickupGroup}
                        />
                    </Route>
                </Switch>
        );
    }
}

export default withRouter(MemberHome);
