import React from 'react'

const LoginMessage = ({isLoggedIn}) => {
  return (
    <div className="login-message">{isLoggedIn ? "Please Login" : "Welcome Back User!"}</div>
  )
}

export default LoginMessage;