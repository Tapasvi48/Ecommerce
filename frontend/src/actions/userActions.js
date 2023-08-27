
import ResetPassword from "../component/user/ResetPassword";
import { LOGIN_REQUEST,LOGIN_FAIL,LOGIN_SUCCESS} from "../constants/userConstants"
import { CLEAR_ERRORS } from "../constants/userConstants";
import {REGISTER_FAIL,REGISTER_REQUEST,REGISTER_SUCCESS} from "../constants/userConstants";
import { LOAD_FAIL,LOAD_REQUEST,LOAD_SUCCESS } from "../constants/userConstants";
import {LOGOUT_SUCCESS,LOGOUT_FAIL} from "../constants/userConstants";
import {UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_FAIL,UPDATE_PROFILE_RESET} from "../constants/userConstants";
import {UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCCESS,UPDATE_PASSWORD_FAIL,UPDATE_PASSWORD_RESET} from "../constants/userConstants";
import {FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAIL} from "../constants/userConstants";
import { RESET_PASSWORD_FAIL,RESET_PASSWORD_SUCCESS,RESET_PASSWORD_REQUEST } from "../constants/userConstants";
import axios from "axios";
// LOGIN
export const login = (email, password) => async (dispatch) => {

try{
dispatch({type:LOGIN_REQUEST})
const config={headers:{"Content-Type":"application/json"}}
const {data}= await axios.post("/api/v1/login",{email,password},config)
dispatch({type:LOGIN_SUCCESS,payload:data.user})


}
catch(error){
dispatch({type:LOGIN_FAIL,payload:error.response.data.message})}}
// REGISTER

export const register =(userData)=>async (dispatch)=>{

try{
dispatch({type:REGISTER_REQUEST})
const config={headers:{"Content-Type":"multipart/form-data"}};
 const {data}= await axios.post("/api/v1/register",userData,config);
dispatch({type:REGISTER_SUCCESS,payload:data.user});}


catch(error){
    dispatch({type:REGISTER_FAIL,payload:error.response.data.message})
}}


// load user
export const loadUser = () => async (dispatch) => {
    try{
        dispatch({type:LOAD_REQUEST})

        const {data}= await axios.get("/api/v1/me")
        dispatch({type:LOAD_SUCCESS,payload:data.user})
    }
        catch(error){
        dispatch({type:LOAD_FAIL,payload:error.response.data.message})}}


// logout user
export const logout = () => async (dispatch) => {

try{
await axios.get("/api/v1/logout")
dispatch({type:LOGOUT_SUCCESS})
}
catch(error){

dispatch({type:LOGOUT_FAIL,payload:error.response.data.message})}


}

// update user
export const updateProfile =(userData)=>async (dispatch)=>{

    try{
    dispatch({type:UPDATE_PROFILE_REQUEST})
    const config={headers:{"Content-Type":"multipart/form-data"}};
     const {data}= await axios.put("/api/v1/me/update",userData,config);
    dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.success});}
    
    
    catch(error){
    dispatch({type:UPDATE_PROFILE_FAIL,payload:error.response.data.message})
    }
}
export const updatePassword =(password)=>async (dispatch)=>{
try{

dispatch({type:UPDATE_PASSWORD_REQUEST})
const config={headers:{"Content-Type":"application/json"}};
const {data}=await axios.put("/api/v1/password/update",password,config);
dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:data.success});


}



catch(error){
dispatch({type:UPDATE_PASSWORD_FAIL,payload:error.response.data.message})



}







}

export const forgotPassword = (email) => async (dispatch) => {

    try{

    dispatch({type:FORGOT_PASSWORD_REQUEST})
    const config={headers:{"Content-Type":"application/json"}};
    const {data}= await axios.post("/api/v1/password/forgot",email,config)
    dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:data.message})
    
    
    }
    catch(error){
    dispatch({type:FORGOT_PASSWORD_FAIL,payload:error.response.data.message})}}




    export const resetPassword = (token,passwords) => async (dispatch) => {

        try{
        dispatch({type:RESET_PASSWORD_REQUEST})
        const config={headers:{"Content-Type":"application/json"}}
        const {data}= await axios.put(`/api/v1/password/reset/${token}`,passwords,config)
        dispatch({type:RESET_PASSWORD_SUCCESS,payload:data.success})
        
        
        }
        catch(error){
        dispatch({type:RESET_PASSWORD_FAIL,payload:error.response.data.message})}}










// clearing errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}; 