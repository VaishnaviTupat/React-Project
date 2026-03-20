import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Veg from "./Veg";
import NonVeg from "./NonVeg";
import Soup from "./Soup";
import Chocolate from "./Chocolate";
import Cart from "./Cart";
import Order from "./Order";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import NotFound from "./NotFound";
import "./App.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faDrumstickBite,
  faBurger,
  faMugHot,
  faCartShopping,
  faCakeCandles,
  faTruck,
  faCircleInfo,
  faPhone,
  faUser,
  faLeaf
} from "@fortawesome/free-solid-svg-icons";
import Payment from "./Payment";
import Snack from "./Snack";

function App() {

  const items = useSelector(state => state.cart);
  const totalItem = items.reduce((total, item) => total + item.quantity, 0);

  const [openAccount, setOpenAccount] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Load user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  const toggleAccount = () => setOpenAccount(!openAccount);
  const closeAccount = () => setOpenAccount(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setOpenAccount(false);
  };

  return (
    <BrowserRouter>

   <nav className="navbar">

  {/* LOGO */}
  <div className="nav-logo">
    <h1>SwaVish</h1>
  </div>

  {/* LINKS */}
  <div className="nav-links">

    <NavLink to="/" className="nav-link"><FontAwesomeIcon icon={faHouse}/> Home</NavLink>
    <NavLink to="/veg" className="nav-link"><FontAwesomeIcon icon={faLeaf}/> Veg</NavLink>
    <NavLink to="/nonveg" className="nav-link"><FontAwesomeIcon icon={faDrumstickBite}/> NonVeg</NavLink>
    <NavLink to="/snack" className="nav-link"><FontAwesomeIcon icon={faBurger}/> Starters</NavLink>
    <NavLink to="/soup" className="nav-link"><FontAwesomeIcon icon={faMugHot}/> Soup</NavLink>
    <NavLink to="/dessert" className="nav-link"><FontAwesomeIcon icon={faCakeCandles}/> Dessert</NavLink>

    <NavLink to="/cart" className="nav-link">
      <FontAwesomeIcon icon={faCartShopping}/> Cart
      <span className="count">{totalItem}</span>
    </NavLink>

    <NavLink to="/order" className="nav-link"><FontAwesomeIcon icon={faTruck}/> Order</NavLink>
    <NavLink to="/aboutus" className="nav-link"><FontAwesomeIcon icon={faCircleInfo}/> AboutUs</NavLink>
    <NavLink to="/contactus" className="nav-link"><FontAwesomeIcon icon={faPhone}/> ContactUs</NavLink>

  </div>

  {/* RIGHT SIDE USER SECTION */}
  <div className="nav-right">

    {!currentUser ? (
      <NavLink to="/login" className="login-btn">
        Login
      </NavLink>
    ) : (
      <div className="user-section">

        {/* USER ICON → PROFILE */}
        <NavLink to="/profile" className="user-icon">
          <FontAwesomeIcon icon={faUser}/>
        </NavLink>

        {/* USERNAME */}
        <span className="username">
          {currentUser.name}
        </span>

        {/* LOGOUT */}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>

      </div>
    )}

  </div>

</nav>

      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/snack" element={<Snack />} />
          <Route path="/soup" element={<Soup />} />
          <Route path="/dessert" element={<Chocolate />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;