import React from "react";
import { useSelector } from "react-redux";
import "./Order.css";
import { useNavigate } from "react-router-dom";

function Order() {

  const orders = useSelector((state) => state.orders.slice(-1));
  const navigate = useNavigate();

  if (!orders || orders.length === 0) {
    return (
      <div className="order-page">
        <h2>No Orders Found</h2>
        <button className="order-btn" onClick={() => navigate("/profile")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="order-page">

      <h1 className="order-title">Your Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="order-card">

          <div className="order-header">
            <h3>Order ID: {order.id}</h3>
            <span className="order-date">{order.date}</span>
          </div>

          <p className="order-email">
            Email: <b>{order.email}</b>
          </p>

          <table className="order-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Item</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>

                  {/* ITEM IMAGE */}
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-img"
                    />
                  </td>

                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>

                </tr>
              ))}
            </tbody>
          </table>

          <div className="order-footer">
            <h2>Total Paid: ₹{Number(order.total || 0).toFixed(2)}</h2>
          </div>

        </div>
      ))}

      <div className="order-buttons">
        <button onClick={() => navigate("/profile")}>CheckOut</button>
      </div>

    </div>
  );
}

export default Order;