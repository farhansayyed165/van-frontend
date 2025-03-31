import React from "react"
import { useEffect, useState } from "react"
import { Link, useLoaderData, } from "react-router-dom"
import { getHostVans } from "../../api"
import useGetHostVans from "../../hooks/useGetHostVans"

export async function loader({ request }) {
    // await requireAuth(request)
    // return defer({ vans: getHostVans() })
    return " "
}

export default function HostVans() {
    const [data, setData] = useState([])
    const fetchData = useGetHostVans(setData, 0)
    useEffect(() => {
        let isMounted = true
        fetchData()
        return () => {
            isMounted = false
        }
    }, [])


    const hostVansEls = data.map(van => (
        <Link
            to={`${van.vanid}`}
            key={van.vanid}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={van.vanid}>
                <img src={van.image} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))



    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <React.Suspense fallback={<p>Loading...</p>}>
            <div className="host-vans-list">
                <section>
                    {hostVansEls}
                </section>
            </div>
            </React.Suspense>
        </section>
    )
}