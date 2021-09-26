import { APIURL } from ".";
import { MemberProfile, User } from "../types";

export async function updateOwnUserProfile(
    token: string,
    userProfile: User
): Promise<any> {
    try {
        let res = await fetch(`${APIURL}/user/update`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify({
                user: {
                    email: userProfile.email, 
                    first_name: userProfile.firstName, 
                    last_name: userProfile.lastName
                },
            }),
        });
        return await res.json();
    } catch (error) {
        return await error;
    }
}
