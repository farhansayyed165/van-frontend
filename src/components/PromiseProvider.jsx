import React from 'react'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getHostVans } from '../api'

function PromiseProvider() {
    // const { auth } = useAuth()
    // const [promise, setPromise] = useState({})
    // useEffect(()=>{
    //     let isMounted = true
    //     const getVans = ()=>{return getHostVans(auth.userid, auth.accessToken)}
    //     setPromise(prev=>{return{...prev, Dashboard:getVans}})
    // },[])
  return (
    <Outlet />
  )
}

export default PromiseProvider