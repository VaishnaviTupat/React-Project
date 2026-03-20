import React, { useRef, useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const categoryRef = useRef();
  const [cartCount] = useState(0); // demo cart count

  // CATEGORY DATA
  const categories = [
    { name: "Biryani", img: "/Images/nonveg/hcb.jpg", path: "/nonveg" },
    { name: "Pizza", img: "/Images/veg/pizza.jpg", path: "/veg" },
    { name: "Soup", img: "/Images/soup/manchow.jpg", path: "/soup" },
    { name: "Burger", img: "/Images/nonveg/nburger.jpg", path: "/snack" },
    { name: "Butter Chicken", img: "/Images/nonveg/butterchicken.jpg", path: "/nonveg" },
    { name: "Vada Pav", img: "/Images/veg/vadapaav.jpg", path: "/veg" },
    { name: "Samosa", img: "/Images/veg/samosa.jpg", path: "/veg" },
    { name: "Dosa", img: "/Images/veg/dosa.jpg", path: "/veg" },
    { name: "Chicken Soup", img: "/Images/soup/chickenHot.jpg", path: "/soup" },
    { name: "Tikka", img: "/Images/nonveg/tikka.jpg", path: "/nonveg" },
    { name: "Egg Curry", img: "/Images/nonveg/egg.jpg", path: "/nonveg" },
    { name: "Rasmalai", img: "/Images/dessert/Rasmalai.jpg", path: "/dessert" },
    { name: "Fish Pakoda", img: "/Images/nonveg/fish.jpg", path: "/nonveg" },
    { name: "Ice Cream", img: "/Images/dessert/Ice.jpg", path: "/dessert" },
  ];

  const loopItems = [...categories, ...categories];

  // INFINITE SCROLL
  useEffect(() => {
    const container = categoryRef.current;

    const interval = setInterval(() => {
      if (container) {
        container.scrollLeft += 1;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">

      {/* FLOATING CART */}
      <div className="floating-cart" onClick={() => navigate("/cart")}>
        🛒 <span>{cartCount}</span>
      </div>

      {/*========== HERO ========*/}
      <div className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>Craving Something Delicious? 🍔</h1>
          <p>Order your favorite food instantly</p>

          {/*============ SEARCH ===========*/}
          <div className="search-box">
            <input placeholder="Search for dishes..." />
            <button>🔍</button>
          </div>

          {/*============ QUICK BUTTONS ==========*/}
          <div className="quick-btns">
            <button onClick={() => navigate("/veg")}>Veg</button>
            <button onClick={() => navigate("/nonveg")}>Non-Veg</button>
            <button onClick={() => navigate("/dessert")}>Dessert</button>
            <button onClick={() => navigate("/snack")}>Snacks</button>
          </div>
        </div>
      </div>

      {/*========== CATEGORY ============*/}
      <h2 className="section-title">Explore Categories</h2>

      <div className="category-wrapper">
        <div className="category-scroll" ref={categoryRef}>
          {loopItems.map((item, i) => (
            <div
              className="category-item"
              key={i}
              onClick={() => navigate(item.path)}
            >
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/*========= TRENDING ===========*/}
      <h2 className="section-title">🔥 Trending Now</h2>
         <div className="trending">
               {categories.slice(0, 5).map((item, i) => (
                  <div className="trend-card" key={i}>
                      <img src={item.img} alt={item.name} />
                        <div className="trend-info">
                         <h3>{item.name}</h3>
                         <p>⭐ 4.{i} • ₹{200 + i * 40}</p>
                     </div>
                  </div>
                 ))}
          </div>

      {/*========= FEATURED ===========*/}
      <h2 className="section-title">⭐ Dish of the Day</h2>

      <div className="featured">
        <img
          src="Images/nonveg/bc.jpg"
          alt="featured"
        />
        <div className="featured-content">
          <h2>Butter Chicken</h2>
          <p>Rich creamy delicious taste 😋</p>
          <button onClick={() => navigate("/nonveg")}>
            Order Now
          </button>
        </div>
      </div>

      {/*=========== OFFER ==========*/}
      <div className="offer">
        🎉 50% OFF | First Order | Code: FOOD50
      </div>

      {/*============ FEATURES ==========*/}
      <h2 className="section-title">Why Choose Us</h2>

      <div className="features">
        <div className="feature-card">🚚 Fast Delivery</div>
        <div className="feature-card">🍽️ Quality Food</div>
        <div className="feature-card">💰 Best Prices</div>
        <div className="feature-card">⭐ Top Rated</div>
      </div>

    </div>
  );
}

export default Home;