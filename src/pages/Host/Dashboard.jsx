import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import useGetHostVans from "../../hooks/useGetHostVans"
import DashboardUser from "./DashboardUser"

export async function loader(obj) {
    return "yes"
}

export default function Dashboard() {
    const [data, setData] = useState([])
    const [userData, setUserData] = useState()
    const fetchData = useGetHostVans(setData,0)
    const fetchUser = useGetHostVans(setUserData,1)
    
    useState(()=>{
        let isMounted = true
        isMounted && fetchData()
        isMounted && fetchUser()
        return()=>{
            isMounted = false
        }
    })

    const hostVansEls = data.map((van) => {
        // console.log("van", van)
        return (
            <Link to={`vans/${van.vanid}`} key={van.vanid}>
                <div className="host-van-single" >
                    <img src={van.image} alt={`Photo of ${van.name}`} />
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                </div>
            </Link>
        )
    })




    return (
        <>
            {userData && <DashboardUser data={userData}></DashboardUser>}
            <button type="button" className="link-button">Host a van</button>
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="vans">View all</Link>
                </div>

                    <div className="host-vans-list">
                        <section>{data ? hostVansEls:<p>Loading...</p>}</section>
                    </div>


            </section>
        </>
    )
}
