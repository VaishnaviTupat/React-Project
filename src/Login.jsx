import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";

function Login() {
const { register, handleSubmit, reset } = useForm();
const navigate = useNavigate();

const submitLogin = (data) => {
const users = JSON.parse(localStorage.getItem("users")) || [];


const validUser = users.find(
  (user) =>
    user.email === data.email &&
    user.password === data.password
);

if (validUser) {
  alert("Login Successful");
  localStorage.setItem("currentUser", JSON.stringify(validUser));
  navigate("/");
  window.location.reload();
} else {
  alert("Invalid Email or Password");
}

reset();

};

return ( <div className="login-container">

  <div className="login-box">

    {/* LEFT PANEL */}
    <div className="login-left">
      <h2>Welcome to SwaVish 🍽️</h2>
      <p>Delicious food delivered to your door</p>
    </div>

    {/* RIGHT PANEL */}
    <div className="login-right">

      <h2>Login</h2>
      <p className="subtitle">
        Don't have an account?{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </p>

      <form onSubmit={handleSubmit(submitLogin)}>

        <input
          type="email"
          placeholder="Email Address"
          {...register("email", { required: true })}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <button type="submit">Login</button>

      </form>

    </div>

  </div>

</div>

);
}

export default Login;
