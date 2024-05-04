import React from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/logo.png"


function Header() {
  return (

<nav class="navbar ">
  <div class="container">
    <a class="navbar-brand" href="#">
      <img src={logo} alt="Bootstrap" width="150"/>
    </a>
  <p>
  Already have an account?
  <a href="#" className="link ps-2">Sign In</a>
  </p>
  </div>
</nav>

  )
}

export default Header