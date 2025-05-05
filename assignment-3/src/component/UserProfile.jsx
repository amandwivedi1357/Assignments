import React from 'react'
import UserProfilePicture from './UserProfilePicture'
import UserInformation from './UserInformation'

const UserProfile = ({ 
  imageUrl = "/home.png", 
  name,
  email,
  bio  
}) => {
  return (
    <div className="user-profile-container">
      <UserProfilePicture imageUrl={imageUrl} />
      <UserInformation 
        name={name} 
        email={email} 
        bio={bio} 
      />
    </div>
  )
}

export default UserProfile;