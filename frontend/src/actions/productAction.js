import  axios from "axios"
import{
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DETAIL_SUCCESS,
    CLEAR_ERRORS}
    from "../constants/productConstants";



export const getProduct=(keyword="",currentPage=1,price=[0,25000],category,ratings=0)=>async(dispatch)=>{
console.log(keyword);
try{dispatch({type:ALL_PRODUCT_REQUEST});
let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
if(category)
{link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${ratings}`; 
}




const {data}=await axios.get(link);
   dispatch({type:ALL_PRODUCT_SUCCESS,
    payload:data});
}
catch(error){
dispatch({
type:ALL_PRODUCT_FAIL,
payload:error.response.data.message,})}}

export const clear_errors=()=>async(dispatch)=>{
dispatch({type:CLEAR_ERRORS})}

export const getProductDetails=(id)=>async(dispatch)=>{
    try{dispatch({type:PRODUCT_DETAIL_REQUEST});
    const {data}=await axios.get(`/api/v1/products/${id}`);
       dispatch({type:PRODUCT_DETAIL_SUCCESS,
        payload:data.product});
    }
    catch(error){
    dispatch({
    type:PRODUCT_DETAIL_FAIL,
    payload:error.response.data.message,})}}
    

