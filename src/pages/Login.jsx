import React, { useState } from "react"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData
} from "react-router-dom"
import { useCookies } from 'react-cookie';
import { UserContext } from "../main";
import { useContext } from "react";
import { loginUser } from "../api"

// export function loader({ request }) {
//     return new URL(request.url).searchParams.get("message")
// }

export async function action({ request }) {
    // const formData = await request.formData()
    // const email = formData.get("email")
    // const password = formData.get("password")
    // const pathname = new URL(request.url)
    //     .searchParams.get("redirectTo") || "/host"

    // try {
    //     const data = await loginUser({ email, password })
    //     localStorage.setItem("loggedin", true)
    //     return redirect(pathname)
    // } catch(err) {
    //     return err.message
    // }
}

export default function Login() {
    const [errorMessage, setErrorMessage] = useState()
    const navigation = useNavigation()
    const [formData, setFormData] = useState({email:"",password:""})
    async function handleSubmit(e) {
        e.preventDefault()
        if(!formData.email || !formData.password){
            setErrorMessage("Email and Password are required")
            return
        }
        const res = await loginUser(formData)
        console.log(res)
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

    }

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {/* {message && <h3 className="red">{message}</h3>} */}
            {errorMessage && <h3 className="red">{errorMessage}</h3>}

            <Form
                method="post"
                className="login-form"
                onSubmit={handleSubmit}
                
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <button
                    disabled={navigation.state === "submitting"}
                >
                    {navigation.state === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
    )
}
