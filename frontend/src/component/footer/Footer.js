import React from 'react'
import appStore from "/Users/tapasviarora/Desktop/Ecommerce-web/frontend/src/images/Appstore.png";
import PlayStore from "/Users/tapasviarora/Desktop/Ecommerce-web/frontend/src/images/playstore.png";
import "./Footer.css";


const Footer = () => {
  return (
  
      <footer id="footer">
<div className="leftFooter">
    <h4>Download Our App</h4>
<p>
    Download App for Android and Ios mobile phones
</p>
<img src={PlayStore} alt="playStore"/>
<img src={appStore} alt="AppStore"/>

</div>

<div className="midFooter">
<h1>Ecommerce</h1>
<p> High Quality is our first priority</p>
<p> CopyRights 2023 &copy; tapasviarora </p>
</div>
<div className="rightFooter">
<h4>
    Follow Us
</h4>
<a href="#">Instagram</a>
<a href="#">Youtube</a>
<a href="#">Facebook</a>
</div>
</footer>
 
  )
}

export default Footer;
