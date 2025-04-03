import React, { useState } from "react"
import NavElements from "./NavElements"
import { Link, NavLink } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import { CiUser, CiHome  } from "react-icons/ci";
import { PiVan } from "react-icons/pi";
import { BsDoorOpenFill } from "react-icons/bs";

export default function Header() {

    const [menu, setMenu] = useState(false)
    const [iconFocus, setIconFocus] = useState("")
    const {auth} = useAuth();
    function toggleMenu(e) {
        e.preventDefault()
        setMenu(!menu)
    }

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "black",
        stroke: "black", 
        // strokeWidth: "5"
    }

    return (
        <header className="flex w-full px-3 z-50 sticky top-0 bg-body-bg shadow-md border-b-[1px] border-black">
            <Link className=" flex justify-center site-logo z-50" to="/">VanLife</Link>
            <Link className="sm:hidden flex justify-end z-50" to="/about">About</Link>

            <nav className=" hidden sm:flex items-center z-50 -translate-x-5">
                <NavElements></NavElements>
            </nav>

            
            <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white shadow-lg border-t-2 border-[#161616]  flex justify-around py-3">
                <NavLink 
                to="/" 
                className="flex flex-col items-center text-gray-700 hover:text-black"
                style={({ isActive }) => isActive ? activeStyles : null}>
                    <CiHome size={24} strokeWidth="1"/>
                    <span className="text-sm">Home</span>
                </NavLink>
                <NavLink to="/vans" className="flex flex-col items-center text-gray-700 hover:text-black" style={({ isActive }) => isActive ? activeStyles : null}>
                    <PiVan size={28} strokeWidth={1}/>
                    <span className="text-sm">Vans</span>
                </NavLink>
                {auth?.accessToken && <NavLink to="/host" className="flex flex-col items-center text-gray-700 hover:text-black" style={({ isActive }) => isActive ? activeStyles : null}>
                    <CiUser size={24} strokeWidth={"1"}/>
                    <span className="text-sm">Profile</span>
                </NavLink>}
                {!auth?.accessToken && 
                    <NavLink to="/login" className="flex flex-col items-center text-gray-700 hover:text-black" style={({ isActive }) => isActive ? activeStyles : null}>
                    <BsDoorOpenFill size={24}  />
                    <span className="text-sm">Signin</span>
                </NavLink>
                }
            </div>

        </header>
    )
}