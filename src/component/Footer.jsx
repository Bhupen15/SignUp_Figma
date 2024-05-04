import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import footerImg from "../assets/footerImg.png"

function Footer() {
  return (
    <footer >

    <div className="text-end p-1 " > 
    <img src={footerImg} alt="Bootstrap" width="100"/>

    </div>



</footer>
  )
}

export default Footer