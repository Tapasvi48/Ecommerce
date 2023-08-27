import React, { useEffect } from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "/Users/tapasviarora/Desktop/Ecommerce-web/frontend/src/MetaData.js";
import { getProduct } from '../../actions/productAction';
import {useSelector,useDispatch} from "react-redux"
import Loader from '../../Loader/loader';




// use selector se store se componenets me ayga data



const Home = () => {
  const dispatch=useDispatch();
const {loading,error,products,productsCount}=useSelector(state=>state.products);
  
  useEffect(()=>{
dispatch(getProduct());
  },[dispatch])
  return (
    <>
    {loading? <Loader />:<><MetaData title="Ecommerce"/>
    <div className="banner">
<p>Welcome to Ecommerce</p>
<h1>
  Find Amazing Products Below
</h1>
<a href='#container'>
<button>
Scroll <CgMouse/>
</button>
</a>
</div>
<h2 className='homeheading'>Featured Products</h2>
<div className='container' id='container'>
{products&&products.map((product)=><ProductCard product={product}/>)}
 </div>
 </>}   
    
    </>
  )
}

export default Home;
