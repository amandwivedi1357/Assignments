import React, { useState } from 'react'
import LoginMessage from './LoginMessage'

const Dashboard = () => {
    const [toggleLogin, setToggleLogin] = useState(false);
  return (
    <div>
        <LoginMessage isLoggedIn={toggleLogin} />
        <button onClick={() => setToggleLogin(!toggleLogin)}>{toggleLogin ? "Logout" : "Login"}</button>
    </div>
  )
}

export default Dashboard