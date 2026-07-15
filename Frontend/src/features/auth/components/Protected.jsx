import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import React from 'react'
import Navbar from '../../../components/Navbar.jsx'
import LoadingScreen from '../../../components/LoadingScreen.jsx'

const Protected = ({children}) => {
    const { loading,user } = useAuth()


    if(loading){
    return <LoadingScreen />
}

    if(!user){
        return <Navigate to={'/login'} />
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Protected
