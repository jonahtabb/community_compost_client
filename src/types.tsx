//Types that originate in App.tsx
export type SessionToken = string | null
export type SetSessionToken = (value: string | null) => void

export type IsAdmin = boolean | null
export type SetIsAdmin = (value: boolean) => void

export type RegComplete = boolean
export type SetRegComplete = (value: boolean) => void

//Types that originate in Auth.tsx
export type User = {
        id: number | null;
        email: string;
        firstName: string;
        lastName: string;
};

export type SetUser = (email: string, firstName: string, lastName: string) => void

// Types that originate in Register.tsx
export type SetRegStep = () => void

//Types that originate in RegisterUser.tsx
export type RegisterUserForm ={
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    emailNotAvail: boolean;
}

//Types that originate in RegisterAdmin.tsx
export type AdminProfile = {
        secondaryEmail: string;
        phone: string;
        phoneType: string;
        bio: string;
};

export type CommunityProfile = {
    communityName: string;
    communityDescription: string;
}

//Types that originate in RegisterMember.tsx
export type MemberProfile = {
    secondaryEmail: string,
    primaryPhone: string,
    primaryPhoneType: string,
    secondaryPhone: string,
    secondaryPhoneType: string,
    bio: string,
    locationName: string,
    locationAddress1: string,
    locationAddress2: string,
    locationCity: string,
    locationZip: string,
    locationState: string,
    locationNotes: string,
    pickupGroupId: number | null
}

export type CommunityProfileSelect = {
    id: number;
    name: string;
    description: string;
}

export type chooseCommunity = {
    selectedCommunityId: number;
    availableCommunities: CommunityProfileSelect[]
}

//Types that originate in Login Component
export type LoginUser = {
    email: string;
    password: string
}

//Types that originate in Admin Home
export type MemberFullInfo = {
    userProfile: User;
    memberProfile: MemberProfile 

}

export type CommunityMembers = MemberFullInfo[]

export type PickupGroup = {
    id: number | null;
    name: string; 
    description: string;
    publicNotes: string;
    startTime: string;
    endTime: string;
    day: number;
}

export type PickupGroups = PickupGroup[]

export type SetMemberGroup = (userId: number | null, groupId: number | null) => void

//Types that originate in Member Home

export type SetMemberProfile = (keyName: MemberProfileOptions, value: string | number)  => void

export type SetUserProfile = (keyName: UserProfileOptions, value: string | number ) => void

//These are used for dynamic mapping in the MemberDashboard

export type MemberProfileOptions = 
    "secondaryEmail" |
    "primaryPhone" |
    "primaryPhoneType" |
    "secondaryPhone" |
    "secondaryPhoneType" |
    "bio" |
    "locationName" |
    "locationAddress1" |
    "locationAddress2" |
    "locationCity" |
    "locationZip" |
    "locationState" |
    "locationNotes" |
    "pickupGroupId";

export type UserProfileOptions =
        "id" |
        "email" |
        "firstName" |
        "lastName";