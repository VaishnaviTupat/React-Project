import React, { useState } from "react";
import "./Snack.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast, ToastContainer } from "react-toastify";

function Snack() {

  const dispatch = useDispatch();

  /* VEG SNACK ARRAY */

   const vegSnacks = [
    { id: 1, name: "Paneer Tikka", price: 220, image: "Images/veg/tikka.jpg" },
    { id: 2, name: "Chole Bhature", price: 150, image: "Images/veg/chole.jpg" },
    { id: 3, name: "Vada Pav", price: 140, image: "Images/veg/vadapaav.jpg" },
    { id: 4, name: "Aloo Paratha", price: 90, image: "Images/veg/allo.jpg" },
    { id: 5, name: "Masala Dosa", price: 120, image: "Images/veg/dosa.jpg" },
    { id: 6, name: "Gobi Manchurian", price: 160, image: "Images/veg/gobi.jpg" },
    { id: 7, name: "Dahi Vada", price: 210, image: "Images/veg/dahi.jpg" },
     { id: 8, name: "Pizza", price: 210, image: "Images/veg/pizza.jpg" },
      { id: 9, name: "Burger", price: 99, image: "Images/nonveg/nburger.jpg" }
  ];

  /* NON VEG SNACK ARRAY */

const nonVegSnacks = [
  { id: 1, name: "Chicken Tikka", price: 220, image: "Images/nonveg/tikka.jpg" },
  { id: 2, name: "Fish Fry", price: 240, image: "Images/nonveg/fish.jpg" },
  { id: 3, name: "Chicken 65", price: 210, image: "Images/nonveg/65.jpg" },
  { id: 4, name: "Grilled Chicken", price: 270, image: "Images/nonveg/grilled.jpg" },
  { id: 5, name: "Chicken Lollipop", price: 230, image: "Images/nonveg/lollipop.jpg" },
  { id: 6, name: "Tandoori Chicken", price: 290, image: "Images/nonveg/tandoori.jpg" },
  { id: 7, name: "Pizza", price: 210, image: "Images/veg/pizza.jpg" },
   { id: 8, name: "Burger", price: 120, image: "Images/veg/vburger.jpg" }
];

  /* SLIDER STATES */

  const [vegIndex, setVegIndex] = useState(0);
  const [nonVegIndex, setNonVegIndex] = useState(0);

  const nextVeg = () => {
    if (vegIndex + 4 < vegSnacks.length) {
      setVegIndex(vegIndex + 1);
    }
  };

  const prevVeg = () => {
    if (vegIndex > 0) {
      setVegIndex(vegIndex - 1);
    }
  };

  const nextNonVeg = () => {
    if (nonVegIndex + 4 < nonVegSnacks.length) {
      setNonVegIndex(nonVegIndex + 1);
    }
  };

  const prevNonVeg = () => {
    if (nonVegIndex > 0) {
      setNonVegIndex(nonVegIndex - 1);
    }
  };

  return (
    <>
      <div className="snack-page">

        {/* VEG SNACKS */}

        <h2 className="snack-title">🍟 Veg Snacks</h2>

        <div className="slider">

          <button className="arrow" onClick={prevVeg}>{"<"}</button>

          <div className="snack-grid">
            {vegSnacks.slice(vegIndex, vegIndex + 4).map((item) => (
              <div className="snack-card" key={item.id}>

                <img src={item.image} alt={item.name} />

                <div className="snack-card-body">
                  <h3>{item.name}</h3>
                  <p className="snack-price">₹{item.price}</p>

                  <button
                    className="snack-btn"
                    onClick={() => {
                      dispatch(addToCart(item));
                      toast.success(`${item.name} added to cart`);
                    }}
                  >
                    Add To Cart
                  </button>

                </div>

              </div>
            ))}
          </div>

          <button className="arrow" onClick={nextVeg}>{">"}</button>

        </div>


        {/* NON VEG SNACKS */}

        <h2 className="snack-title">🍗 NonVeg Snacks</h2>

        <div className="slider">

          <button className="arrow" onClick={prevNonVeg}>{"<"}</button>

          <div className="snack-grid">
            {nonVegSnacks.slice(nonVegIndex, nonVegIndex + 4).map((item) => (
              <div className="snack-card" key={item.id}>

                <img src={item.image} alt={item.name} />

                <div className="snack-card-body">
                  <h3>{item.name}</h3>
                  <p className="snack-price">₹{item.price}</p>

                  <button
                    className="snack-btn"
                    onClick={() => {
                      dispatch(addToCart(item));
                      toast.success(`${item.name} added to cart`);
                    }}
                  >
                    Add To Cart
                  </button>

                </div>

              </div>
            ))}
          </div>

          <button className="arrow" onClick={nextNonVeg}>{">"}</button>

        </div>

      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default Snack;