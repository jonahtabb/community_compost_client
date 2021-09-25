import { APIURL } from "."

export async function getOwnMemberProfile (token: string): Promise<any> {
    let functionReturn
    try {
        let res = await fetch(`${APIURL}/member/me`, {
            method: "GET",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            })
        })
        functionReturn = await res.json()

    }catch (error) {
        functionReturn = await error
    }

    return functionReturn
}