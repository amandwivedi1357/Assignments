import React from 'react'

const UserInformation = ({ name, email, bio }) => {
  return (
    <div className="user-information-container">
      <h2 className="user-name">{name}</h2>
      <p className="user-email">{email}</p>
      {bio && <p className="user-bio">{bio}</p>}
    </div>
  )
}

export default UserInformation;