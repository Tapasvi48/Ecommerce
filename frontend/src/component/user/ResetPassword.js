import React, { Fragment } from 'react'
import  { useEffect} from 'react'
import Loader from '../../Loader/loader';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import "./ResetPassword.css"
import { useDispatch,useSelector } from 'react-redux';
import { clearErrors,resetPassword,loadUser} from '../../actions/userActions';
import {useAlert} from "react-alert"
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import  MetaData from '../../MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const ResetPassword = () => {
    const param=useParams();
const alert=useAlert();
const {error,success,loading}=useSelector(state=>state.forgotPassword);


const dispatch=useDispatch();
const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

const resetPasswordSubmit=(e)=>{
    e.preventDefault();
        let myForm=new FormData();
        myForm.set("password",password);
        myForm.set("confirmPassword",confirmPassword);
    
       
      dispatch(resetPassword(param.token,myForm));
      
         }
     
       
          const navigate=useNavigate();
          useEffect(()=>{
          
          if(error){
            alert.error(error);
            dispatch(clearErrors());
          
          }
          if(success){
            alert.success("Password Updated Successfully");
    
            navigate("/login");
            
          }},[dispatch,error,navigate,alert,success])
  return (
    <Fragment>
    {loading?(<Loader/>):(
      <Fragment>
     <MetaData title="Reset Password"/> 
    <div className='resetPasswordContainer'>
     <div className='resetPasswordBox'>
        <h2>Update Profile</h2>
     <form className='resetPasswordForm'  encType='multipart/form-data' onSubmit={resetPasswordSubmit}>
     
   <div >
   <LockOpenIcon/>
   <input type="password" placeholder='password' required value={password} onChange={(e)=>setPassword(e.target.value)}/> 
   </div>
   <div >
   <LockIcon/>
   <input type="password" placeholder='confirmPassword' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/> 
   </div>
     <input type="submit" value="Update" className='resetPasswordBtn'/>
     </form>
    </div>
    </div>
    </Fragment>
    
    
    )}
    
    
    
      </Fragment>






  )
}

export default ResetPassword
