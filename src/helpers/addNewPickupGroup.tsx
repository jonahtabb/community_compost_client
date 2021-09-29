import { APIURL } from ".";
import { NewPickupGroup } from "../types";

export async function addNewPickupGroup (token:string, newPickupGroup: NewPickupGroup): Promise<any>{
    try {
        const {name, description, publicNotes, startTime, endTime, day} = newPickupGroup
        const requestBody = {
            pickupGroup: {
            name: name,
            description: description,
            public_notes: publicNotes,
            start_time: startTime,
            end_time: endTime,
            day: day
            }
        }
        let res = await fetch(`${APIURL}/group/create`, {
            method: "POST",
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
            body: JSON.stringify(requestBody)
        })
        return await res.json()
    } catch(error) {
        return await error
    }
}