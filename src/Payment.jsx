import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyCoupon } from "./couponSlice";
import { addOrder } from "./orderSlice";
import { QRCode } from "react-qr-code";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt, faTags, faTicket } from "@fortawesome/free-solid-svg-icons";
import "./Payment.css";
import { useNavigate } from "react-router-dom";

function Payment() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart);
  const { discount, message } = useSelector((state) => state.coupon);

  const [discountPer, setDiscountPer] = useState(0);
  const [couponInput, setCouponInput] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [checkOut, setCheckOut] = useState(false);
  const [payment, setPayment] = useState("");

  /* ORDER ID */
  const generateOrderId = () => {
    return "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  /* TOTAL AMOUNT */
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /* MANUAL DISCOUNT */
  const manualDiscount = (totalAmount * discountPer) / 100;
  const priceAfterManual = totalAmount - manualDiscount;

  /* GST */
  const gst = priceAfterManual * 0.18;
  const amountAfterGST = priceAfterManual + gst;

  /* COUPON DISCOUNT */
  const couponDiscountAmount = (amountAfterGST * discount) / 100;

  /* FINAL AMOUNT */
  const finalAmount = amountAfterGST - couponDiscountAmount;

  /* CHECKOUT */
  const handleCheckOut = () => {

    if (!email) {
      alert("Please enter email");
      return;
    }

    const orderId = generateOrderId();

    const templateParam = {
      order_id: orderId,
      orders: cartItems.map((item) => ({
        name: item.name,
        price: (item.price * item.quantity).toFixed(2),
        units: item.quantity
      })),
      cost: {
        shipping: 50,
        total: finalAmount.toFixed(2),
        tax: gst.toFixed(2)
      },
      email: email
    };

    emailjs
      .send(
        "service_8y7w13s",
        "template_u16m0sb",
        templateParam,
        "x3vHufRXnpVB41Nyf"
      )
      .then(() => {
        alert("Email Sent Successfully");
      })
      .catch((error) => {
        alert("Email Sending Failed", error);
      });

    const purchaseDetails = {
      id: orderId,
      items: cartItems,
      total: finalAmount,
      email: email,
      date: new Date().toLocaleString()
    };

    dispatch(addOrder(purchaseDetails));

    // ⭐ REDIRECT TO ORDER PAGE
  navigate("/order");
  };

  return (
    <div className="payment-page">

      <div className="payment-box">

        <h2 className="summary-title">
          <FontAwesomeIcon icon={faReceipt} /> Payment Summary
        </h2>

        <div className="row">
          <span>Total Amount:</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        <hr />

        <div className="row">
          <span>GST (18%):</span>
          <span>₹{gst.toFixed(2)}</span>
        </div>

        <hr />

        <div className="rowd">
          <span>
            <FontAwesomeIcon icon={faTags} /> Manual Discount ({discountPer}%):
          </span>
          <span>- ₹{manualDiscount.toFixed(2)}</span>
        </div>

        <hr />

        <div className="rowd">
          <span>
            <FontAwesomeIcon icon={faTicket} /> Coupon Discount ({discount}%):
          </span>
          <span>- ₹{couponDiscountAmount.toFixed(2)}</span>
        </div>

        <hr />

        <div className="row final">
          <span>Final Amount</span>
          <span>₹{finalAmount.toFixed(2)}</span>
        </div>

        <hr />

        {/* DISCOUNT BUTTONS */}

        <div className="discount-buttons">
          <button onClick={() => setDiscountPer(10)}>10%</button>
          <button onClick={() => setDiscountPer(20)}>20%</button>
          <button onClick={() => setDiscountPer(30)}>30%</button>
        </div>

        {/* COUPON */}

        <div className="coupon-box">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />

          <button onClick={() => dispatch(applyCoupon(couponInput))}>
            Apply
          </button>
        </div>

        {message && <p className="coupon-msg">{message}</p>}

        {/* EMAIL */}

        <div className="email-row">
          <span>Email for confirmation</span>

          <span
            className="show-toggle"
            onClick={() => setShowEmail(!showEmail)}
          >
            {showEmail ? "Hide" : "Show"}
          </span>
        </div>

        {showEmail && (
          <input
            type="email"
            className="email-input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        {/* CHECKOUT BUTTON */}

        <button
          className="checkout"
          onClick={() => {
            setCheckOut(true);
            handleCheckOut();
          }}
        >
          Place Order
        </button>

        {/* PAYMENT METHODS */}

        {checkOut && (
          <>
            <h3 className="method-title">Select Payment Method</h3>

            <div className="payment-section">
              <button className="qrcode" onClick={() => setPayment("qr")}>
                QR Code
              </button>

              <button className="card" onClick={() => setPayment("card")}>
                Card Payment
              </button>

              <button className="cash" onClick={() => setPayment("cash")}>
                Cash On Delivery
              </button>
            </div>
          </>
        )}

        {/* QR PAYMENT */}

        {payment === "qr" && (
          <div className="qr-box">
            <QRCode
              value={`upi://pay?pa=kumudkamdi@ybl&pn=SwaVish&am=${finalAmount}&cu=INR`}
              size={180}
            />
          </div>
        )}

        {/* CARD PAYMENT */}

        {payment === "card" && (
          <div className="card-box">

            <h4>Enter Card Details</h4>

            <input type="text" placeholder="Card Holder Name" />

            <input type="text" placeholder="Card Number" />

            <div className="card-row">
              <input type="text" placeholder="MM/YY" />
              <input type="text" placeholder="CVV" />
            </div>

            <button className="pay-btn">
              Pay ₹{finalAmount.toFixed(2)}
            </button>

          </div>
        )}

        {/* CASH */}

        {payment === "cash" && (
          <div className="cash-box">
            <h4>You have selected Cash on Delivery.</h4>

            <p>
              Please be ready with <b>₹{finalAmount.toFixed(2)}</b> at the time
              of delivery.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Payment;