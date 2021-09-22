//Types that originate in App.tsx
export type SessionToken = string | null
export type SetSessionToken = (value: string) => void

export type IsAdmin = boolean | null
export type SetIsAdmin = (value: boolean) => void

export type RegComplete = boolean
export type SetRegComplete = (value: boolean) => void

//Types that originate in Auth.tsx
export type User = {
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
    locationNotes: string
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
export type MemberProfileSummary = {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    phonePrimary: string;
    locationAddress1: string;
    locationAddress2: string;
    locationCity: string;
    locationName: string;
}
export type CommunityMembers = MemberProfileSummary[]

export type PickupGroup = {
    id: number;
    name: string; 
    description: string;
    publicNotes: string;
    startTime: string;
    endTime: string;
    day: number;
}

export type PickupGroups = PickupGroup[]