import React from 'react'

const Greeting = ({name, timeOfDay}) => {
  const currentTime = new Date(timeOfDay);
  const hour = currentTime.getHours();

  let greeting;
  if (hour >= 5 && hour < 12) {
    greeting = 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <div className="greeting-container">
      <h1 className="greeting-message">{greeting}, {name}!</h1>
    </div>
  )
}

export default Greeting