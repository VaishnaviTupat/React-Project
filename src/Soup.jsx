import React, { useState } from "react";
import "./Soup.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast, ToastContainer } from "react-toastify";

function Soup() {

  const dispatch = useDispatch();

  /* VEG SOUP ARRAY */

  const vegSoups = [
    { id: 1, name: "Tomato Soup", price: 90, image: "Images/soup/tom.jpg" },
    { id: 2, name: "Sweet Corn Soup", price: 100, image: "Images/soup/sweet.jpg" },
    { id: 3, name: "Hot & Sour Soup", price: 110, image: "Images/soup/hot.jpg" },
    { id: 4, name: "Manchow Soup", price: 120, image: "Images/soup/manchow.jpg" },
    { id: 5, name: "Veg Clear Soup", price: 95, image: "Images/soup/veg.jpg" },
    { id: 6, name: "Mushroom Soup", price: 115, image: "Images/soup/mush.jpg" },
    { id: 7, name: "Lemon Coriander Soup", price: 105, image: "Images/soup/lemon.jpg" }
  ];

  /* NON VEG SOUP ARRAY */

  const nonVegSoups = [
    { id: 8, name: "Chicken Soup with Piece", price: 130, image: "Images/soup/chi.jpg" },
    { id: 9, name: "Chicken Soup Without Piece", price: 140, image: "Images/soup/cre.jpg" },
    { id: 10, name: "Chicken Sweet Corn Soup", price: 150, image: "Images/soup/chickenCorn.jpg" },
    { id: 11, name: "Chicken Manchow Soup", price: 145, image: "Images/soup/chickenMan.jpg" },
    { id: 12, name: "Chicken Hot & Sour Soup", price: 150, image: "Images/soup/chickenHot.jpg" },
    { id: 13, name: "Mutton Soup without Piece", price: 99, image: "Images/soup/mutto.jpg" },
    { id: 14, name: "Mutton Soup with Piece", price: 120, image: "Images/soup/mutton.jpg" }
  ];

  /* SLIDER STATES */

  const [vegIndex, setVegIndex] = useState(0);
  const [nonVegIndex, setNonVegIndex] = useState(0);

  const nextVeg = () => {
    if (vegIndex + 4 < vegSoups.length) {
      setVegIndex(vegIndex + 1);
    }
  };

  const prevVeg = () => {
    if (vegIndex > 0) {
      setVegIndex(vegIndex - 1);
    }
  };

  const nextNonVeg = () => {
    if (nonVegIndex + 4 < nonVegSoups.length) {
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
      <div className="soup-page">

        {/* VEG SOUPS */}

        <h2 className="soup-title">🍲 Veg Soups</h2>

        <div className="slider">

          <button className="arrow" onClick={prevVeg}>{"<"}</button>

          <div className="soup-grid">
            {vegSoups.slice(vegIndex, vegIndex + 4).map((item) => (
              <div className="soup-card" key={item.id}>

                <img src={item.image} alt={item.name} />

                <div className="soup-card-body">
                  <h3>{item.name}</h3>
                  <p className="soup-price">₹{item.price}</p>

                  <button
                    className="soup-btn"
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


        {/* NON VEG SOUPS */}

        <h2 className="soup-title">🍗 Non-Veg Soups</h2>

        <div className="slider">

          <button className="arrow" onClick={prevNonVeg}>{"<"}</button>

          <div className="soup-grid">
            {nonVegSoups.slice(nonVegIndex, nonVegIndex + 4).map((item) => (
              <div className="soup-card" key={item.id}>

                <img src={item.image} alt={item.name} />

                <div className="soup-card-body">
                  <h3>{item.name}</h3>
                  <p className="soup-price">₹{item.price}</p>

                  <button
                    className="soup-btn"
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

export default Soup;