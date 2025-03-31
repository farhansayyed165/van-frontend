import React from 'react'
import { createContext, useState } from "react";


export const AuthContext = createContext({});

function AuthProvider({children}) {
    const [auth, setAuth] = useState({})
    // console.log(auth)
  return (
    <AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider