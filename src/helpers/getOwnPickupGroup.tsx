import { APIURL } from ".";

export async function getOwnPickupGroup (token: string): Promise<any> {
    try {
        let res = await fetch(`${APIURL}/group/my`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            })
        })
        return await res.json()
    } catch (error){
        return await error
    }
}