import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, decrementQty, incrementQty, removeCart } from "./CartSlice";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { resetCoupon } from "./couponSlice";
import { addOrder } from "./OrderSlice";
import { toast } from "react-toastify";

function Cart() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart);

  console.log(cartItems)

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {

    const purchaseDetails = {
      date: new Date().toLocaleString(),
      items: [...cartItems],
      totalPrice: totalAmount
    };

    dispatch(addOrder(purchaseDetails));

    navigate("/payment");

  };

  return (
    <div className="cart-page">

      <div className="cart-container">

        <div className="cart-header">

          <h2>🛒 Your Cart ({cartItems.length} items)</h2>

          <button
            className="clear-btn"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>

        </div>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-card" key={item.id}>

              <img src={item.image} alt={item.name} className="cart-img" />

              <div className="cart-info">

                <h3>{item.name}</h3>

                <div className="qty-box">

                  <button
                    onClick={() => dispatch(decrementQty(item))}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => dispatch(incrementQty(item))}>
                    +
                  </button>

                </div>

              </div>

              <div className="cart-price">

                <p>₹{item.price * item.quantity}</p>

                <button
                  className="remove-btn"
                  onClick={() => {
                    dispatch(removeCart(item));
                    toast.error("Product " + item.name + " Removed");

                    if (cartItems.length === 1) {
                      dispatch(resetCoupon());
                    }
                  }}
                >
                  Remove
                </button>

              </div>

            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="cart-footer">

            <h3>Total: ₹{totalAmount.toFixed(2)}</h3>

            <button
              className="place-order"
              onClick={handleCheckout}
            >
              CheckOut
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default Cart;