import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { loginUser } from '../api'
// import { AuthContext } from '../context/AuthProvider'
import useAuth from '../hooks/useAuth';


function Login() {
    const { auth, setAuth } = useAuth();
    const location = useLocation();

    const navigate = useNavigate();
    const [buttonState, setButtonState] = useState("Login")
    const message = location.state?.message
    const [errorMessage, setErrorMessage] = useState();
    const [formData, setFormData] = useState({ email: "", password: "" });
    async function handleSubmit(e) {
        e.preventDefault()
        setButtonState("Submitting")

        loginUser(formData)
            .then(res => {
                if(res.error){
                    setButtonState("Login")
                    setErrorMessage(res.message)
                    return
                }
                setAuth({ user: res.name, accessToken: res.accessToken, userid:res.userid, email:res.email })
                if (location.state?.from?.pathname) {
                    navigate(location.state.from.pathname)
                }
                else {
                    navigate("/")
                }
            })
            .catch(error => {
            console.log(error)
            })

    }

    const state = location.state?.from?.pathname ? {from:{pathname:location.state.from.pathname}} : {}

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }
    return (
        <div className="login-container mt-10 ">
            <h1>Sign in to your account</h1>
           

            {location?.state?.message && <h3 className="text-green-800 ">{location?.state?.message}</h3>}
            <h3 className="red mb-2 mt-2" style={{fontWeight:"600"}}>{errorMessage}</h3>

            <form onSubmit={handleSubmit} className="login-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button
                    className={buttonState}
                >
                    {buttonState == "Submitting" ? "Submitting..." : (buttonState == "Error" ? "Try Again" : buttonState)}
                </button>
            <h3 className=' font-normal flex mx-2 mt-4 text-left '>
                <span className='self-start mr-4'>Don't have an account ? </span>
                
                <Link to="/signup" className=' text-blue-600 hover:font-semibold transition-all duration-150 underline' state={state}>Singin</Link>
            </h3>
            </form>
        </div>
    )
}

export default Login