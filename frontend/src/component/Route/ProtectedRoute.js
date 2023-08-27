import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
const ProtectedRoute = ({children}) => {

const {loading,isAuthenticated,user}=useSelector((state)=>state.user);




return (


(!loading&&isAuthenticated)?children:<Navigate to="/login"/>





)

    


  
}

export default ProtectedRoute
