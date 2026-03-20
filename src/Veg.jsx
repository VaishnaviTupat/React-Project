import React, { useState } from "react";
import "./veg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood  } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Veg() {

  const dispatch = useDispatch();

const vegItems = [
   { id: 1, name: "Baingan Bharta", price: 180, image: "Images/veg/ba.jpg" },
  { id: 2, name: "Palak Paneer", price: 220, image: "Images/veg/palak.jpg" },
  { id: 3, name: "Matar Paneer", price: 210, image: "Images/veg/mp.jpg" },
  { id: 4, name: "Kadai Paneer", price: 230, image: "Images/veg/kp.jpg" },
  { id: 5, name: "Mix Veg Curry", price: 190, image: "Images/veg/mixveg.jpg" },
  { id: 6, name: "Dal Tadka", price: 160, image: "Images/veg/dt.jpg" },
  { id: 7, name: "Dal Makhani", price: 200, image: "Images/veg/dalm.jpg" },
  { id: 8, name: "Chole Masala", price: 180, image: "Images/veg/cm.jpg" },
  { id: 9, name: "Aloo Gobi", price: 170, image: "Images/veg/ag.jpg" },
  { id: 10, name: "Malai Kofta", price: 250, image: "Images/veg/mk.jpg" },
  { id: 11, name: "Rajma Masala", price: 190, image: "Images/veg/r.jpg" },
   { id: 12, name: "Paneer Butter Masala", price: 240, image: "Images/veg/pbm.jpg" }
];
  /* PAGINATION LOGIC */

  const itemsPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(vegItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = vegItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="veg-page">

        <h2 className="veg-title">
          <FontAwesomeIcon icon={faBowlFood } /> Veg Curry <FontAwesomeIcon icon={faBowlFood } />
        </h2>

        <div className="veg-grid">

          {currentItems.map((item) => (

            <div className="veg-card" key={item.id}>

              <img src={item.image} alt={item.name} />

              <div className="veg-card-body">

                <h3>{item.name}</h3>

                <p className="veg-price">₹{item.price}</p>

                <button
                  className="veg-btn"
                  onClick={() => {
                    dispatch(addToCart(item));
                    toast.success(`${item.name} added to cart`);
                  }}
                >
                  Add to Cart
                </button>

              </div>

            </div>

          ))}

        </div>

        <div className="pagination">

            {/* Previous Button */}
            <button onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}  >
                     Prev
                  </button>

                    {/* Page Numbers */}
                      {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index}
                           className={currentPage === index + 1 ? "active" : ""}
                             onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                    </button>
                              ))}
                         
                           {/* Next Button */}
                    <button onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}>
                             Next
                    </button>
             </div>
      </div>
    </>
  );
}

export default Veg;