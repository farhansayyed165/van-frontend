import { BaseUrl } from "./constants"
import axios from "axios"

// const BASEURL = "http://localhost:3000"
const BASEURL = "https://van-api.onrender.com"

export async function checkToken(token){
    const url = `${BASEURL}/checkToken`
    const res = await fetch(url, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            'Authorization': `Bearer ${token}`
        },
        credentials:"include",

    })
    return res.json()
}

export async function getUser(column, value){
    const url = `${BaseUrl}/api/getUser`
    const body = {column, value}
    const response = await axios.post(url,body, {
        headers:{'Content-Type':'application/json'}
    })
    // console.log(response)
    return response
}

export async function refreshToken(){
    const response = await fetch(`${BaseUrl}/api/refresh`, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
        credentials:"include",
      })
    return response.json()
}

export async function getVans(id) {
    console.log("ID: ", id);
    const url = id ? `${BaseUrl}/api/vans?id=${id}` : `${BaseUrl}/api/vans`
    const res = await fetch(url)
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(`${BaseUrl}${url}`)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }
export async function getHostVans(userId, vanid) {
    const url = `/api/getHostVans/`
    const body = vanid ? {userId, vanid}:{userId}
    const response = await axios.post(`${BaseUrl}${url}`,body, {
        headers: { "Content-Type": "application/json", 'Authorization':`Bearer ` },
        withCredentials:true
    })
    // console.log(response.data)
    return response
}




export async function loginUser(data) {
    try {
        const response = await axios.post(`${BASEURL}/api/loginUser`, data, {
            headers: { "Content-Type": "application/json" },
            withCredentials:true,
        })
        return response.data;
    } catch (error) {
        const err = {message:error.response.data?.error, error:true}
        // console.log(error.response.data.error)
        return err
    }

}

export async function logoutUser() {


}


export async function createUser(formData) {
    try {
        const response = await axios.post(`${BASEURL}/api/createUser`, formData, {
            headers: { "Content-Type": "multipart/form-data" },  
        })
        return response.data;
    } catch (error) {
        const err = {message:error.response.data?.error, error:true}
        // console.log(error.response.data.error)
        return err
    }

}