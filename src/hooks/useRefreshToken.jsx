import React from 'react'
import useAuth from './useAuth'
import axios from 'axios'
import { BaseUrl } from '../constants';


function useRefreshToken() {
    const {auth,setAuth} = useAuth();
    async function refresh(){
      try{
        const check = await axios.get(`${BaseUrl}/checkToken`,{
          headers:{'Content-Type':'application/json','Authorization':`Bearer ${auth.accessToken}`},
          withCredentials:true
        })
      }
      catch(err){
        try {
          const response = await axios.get(`${BaseUrl}/api/refresh`, {
            withCredentials:true
          })
          
          setAuth(prev=>{
            // console.log(prev)
            console.log(response.data.accessToken)
            return {...prev, accessToken:response.data.accessToken, userid:response.data.userid}
          })
        } catch (error) {
          // if(error.response.statusCode == 401)
          setAuth({})
        }
      }
    }
  return refresh
}

export default useRefreshToken