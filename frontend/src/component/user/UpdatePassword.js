import React, { Fragment } from 'react'
import  { useEffect} from 'react'
import Loader from '../../Loader/loader';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./UpdatePassword.css"
import { useDispatch,useSelector } from 'react-redux';
import { clearErrors,updatePassword,loadUser} from '../../actions/userActions';
import {useAlert} from "react-alert"
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import  MetaData from '../../MetaData';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const UpdatePassword = () => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const [avatar,setAvatar]=useState();  
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
const {error,loading,isUpdated}=useSelector((state)=>state.profile);
const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

const updatePasswordSubmit=(e)=>{
e.preventDefault();
    let myForm=new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

   
  dispatch(updatePassword(myForm));
  
     }
 
   
      const navigate=useNavigate();
      useEffect(()=>{
      
      if(error){
        alert.error(error);
        dispatch(clearErrors());
      
      }
      if(isUpdated){
        alert.success("Profile Updated Successfully");

        navigate("/account");
        dispatch({
type:UPDATE_PASSWORD_RESET,
        });
      }},[dispatch,error,navigate,alert,isUpdated])



  return (
    <Fragment>
    {loading?(<Loader/>):(
      <Fragment>
     <MetaData title="Update Password"/> 
    <div className='updatePasswordContainer'>
     <div className='updatePasswordBox'>
        <h2>Update Profile</h2>
     <form className='updatePasswordForm'  encType='multipart/form-data' onSubmit={updatePasswordSubmit}>
     <div className='loginPassword'>
   <VpnKeyIcon/>
   <input type="password" placeholder='Old Password' required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/> 
   </div>
   <div className='loginPassword'>
   <LockOpenIcon/>
   <input type="password" placeholder='New Password' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/> 
   </div>
   <div className='loginPassword'>
   <LockIcon/>
   <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/> 
   </div>
     <input type="submit" value="Change Password" className='updatePasswordBtn'/>
     </form>
    </div>
    </div>
    </Fragment>
    
    
    )}
    
    
    
      </Fragment>
    
      
  )
}

export default UpdatePassword
