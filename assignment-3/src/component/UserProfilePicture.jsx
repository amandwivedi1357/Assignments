import React from 'react'

const UserProfilePicture = ({ imageUrl, alt = 'User Profile' }) => {
  return (
    <div className="profile-picture-container">
      <img 
        src={imageUrl} 
        alt={alt} 
        className="profile-picture"
      />
    </div>
  )
}

export default UserProfilePicture;