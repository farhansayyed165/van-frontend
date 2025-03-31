import React, {useEffect} from 'react'
import { useLocation,Navigate,useNavigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { checkToken, refreshToken } from '../api'


function RefreshToken() {
    const {auth, setAuth} = useAuth()
    const location = useLocation()
    useEffect(async ()=>{
        try {
            console.log(auth)
            const check = await checkToken(auth.accessToken)
            console.log(check)
        } catch (error) {
            console.log(error.error);
            try {
                const refresh = await refreshToken()
                console.log(refresh)
                setAuth(prev=>{
                    return{...prev, accessToken:refresh.accessToken}
                })
                
            } catch (error) {
                console.log(error)
                const navigate = useNavigate()
                navigate("/login", {state:{from:location, message:"You must login first"}})
            }
        }
    },[])
  return (
    auth.user ? <Outlet/>: <Navigate to="/login" state={{from:location, message:"You must login first"}} replace/>
  )
}

export default RefreshToken