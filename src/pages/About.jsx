import React from "react"
import AboutHero from "@img/about-hero.jpg"
import AboutMission from "@img/about-mission.jpg"
import AboutMissionMobile from "@img/mobile/about-mission.jpg"
import { Link } from "react-router-dom"
import { BiRocket } from "react-icons/bi"

export default function About() {
    return (
        <div className="about-page-container w-full flex flex-col items-center">
            <img src={AboutHero} className="about-hero-image w-[100vw] max-h-[45vh] min-h-[250px] object-cover" />
            <div className="about-page-content md:w-3/4 px-2">
                <h1 className="mb-7 px-2  text-center">Don’t squeeze in a sedan when you could relax in a van.</h1>
                <div className=" translate-y-5">
                    <h2 className="mb-1 flex items-center w-full justify-center">Our Mission <BiRocket className="ml-2" /></h2>
                    <hr className="h-[2px] mx-auto self-center justify-self-center bg-black mb-2 w-full lg:w-[50vw]" />
                    <div className=" mb-10">
                        <img src={AboutMissionMobile} className="max-h-[300px] px-4 mb-3 sm:hidden object-cover w-full" alt="" />
                        <div className="flex flex-col sm:flex-row w-full items-center justify-between mb-4">

                            <p className="p-2 mx-2 pr-3">At Van Life, our mission is to enliven your road trip experience by offering the ideal travel van rental. We believe that the journey is just as important as the destination, and that's why we're dedicated to providing you with exceptional van options that add comfort, convenience, and excitement to your travels.
                            </p>
                            <p className="p-2 mx-2 pr-3">
                                Our commitment to quality is unwavering. Before every trip, each van in our fleet undergoes a rigorous recertification process. This meticulous attention to detail ensures that your travel plans can go off without a hitch – and yes, we mean that literally! (Though if you do need a hitch, we can arrange that too, just let us know! 😉)
                            </p>
                        </div>
                        <img src={AboutMission} alt="" className="max-h-[40vh] hidden sm:inline-block object-cover w-full px-4" />
                    </div>
                </div>

                <p>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
            </div>
            <div className="about-page-cta w-full md:w-10/12">
                <h2>Your destination is waiting.<br />Your van is ready.</h2>
                <Link className="link-button" to="/vans">Explore our vans</Link>
            </div>
        </div>
    );
}