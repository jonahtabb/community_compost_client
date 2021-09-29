import { APIURL } from '.'
//This is an admin protected action because it allows a user's data to be changed by information in the body of the request.
export async function updateMemberPickupGroup (token: string, userId: number, groupId: number): Promise<any> {
    try {
        let reqBody = {
            addMemberToGroup: {
                groupId: groupId,
                userId: userId 
            }
        }
        let res = await fetch(`${APIURL}/member/addtogroup`, {
            method:"PUT",
            headers: new Headers ({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }),
            body: JSON.stringify(reqBody)
        })
        return await res.json()
    } catch (error) {
        return await error
    }
}