import React from 'react'
import { Link } from 'react-router-dom'
import {BsStarFill }from 'react-icons/bs' 
import useLogout from '../../hooks/useLogout'

function DashboardUser({ data }) {
    const logout = useLogout();
    return (
        <>
            <button onClick={logout} style={{backgroundColor:"#E74C3C"}} className='link-button m-4'>Logout</button>
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome {data?.name}!</h1>
                    {/* <p>Income last <span>30 days</span></p> */}
                    <h2>${data?.income ? data.income : 0}</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
        </>
    )
}

export default DashboardUser