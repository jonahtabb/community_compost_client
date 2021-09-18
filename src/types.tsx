//Types that originate in App.tsx
export type SessionToken = string | null
export type SetSessionToken = (value: string) => void

export type IsAdmin = boolean | null
export type SetIsAdmin = (value: boolean) => void

export type RegComplete = boolean
export type SetRegComplete = (value: boolean) => void

//Types that originate in Auth.tsx
export type User = {
        email: string | null;
        firstName: string | null;
        lastName: string | null;
};

//Types that originate in Register.tsx
export type RegisterState = {
    registrationStep: number
}

//Types that originate in RegisterUser.tsx
export type RegisterUserForm ={
    firstName: string;
    lastName: string;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
}

//Types that originate in RegisterAdmin.tsx
export type AdminProfile = {
        secondary_email: string | null;
        phone: string | null;
        phone_type: string | null;
        bio: string | null;
};