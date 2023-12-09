import React from 'react'
import { Link } from "react-router-dom";

const Landing = () => {
  return <div>
    <h1>Landing</h1>
    <Link to="/login">
      Login
    </Link>{' '}
    <Link to="/signin">
      Sign in
    </Link>{' '}
    <Link to="/home">
      Sign in
    </Link>
  </div>
}

export default Landing