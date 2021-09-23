import { APIURL } from ".";

export async function getAllMembersOfPickupGroup (token: string, groupId: number): Promise<any> {
    try {
        let res = await fetch(`${APIURL}/member/group/${groupId}`, {
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