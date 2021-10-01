import { APIURL } from ".";

export async function loginUser (email: string, password: string): Promise<any> {
    try {
        let res = await fetch(`${APIURL}/user/login`, {
            method: "POST",
            body: JSON.stringify({
                user: {
                    email,
                    password
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        return await res
    } catch (error){
        return await error
    }
}