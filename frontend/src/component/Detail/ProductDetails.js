import React, { Fragment, useEffect } from 'react'
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css"
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import {getProductDetails} from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js"
import {addToCart} from '../../actions/cartAction';
import Loader from '/Users/tapasviarora/Desktop/Ecommerce-web/frontend/src/Loader/loader.js';
import {useAlert} from 'react-alert';
import MetaData from '../../MetaData';
const ProductDetails = () => {
 const alert=useAlert();
 const {id}=useParams();
const dispatch=useDispatch();
const {product,loading,error}=useSelector((state)=>state.productDetails);
const options = {
  edit:false, 
  color:"rgba(20,20,20,0.1)",
   activeColor: "tomato",
  size: window. innerWidth < 600 ? 20 : 25,
  value:product.ratings,
  isHalf:true,};
const [quantity,setQuantity]=useState(1);
const increaseQuantity=()=>{ 
if(product.Stock<=quantity)
{  
return ;

}
setQuantity(quantity+1);


}
const decreaseQuantity=()=>{
  if(quantity>1)
  {setQuantity(quantity-1);}


}

const addToCartHandler=()=>{


dispatch(addToCart(id,quantity));
alert.success("Item Added To Cart");





}





useEffect(()=>{
if(error){
  alert.error(error);
  dispatch({type:"clearErrors"});
}
dispatch(getProductDetails(id));
},[dispatch,id,alert,error])

  return (<Fragment>
    <MetaData title={`${product.name} -- ECOMMERCE`}/>
    {loading?<Loader/>:(<Fragment>
  <div className='ProductDetails'>
  <div>
  
  <Carousel>
  
  {product.images && product.images.map((item,i)=>(  
  <img
  className='CarouselImage'
  key={i}
  src={item.url}
  alt={`${i}Slide`}/>))
  }
  </Carousel>

  </div>
  <div>
  <div className='detailsBlock-1'>
  <h2>{product.name}</h2>
  <p>Product #{product._id}</p>
  </div>
  <div className='detailsBlock-2'>
    <ReactStars {...options}/>
  <span>({product.numOfReviews})</span>
  </div>
  <div className='detailsBlock-3'>
  <h1>{`$${product.price}`}</h1>
  <div className='detailsBlock-3-1'>
  <div className='detailsBlock-3-1-1'>
  <button onClick={decreaseQuantity}>-</button>  
  <input readOnly value={quantity}  type='number'/>
  <button onClick={increaseQuantity}>+</button>
  </div>
  <button onClick={addToCartHandler}>Add to Cart</button>
  </div>
  <p>
  Status:{""}
  <b className={product.Stock<1? "redColor":"greenColor"}>
  {product.Stock<1 ?"Out Of Stock":"InStock"}
  </b>
  </p>
  </div>
  <div className='detailsBlock-4'>
  Description :<p>{product.description}</p>
  </div>
  <button  className='SubmitReview'>Submit Review</button>
  </div>
  </div>
  <h3 className='reviewsHeading'>REVIEWS</h3>
  
  {product.reviews&&product.reviews[0] ?
  (<div className='reviews'>
  {product.reviews&&product.reviews.map((review)=><ReviewCard review={review}/>)}
  </div>): <p className='noReviews'>No Reviews</p>}
  
  </Fragment>)}
    </Fragment>
)
}

export default ProductDetails;
