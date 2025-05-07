import React, { useState } from "react";

const Profile = ({ contract, account }) => {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const updateProfile = async () => {
    await contract.methods
      .setProfile(username, avatarUrl)
      .send({ from: account });
    alert("Profile updated!");
  };

  return (
    <div>
      <h3>Update Profile</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Avatar URL"
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
      />
      <button onClick={updateProfile}>Update</button>
    </div>
  );
};

export default Profile;
