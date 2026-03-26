import React, { useState } from "react";
import "./NonVeg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "./CartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faGoogle, faFacebook,faXTwitter, faYoutube, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NonVeg() {

  const dispatch = useDispatch();

  const nonvegItems = [
    { id: 1, name: "Butter Chicken", price: 280, image: "Images/nonveg/butterchicken.jpg" },
    { id: 2, name: "Chicken Curry", price: 250, image: "Images/nonveg/chickencurry.jpg" },
    { id: 3, name: "Chicken Korma", price: 270, image: "Images/nonveg/chickenkorma.jpg" },
    { id: 4, name: "Chicken Chettinad", price: 290, image: "Images/nonveg/cc.jpg" },
    { id: 5, name: "Mutton Rogan Josh", price: 320, image: "Images/nonveg/mfg.jpg" },
    { id: 6, name: "Mutton Curry", price: 300, image: "Images/nonveg/muttoncurry.jpg" },
    { id: 7, name: "Egg Curry", price: 180, image: "Images/nonveg/egg.jpg" },
    { id: 8, name: "Fish Curry", price: 260, image: "Images/nonveg/fishcurry.jpg" },
    { id: 9, name: "Prawn Masala", price: 310, image: "Images/nonveg/prawnmasala.jpg" },
    { id: 10, name: "Chicken Kolhapuri", price: 295, image: "Images/nonveg/kolhapuri.jpg" },
    { id: 11, name: "Chicken Handi", price: 285, image: "Images/nonveg/chickenhandi.jpg" },
    { id: 12, name: "Mutton Keema Curry", price: 305, image: "Images/nonveg/kheema.jpg" }
  ];

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(nonvegItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = nonvegItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="nonveg-page">

        <h2 className="nonveg-title">🍗 NonVeg Curry</h2>

        <div className="nonveg-grid">
          {currentItems.map((item) => (
            <div className="nonveg-card" key={item.id}>

              <img src={item.image} alt={item.name} />

              <div className="nonveg-card-body">
                <h3>{item.name}</h3>
                <p className="nonveg-price">₹{item.price}</p>

                <button
                  className="nonveg-btn"
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

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>

        </div>

      </div>

      {/* 🔥 FOOTER */}
      <footer className="footer">
        <h2>SwaVish</h2>
        <p>
          Our team is made up of professionals dedicated to excellence. <br />
          We value quality food, fast delivery, and customer satisfaction.
        </p>

        <div className="footer-icons">
                 <FontAwesomeIcon icon={faGoogle} />
                <FontAwesomeIcon icon={faFacebook} />
                 <FontAwesomeIcon icon={faXTwitter} />
                 <FontAwesomeIcon icon={faYoutube} />
                <FontAwesomeIcon icon={faLinkedinIn} />
               </div>

        <hr />

        <p className="footer-bottom">© 2026 SwaVish's</p>
        <p>Home | About | Contact | Blog</p>
      </footer>
    </>
  );
}

export default NonVeg;

