import useAuth from './useAuth'
import { BaseUrl } from '../constants'
import { useNavigate } from 'react-router-dom'

function useLogout() {
    const {auth,setAuth} = useAuth()
    const navigate = useNavigate()
    async function Logout(){
        const response = await fetch(`${BaseUrl}/api/logoutUser`,{
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })
        const parsedResponse = await response.json()
        if(parsedResponse.error){
            console.log(parsedResponse.error)
            return null
        }
        console.log(parsedResponse.message)
        
        setAuth({})
        navigate("/")
    }
  return Logout
}

export default useLogout