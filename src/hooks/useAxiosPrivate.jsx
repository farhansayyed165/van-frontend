import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'

export const axiosPrivate = axios.create({
    baseURL:"http://localhost:3000",
    headers:{"Content-Type":"application/json"},
    withCredentials:true
})

function useAxiosPrivate() {
    const refresh = useRefreshToken()
    const { auth } = useAuth()
    useEffect(()=>{
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            config=>{
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            },
            (error)=>Promise.reject(error)
        )
        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response=>response,
            async(error)=>{
                const prevReq = error?.config
                if((error?.response?.status == 403 || error?.response?.status == 401 || error?.response?.status == 400) && prevReq?.sent){
                    prevReq.sent = true;
                    const newAccessToken = await refresh()
                    prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevReq)
                }
                return Promise.reject(error)
            }
        )
        return()=>{
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }    
    },[auth,refresh])
  return axiosPrivate
}

export default useAxiosPrivate