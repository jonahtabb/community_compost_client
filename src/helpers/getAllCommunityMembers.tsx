import { APIURL } from ".";

export async function getAllCommunityMembers (token: string): Promise<any> {
    try {
        let res = await fetch(`${APIURL}/member/all`, {
            method: "GET",
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            })
        })
        return await res.json()
    } catch (error) {
        return await error
    }
}