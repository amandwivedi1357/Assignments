import React, { useState } from 'react'
import Greeting from '../component/Greeting'
import UserDashboard from '../component/UserDashboard'

const Home = () => {
  const [isLoggedIn, setToggleLogin] = useState(false);
  return (
    <div>
      <Greeting name="John" timeOfDay="2023-05-05T15:25:09" />
      <UserDashboard 
        name="John" 
        email="john.doe@example.com" 
        bio="Software Developer"
        isLoggedIn={isLoggedIn} 
        onLogout={() => setToggleLogin(false)}
        onLogin={() => setToggleLogin(true)}
      />
    </div>
  )
}

export default Home;