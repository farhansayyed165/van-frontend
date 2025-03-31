import React, { useEffect, useState } from "react"
import { useParams, Link, NavLink, Outlet, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"
import useAuth from "../../hooks/useAuth"

export async function loader({ params, request }) {
    // await requireAuth(request)
    return "yes"
}

export default function HostVanDetail() {
    const params = useParams()
    const {auth} = useAuth()
    const [currentVan, setCurrentVan] = useState()
    useEffect(()=>{
        async function getData(){
            const data = await getHostVans(auth.userid, params.id) 
            console.log(data.data)
            setCurrentVan(data.data.vans[0])
        } 
        getData()
    },[])
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <section className="w-full">
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>

            <div className="host-van-detail-layout-container">

                {currentVan && <div className=" flex flex-col sm:flex-row">
                    <img src={currentVan.image} className="w-full max-h-[70vh] object-cover sm:w-[160px] mr-5 mb-5"/>
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${currentVan.type}`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                </div>}

                <nav className="host-van-detail-nav">
                    <NavLink
                        to="."
                        end
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Details
                    </NavLink>
                    <NavLink
                        to="pricing"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Pricing
                    </NavLink>
                    <NavLink
                        to="photos"
                        style={({ isActive }) => isActive ? activeStyles : null}
                    >
                        Photos
                    </NavLink>
                </nav>
                {currentVan && <Outlet context={{ currentVan }} />}
            </div>
        </section>
    )
}
