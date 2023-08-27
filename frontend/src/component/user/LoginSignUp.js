
import React, { Fragment,useEffect,useRef} from 'react'
import Loader from '../../Loader/loader';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import LockOpenIcon from "@material-ui/icons/LockOpen"; 
import "./LoginSignUp.css"
import  FaceIcon  from '@material-ui/icons/Face';
import { useDispatch,useSelector } from 'react-redux';
import { clearErrors, login,register } from '../../actions/userActions';
import {useAlert} from "react-alert";
import { red } from '@material-ui/core/colors';

const LoginSignUp = () =>{
const dispatch=useDispatch();

const alert=useAlert();
const {isAuthenticated,error,loading}=useSelector((state)=>state.user);
const loginTab=useRef(null);
// class cant access using dom so via use ref access kr rhe he 
const registerTab=useRef(null);
const switcherTab=useRef(null);
const [loginEmail,setLoginEmail]=useState("");
const [loginPassword,setLoginPassword]=useState("");
const [user,setUser]=useState({
name:"",
email:"",
password:""
});
const {name,email,password}=user;
const [avatar,setAvatar]=useState("./logo192.png");  
const [avatarPreview,setAvatarPreview]=useState("./logo192.png");
const registerSubmit=(e)=>{
  e.preventDefault();
  let myForm=new FormData();
  myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
myForm.set("avatar", avatar);
    dispatch(register(myForm));

   }
const registerDataChange = (e) => {
  if (e.target.name === "avatar") {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  } else {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
};















const loginSubmit=(e)=>{
e.preventDefault(); 
  dispatch(login(loginEmail,loginPassword));




}
const location=useLocation();
const redirect=location.search?location.search.split("=")[1]:"/account";
console.log(redirect)

const navigate=useNavigate();
useEffect(()=>{
if(error){
  alert.error(error);
  dispatch(clearErrors());

}
if(isAuthenticated){
navigate(redirect);
}





},[dispatch,error,navigate,isAuthenticated,alert,redirect])



const switchTabs=(e,tab)=>{
  if(tab==="login"){
    switcherTab.current.classList.add("shiftToNeutral");
    switcherTab.current.classList.remove("shiftToRight");

    registerTab.current.classList.remove("shiftToNeutralForm");
    loginTab.current.classList.remove("shiftToLeft");
  }
  if(tab==="register"){
    switcherTab.current.classList.add("shiftToRight");
    switcherTab.current.classList.remove("shiftToNeutral");

    registerTab.current.classList.add("shiftToNeutralForm");
    loginTab.current.classList.add("shiftToLeft");
  }
}






  return (
<Fragment>
{loading? <Loader/>:(
 <Fragment>
 <div className='LoginSignUpContainer'>
 <div className='LoginSignUpBox'>
   <div>
   <div className='login_signUp_toggle'>
     <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
     <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
   </div>
   <button ref={switcherTab}></button>
  </div>
 <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
   <div className='loginEmail'>
     <MailOutlineIcon/>
 <input type="email" placeholder='Email' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
 </div>
 <div className='loginPassword'>
   <LockOpenIcon/>
   <input type="password" placeholder='Password' required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/> 
   </div>
   <div className='foot'>
   <Link to='/password/forgot'>Forgot Password?</Link>
 <input type="submit" value="Login" className='loginBtn'/>
 </div>
 </form>
 <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit}>
 
 <div className='signUpName'>
 <FaceIcon/>
 <input type="text" placeholder='Name' required name='name' value={name} onChange={registerDataChange}/>
 </div>
 <div className='signUpEmail'>
   <MailOutlineIcon/>
   <input type="email" placeholder='Email' required name='email' value={email} onChange={registerDataChange}/>
   </div>
 <div className='signUpPassword'>
   <LockOpenIcon/>
   <input type="password" placeholder='Password' required name='password' value={password} onChange={registerDataChange}/>
   </div>
 <div id='registerImage'>
   <img src={avatarPreview} alt='Avatar Preview'/>
   <input type="file" name='avatar' accept='image/*' onChange={registerDataChange}/>
   </div>
 <input type="submit" value="Register" className='signUpBtn'/>
 </form>
 
 
 
 
 
 
 
 
 
 
 </div> 
 </div>
 </Fragment>




)}



</Fragment>



   
  )}


export default LoginSignUp
