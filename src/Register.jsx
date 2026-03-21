import React from "react";
import { useForm } from "react-hook-form";
import "./Register.css";
import { useNavigate } from "react-router-dom";

function Register() {

const { register, handleSubmit, reset } = useForm();
const navigate = useNavigate();

const submitLogics = (data) => {
const users = JSON.parse(localStorage.getItem("users")) || [];
users.push(data);

localStorage.setItem("users", JSON.stringify(users));
alert("Registration Successful");
navigate("/login");
reset();


};

return ( <div className="register-container">


  <div className="register-box">

    {/* LEFT PANEL */}
    <div className="register-left">
      <h2>Join SwaVish 🍽️</h2>
      <p>Create your account & enjoy delicious meals 😋</p>
    </div>

    {/* RIGHT PANEL */}
    <div className="register-right">

      <h2>Register</h2>
      <p className="subtitle">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>

      <form onSubmit={handleSubmit(submitLogics)}>

        <input
          type="text"
          placeholder="Full Name"
          {...register("name", { required: true })}
        />

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

        <input
          type="text"
          placeholder="Mobile Number"
          {...register("mobno", { required: true })}
        />

        <button type="submit">Register</button>

      </form>

    </div>

  </div>

</div>


);
}

export default Register;
