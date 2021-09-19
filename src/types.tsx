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
        communityName: string;
        communityDescription: string;
};