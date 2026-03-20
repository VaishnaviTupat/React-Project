import React, { useState } from "react";
import "./Profile.css";

function Profile() {

//  Dynamic user data
const [user, setUser] = useState({
name: "Your Name",
email: "[your@email.com](mailto:your@email.com)",
address: "Your Address",
});

return (
   <div className="profile">
  {/* HEADER */}
  <div className="profile-header">
    <img
      src="https://i.pravatar.cc/150?img=12"
      alt="user"
      className="profile-img"
    />

    <h2>{user.name}</h2>
    <p>{user.email}</p>

    <button className="edit-btn">Edit Profile</button>
  </div>

  {/* DETAILS */}
  <div className="profile-content">

    {/* ADDRESS */}
    <div className="profile-card">
      <h3>📍 Address</h3>
      <p>{user.address}</p>
    </div>

    {/* ORDERS */}
    <div className="profile-card">
      <h3>🛒 Order History</h3>

      <div className="order-item">
        <p>🍕 Pizza</p>
        <span>₹250</span>
      </div>

      <div className="order-item">
        <p>🍔 Burger</p>
        <span>₹180</span>
      </div>
    </div>

    {/* SETTINGS */}
    <div className="profile-card">
      <h3>⚙️ Settings</h3>
      <button className="setting-btn">Change Password</button>
    </div>

  </div>

  {/* LOGOUT */}
  <button className="logout-btn">Logout</button>

</div>
);
}

export default Profile;
