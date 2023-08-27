import Header from "./component/header/Haeder.js";
import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import webFont from "webfontloader";
import { useEffect,useState } from "react";
import "./App.css";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import UpdatePassword from "./component/user/UpdatePassword.js";
import Payment from "./component/Cart/Payment.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import ForgotPassword from "./component/user/ForgotPassword.js";
import ResetPassword from "./component/user/ResetPassword.js";
// sbse phle load hote vkt kuch krna ho to
import React from "react";
import Footer from "./component/footer/Footer.js";
import Home from "./component/Home/Home.js";
import Cart from "./component/Cart/Cart.js";
import UpdatedProfile from "./component/user/UpdatedProfile.js";
import ProductDetails from "./component/Detail/ProductDetails.js"
import Products from "./component/Products/Products.js"
import Search from "./component/Search/Search.js"
import LoginSignUp from "./component/user/LoginSignUp.js";
import store from "./store.js";
import { loadUser } from "./actions/userActions.js";
import UserOptions from "./component/header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/user/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import axios from "axios";








function App() {
  const {isAuthenticated,user}=useSelector((state)=>state.user)
const [stripeApiKey,setStripeApiKey]=useState("");
async function getStripeApiKey(){
const {data}=await axios.get("/api/v1/stripeapikey");
setStripeApiKey(data.stripeApiKey);



}
  React.useEffect(()=>{
    webFont.load({
    google:{
    families:["Roboto","Droid Sans","Chilanka"],
    
    },
    
    
    
    });
    store.dispatch(loadUser());
    getStripeApiKey();

    
    
    
    
    },[])
    
  return (
  <Router>
     <Header/>
     {isAuthenticated&&<UserOptions user={user}/>}
    <Routes>
 <Route path="/" element={<Home/>}/>
 <Route path="/product/:id" element={<ProductDetails/>}/>
<Route path="/products" element={<Products/>}/>
<Route path="/products/:keyword" element={<Products/>}/>
<Route path="/Search" element={<Search/>}/>
<Route path="/login" element={<LoginSignUp/>}/>
<Route path="/account" element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}/>
<Route path="/me/update" element={
<ProtectedRoute>
<UpdatedProfile/>
</ProtectedRoute>
}/>
<Route path='/password/update' element={<ProtectedRoute>
<UpdatePassword/>
</ProtectedRoute>}/>
<Route path="/password/forgot" element={<ForgotPassword/>}/>
<Route path="/password/reset/:token" element={<ResetPassword/>}/>
<Route path="/Cart" element={<Cart/>}/>
<Route path="/login/shipping" element={<ProtectedRoute><Shipping/>
</ProtectedRoute>
}/>
<Route path="/order/confirm" element={<ConfirmOrder/>}/>
<Route exact path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>}/>
</Routes>
<Footer/>
</Router> 



  );
}

export default App;
