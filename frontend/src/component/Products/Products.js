import React, { Fragment } from 'react'
import './Products.css'
import { useSelector,useDispatch } from 'react-redux'
import { clear_errors,getProduct } from '../../actions/productAction'
import Loader from '../../Loader/loader'
import ProductCard  from '../Home/ProductCard';
import Pagination from 'react-js-pagination';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import './Products.css' 
import { useEffect } from 'react'
import { set } from 'mongoose'
import { useState } from 'react'
import {useAlert} from 'react-alert'
import MetaData from '../../MetaData'


const categories=["Laptop","Footwear","Bottom","Tops","Attire","Camera","SmartPhones"];










const Products = () => {
const {keyword}=useParams();
const dispatch=useDispatch();
const alert=useAlert();

const [currentPage,setCurrentPage]=useState(1)
const [price,setPrice]=useState([0,25000])
const [category,setCategory]=useState('')
const [ratings,setRatings]=useState(0);

const setCurrentPageNo=(e)=>{setCurrentPage(e);
console.log("working")
console.log(productsCount);}
const priceHandler=(event,newPrice)=>{
setPrice(newPrice);
}



const {loading,products,error,productsCount,resultperpage,filteredProductsCount}= useSelector((state)=>state.products)
useEffect(()=>{

  if(error){
alert.error(error);
dispatch(clear_errors());

  }



dispatch(getProduct(keyword,currentPage,price,category,ratings));





},[dispatch,error,keyword,currentPage,price,category,ratings])
let count=filteredProductsCount;










return <Fragment>
{loading?<Loader/>:<Fragment>
 <MetaData title="Products Ecommerce"/> 
<h2 className='productsheading'>
    Products
    </h2>
    <div className='products'>
    {products&&products.map((product)=>(
<ProductCard key={product._id} product={product} className="card"/>))}
</div>

<div className='filterBox'>
 <Typography>Price</Typography>
 <Slider value={price}
 onChange={priceHandler}
 valueLabelDisplay='auto' 
 aria-labelledby='range-slider'
 min={0}
 max={25000}
 />
<Typography>Categories </Typography>
<ul className='categoryBox'>
 {categories.map((category)=>(
<li
className='category-link'
key={category}
onClick={()=>setCategory(category)}
>
{category}
</li>
))} 
</ul>


<fieldset>
<Typography component="legend">Ratings above</Typography>
</fieldset>
<Slider 
value={ratings}
onChange={
(e,newRating)=>{
setRatings(newRating);}}
aria-labelledby='continuous-slider'
valueLabelDisplay='auto'
min={0}
max={5}
/>








  </div>





{resultperpage<count&&(
<div className='paginationBox'>
<Pagination activePage={currentPage}
  itemsCountPerPage={resultperpage}
  totalItemsCount={productsCount}
  onChange={setCurrentPageNo}
  nextPageText="Next"
  prevPageText="Prev"
  firstPageText="1st"
  lastPageText='Last'
  itemClass='page-item'
  linkClass='page-link'
  activeClass='pageItemActive'
  activeLinkClass='pageLinkActive'/></div>)}
    
  







    </Fragment>
    }



</Fragment>
  
}

export default Products
