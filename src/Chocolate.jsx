import React, { useState } from "react";
import "./Chocolate.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Chocolate() {

  const dispatch = useDispatch();

  const dessertItems = [
    { id: 1, name: "Rasmalai", price: 130, image: "Images/dessert/Rasmalai.jpg" },
    { id: 2, name: "Vanilla Ice Cream", price: 100, image: "Images/dessert/vanilla.jpg" },
    { id: 3, name: "Strawberry Cake", price: 180, image: "Images/dessert/strawberry.jpg" },
    { id: 4, name: "Caramel Pudding", price: 120, image: "Images/dessert/pudding.jpg" },
     { id: 5, name: "Rasgulla", price: 70, image: "Images/dessert/Rasgulla.jpg" },
    { id: 6, name: "Gulab Jamun", price: 80, image: "Images/dessert/Gulab Jamun.jpg" },
    { id: 7, name: "Chocolate Brownie", price: 120, image: "Images/dessert/Chocolate.jpg" },
    { id: 8, name: "Ice Cream Sundae", price: 110, image: "Images/dessert/Ice.jpg" },
    { id: 9, name: "Cheese Cake", price: 150, image: "Images/dessert/cheese.jpg" },
    { id: 10, name: "Fruit Custard", price: 90, image: "Images/dessert/custard.jpg" },
    { id: 11, name: "Kaju Katli", price: 140, image: "Images/dessert/Kaju.jpg" },
    { id: 12, name: "Chocolate Lava Cake", price: 160, image: "Images/dessert/Cholava.jpg" },
  ];

  /* PAGINATION */

  const itemsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(dessertItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = dessertItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="dessert-page">

        <h2 className="dessert-title">
        🍨 Sweet Desserts 
          </h2>

        <div className="dessert-grid">

          {currentItems.map((item) => (

            <div className="dessert-card" key={item.id}>

              <img src={item.image} alt={item.name} />

              <div className="dessert-body">

                <h3>{item.name}</h3>

                <p className="dessert-price">₹{item.price}</p>

                <button
                  className="dessert-btn"
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

        {/* PAGINATION */}

        <div className="pagination">

          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (

            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>

          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>

        </div>

      </div>
    </>
  );
}

export default Chocolate;