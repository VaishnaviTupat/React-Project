import React from 'react'
import { useForm } from 'react-hook-form';
import "./Register.css";
import { useNavigate } from 'react-router-dom';

function Register(){

  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  let submitLogics = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(data); 

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration Successful");
    navigate("/login");
     reset();   // clear form after submit
  }

  return (
  <div className="register-page">
    <form className="register-form" onSubmit={handleSubmit(submitLogics)}>

      <h3>Registration Form</h3>

      <input 
        type="text" 
        placeholder="Full Name"
        {...register("name",{required:true})}
      />

      <input 
        type="password" 
        placeholder="Password"
        {...register("password",{required:true})}
      />

      <input 
        type="email" 
        placeholder="Email Address"
        {...register("email",{required:true})}
      />

      <input 
        type="text" 
        placeholder="Mobile Number"
        {...register("mobno",{required:true})}
      />

      <button type="submit">Submit</button>

      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>

    </form>
  </div>
);
}

export default Register;