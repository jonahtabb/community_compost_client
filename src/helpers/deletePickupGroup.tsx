import {APIURL} from ".";
export async function deletePickupGroup (token: string, groupId: number): Promise<any> {
    try {
        let res = await fetch(`${APIURL}/group/delete/${groupId}`, {
            method: "DELETE",
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