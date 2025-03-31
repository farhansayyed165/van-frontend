import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {refreshToken} from "../api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { controllers } from "chart.js";

function  PersistentLogin(){
    const [isLoading, setIsLoading] = useState(true);
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate()
    useEffect(()=>{
        let isMounted = true
        const verifyRefresh = async ()=>{
            try {
                const res = await refreshToken()
                if(res.error){
                    if(res.error == 'no cookies available'){
                        console.log("found you!")
                        navigate("/login", {state:{message:"You must login first"}})
                        isMounted && setIsLoading(false)    
                    }
                    else{
                        navigate("/")
                    }
                }
                setAuth({user: res.user, accessToken: res.accessToken, userid:res.userid, email:res.email})
            } catch (error) {
                isMounted && setIsLoading(false)
            }
            finally{
                isMounted && setIsLoading(false)
            }
        }
        !auth?.accessToken ? verifyRefresh() : setIsLoading(false)
        return ()=>{
            isMounted = false;
        }
    })
    // useEffect(()=>{
    //     console.log("isLoading", isLoading)
    //     console.log("auth", auth)
    // },[isLoading])
    // console.log("persist auth", auth)
    return(
        <>
            {isLoading ? <p>Loading...</p>: <Outlet/>}
        </>
    )
}

export default PersistentLogin