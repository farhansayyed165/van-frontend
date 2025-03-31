import React, { useEffect } from 'react'
import { useLocation, Navigate, useNavigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { checkToken, refreshToken } from '../api'


function RequireAuth() {
  const { auth, setAuth } = useAuth()
  return (
    auth.userid ? <Outlet context={auth} /> : <Navigate to="/login" state={{ from: location, message: "You must login first" }} replace />
    )
}

export default RequireAuth


//   useEffect(()=>{
//     async function verify() {
//     try {
//       console.log(auth)
//       const check = await checkToken(auth.accessToken)
//       console.log(check)
//     } catch (error) {
//       console.log(error.error);
//       try {
//         const refresh = await refreshToken()
//         console.log(refresh)
//         setAuth(prev => {
//           return { ...prev, accessToken: refresh.accessToken }
//         })

//       } catch (error) {
//         console.log(error)
//         const navigate = useNavigate()
//         navigate("/login", { state: { from: location, message: "You must login first" } })
//       }
//     }
//   }
//   verify()
// }, [])