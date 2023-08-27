import React, { Fragment } from 'react'
import  { useEffect} from 'react'
import Loader from '../../Loader/loader';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./ForgotPassword.css"

import { useDispatch,useSelector } from 'react-redux';
import { clearErrors,forgotPassword} from '../../actions/userActions';
import {useAlert} from "react-alert"
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import  MetaData from '../../MetaData';
const ForgotPassword = () => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {error,loading,message}=useSelector((state)=>state.forgotPassword);
const [email,setEmail]=useState("");
const forgotPasswordSubmit=(e)=>{
    e.preventDefault();
    let myForm=new FormData();
    myForm.set("email", email);
   dispatch(forgotPassword(myForm));
  
     }


     const navigate=useNavigate();
     useEffect(()=>{
       
     if(error){
       alert.error(error);
       dispatch(clearErrors());
     
     }
     if(message){
       alert.success(message);
     }
      },[dispatch,error,alert,message])





  return (
    <Fragment>

    {loading?(<Loader/>):(
      <Fragment>
     <MetaData title="Forgot Password"/> 
    <div className='forgotPasswordContainer'>
     <div className='forgotPasswordBox'>
        <h2>Forgot Password</h2>
     <form className='forgotPasswordForm'   onSubmit={forgotPasswordSubmit}>
     <div className='forgotPasswordEmail'>
       <MailOutlineIcon/>
       <input type="email" placeholder='email' required name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
       </div>
     
     <input type="submit" value="Send" className='forgotPasswordBtn'/>
     </form>
    </div>
    </div>
    </Fragment>
    
    
    )}
    
    
    
      </Fragment>
    
  )
}

export default ForgotPassword;
