import { APIURL } from ".";
import { MemberProfile } from "../types";

export async function updateOwnMemberProfile(
    token: string,
    memberProfile: MemberProfile
): Promise<any> {
    try {
        let res = await fetch(`${APIURL}/member/me/update`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify({
                member: {
                    email_secondary: memberProfile.secondaryEmail,
                    phone_primary: memberProfile.primaryPhone,
                    phone_primary_type: memberProfile.primaryPhoneType,
                    phone_secondary: memberProfile.secondaryPhone,
                    phone_secondary_type: memberProfile.secondaryPhoneType,
                    bio: memberProfile.bio,
                    location_name: memberProfile.locationName,
                    location_address1: memberProfile.locationAddress1,
                    location_address2: memberProfile.locationAddress2,
                    location_city: memberProfile.locationCity,
                    location_zip: memberProfile.locationZip,
                    location_state: memberProfile.locationState,
                    location_notes: memberProfile.locationNotes,
                },
            }),
        });
        return await res.json();
    } catch (error) {
        return await error;
    }
}
