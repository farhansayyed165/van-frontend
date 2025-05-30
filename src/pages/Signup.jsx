import React from 'react'
import { useState } from 'react'
import EditAvatar from '../components/user/EditAvatar.jsx';
import { createUser } from "../api"
import {useNavigate, useLocation} from "react-router-dom"


function Signup() {
    const location = useLocation();
    const [data, setData] = useState({})
    const [avatar, setAvatar] = useState()
    const [error, setError] = useState() 
    const [buttonState, setButtonState] = useState("Signup")
    const navigate = useNavigate()


  // const state = location.state?.from?.pathname ?
    const state = location.state.from ?  {message:"Login with your email and password", from:{pathname:location.state.from.pathname}} : {message:"Login with your email and password"}


    function handleChange(e) {
        const { name, value } = e.target;
        setData(prev => ({
          ...prev,
          [name]: value
        }))
    }
    async function handleSubmit(e) {

        let img;
        e.preventDefault();
        setButtonState("Submitting");
        setTimeout(()=>{
        },3000)
        if(!avatar){
          setAvatar("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png")
        }else{
          const data = new FormData();
          data.append("file",avatar);
          data.append("upload_preset","o1hlhhqo");
          data.append("cloud_name", "drqdgsnat");

          const res = await fetch("https://api.cloudinary.com/v1_1/drqdgsnat/image/upload", {
            method:"POST",
            body:data
          })

          const uploaded = await res.json();
          img = uploaded.url;        }

        const form = new FormData()
        if(img){
          form.append("image", img)
        }else{
          form.append("image", avatar)
        }
        form.append("email", data.email)
        form.append("name", data.name)
        form.append("password", data.password)
        form.append("about", data.about)
        form.append("gender", data.gender)
        form.append("role", data.role)

        try{
          const response = await createUser(form)
          if(response.error){
            setButtonState("Signup")
            setError(response.message)
            return
          }
          // setButtonState(1)
          navigate("/login", {state:state})
        }
        catch(err){
        }
    }

    return (
      <>
        <main className='flex flex-col items-center'>
          <h3 className=' text-xl'>Signup for VANLIFE</h3>
          <form className='signup-form' onSubmit={handleSubmit}>
          <h3 className='text-lg text-red-500'>{error}</h3>
            <div className='relative my-3 flex flex-col items-center'>
              <EditAvatar avatar={avatar} setAvatar={setAvatar} />
              <p className='mt-1'>Click on above image to change/upload your profile image</p>
            </div>
            <input
              className='signup-element'
              type="email"
              name="email"
              placeholder='Email'
              onChange={handleChange}
              value={data.email}
              required />

            <input
              className='signup-element'
              type="name"
              name="name"
              placeholder='Name'
              onChange={handleChange}
              value={data.name}
              required />

            <input
              className='signup-element'
              type="password"
              name="password"
              placeholder='Password'
              onChange={handleChange}
              value={data.password}
              required />

            <textarea
              className='signup-element'
              type="text"
              name="about"
              placeholder='About'
              onChange={handleChange}
              value={data.about}
              rows={4}
            />
            <div className='w-[40%] flex-col flex signup-select '>
              <label htmlFor="gender">Gender:</label>
              <select
                name="gender" id='gender'
                value={data.gender}
                onChange={handleChange}
                className='w-9/10 p-2 bg-white border-2 rounded border-[#9c9c9c] mb-2'
              >
                <option value="">Please select one…</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-Binary</option>
                <option value="other">Other</option>
                <option value="prefer not to answer">Perfer not to Answer</option>
              </select>

              <label htmlFor="role">Role:</label>
              <select
                name="role" id='role'
                value={data.role}
                onChange={handleChange}
                className='w-9/10 p-2 bg-white border-2 rounded border-[#9c9c9c] mb-2'
                required
              >
                <option value="">Please select one…</option>
                <option value="user">Be a Customer</option>
                <option value="host">Be a Host</option>
              </select>
            </div>
            <button
                      className={`p-2 rounded signup-element text-white font-semibold text-lg ${buttonState == "Submitting" ? " bg-button-grey" : " bg-button-orange"}`}
                  >
                      {buttonState == "Submitting" ? "Submitting..." : buttonState}
                  </button>
            {/* <button type="submit" disabled={buttonState} className='p-2 bg-button-orange rounded signup-element text-white font-semibold text-lg'>{buttonState ? "Submit" : "Submitting..." }</button> */}
          </form>
        </main>
      </>
    )
  }

  export default Signup