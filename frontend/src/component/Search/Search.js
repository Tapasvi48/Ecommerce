import React, { Fragment, useState } from 'react'
import "./Search.css"
import { useNavigate } from "react-router-dom";
import MetaData from '../../MetaData';





const Search = () => {const navigate=useNavigate();
    
const [keyword,setKeyword]=useState('');
const searchSubmitHandler=(e)=>{
e.preventDefault();

// trim replace white space around both side

if(keyword.trim()){
   navigate(`/products/${keyword}`);}
    
    else{

    navigate("/products");
    
    }
}



  return (
    <Fragment>
      <MetaData title="Search --Ecommerce"/> 
<form  className='searchbox' onSubmit={searchSubmitHandler}>
<input type="text"
 name="search" 
 placeholder='Search for products...'
 onChange={(e)=>setKeyword(e.target.value)}/>
<input type="submit" value="Search"/>
</form>
</Fragment>

  )
}

export default Search;

