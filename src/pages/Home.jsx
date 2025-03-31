import React from "react"
import { Link } from "react-router-dom"
// images 
import HomeCamp1 from "../assets/images/home-camp-1.jpg"
import HomeCamp1Mobile from "../assets/images/mobile/home-camp-1-mobile.jpg"
import HomeCamp2 from "../assets/images/home-camp-2.jpg"
import HomeCamp2Mobile from "../assets/images/mobile/home-camp-2-mobile.jpg"

export default function Home() {
    return (
        <main className="w-full mb-5 flex flex-col items-center">
            <div className="home-container-div min-h-[40vh]  w-full bg-cover relative shadow-md flex flex-col justify-center" >
                <h1 className=" text-white  text-clampHome  w-full text-center font-bold p-2 " >You got the travel plans, we got the travel vans.</h1>
                <p className="text-white text-center w-full pt-5 drop-shadow-2xl sm:inline-block hidden">Add adventure to your life by joining the vanlife.<br /> Rent the perfect van to make your perfect road trip.</p>
                <div className="w-full absolute bottom-0 text-white flex justify-center ">
                    <Link to="vans" className="  translate-y-4 p-2 rounded-md shadow-lg hover:translate-y-2 transition-all ease-in-out duration-300 bg-button-orange min-w-[250px] text-lg text-center font-bold">Find your van</Link>
                </div>
            </div>
            <section className="sm:w-3/4 w-[90%] translate-y-[3.6rem]">
                <div className="flex flex-col md:flex-row justify-evenly  ">
                    <img src={HomeCamp1} className="w-1/2 md:inline-block hidden object-cover min-h-[60vh]" alt="" />
                    <img src={HomeCamp1Mobile} className="w-full md:hidden px-5 mb-5 object-cover min-h-[50vh] rounded-lg" alt="" />
                    <div className="flex items-center">
                        <p className="md:w-1/2 w-full leading-10 m-auto text-center font-medium text-clamph1 px-4">We're more than just a van rental platform, we're your gateway to the extraordinary. </p>
                    </div>
                </div>
                <div className="w-full py-10">
                    <hr className="my-2 py-[1px] border-0 divide-y-0 w-1/3 mx-auto bg-button-orange"/>
                    <h2 className="text-center text-2xl font-bold font-Karla">OR</h2>
                    <hr className="my-2 py-[1px] border-0 divide-y-0 w-1/3 mx-auto bg-button-orange"/>
                </div>
                <div className="flex flex-col md:flex-row justify-evenly">
                    <img src={HomeCamp2Mobile} className="w-full md:hidden px-5 mb-5 object-cover min-h-[50vh]" alt="" />
                    <div className="flex items-center">
                        <p className="md:w-1/2 w-full leading-10 m-auto text-center font-medium text-clamph1 px-4">Empower Your Van Life: Host Your Van, Share the Adventure! </p>
                    </div>
                    <img src={HomeCamp2} className="w-1/2 md:inline-block hidden object-cover min-h-[50vh]" alt="" />
                </div>
            </section>
        </main>
    )
};