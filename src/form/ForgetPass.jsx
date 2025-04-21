import React, { useEffect } from 'react';
import '../css/login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const ForgetPass = ({ setShowNavbar , setShowTopbar,setShowAjTopbar}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

   useEffect(() => {
      setShowNavbar(false); // Hide navbar when Login is mounted
      setShowTopbar(false); // Hide topbar when Login is mounted
      setShowAjTopbar(false); // Hide AjTopbar when Login is mounted
      return () => 
        {setShowNavbar(true)
        setShowTopbar(true)
        }; // Show navbar again when Login unmounts
    }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`http://127.0.0.1:8000/user/forget/${data.email}`);
      console.log(res.data.email);
      alert("Password reset link sent to your email.");
    } catch (error) {
      console.error(error);
      alert("Error sending reset link. Please try again.");
    }

  };

  const validationRules = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    },
  };

  return (
    <div className="login-con">
      <div className="container">
        <div className="title">Forget Password</div>
        <div className="content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="text"
                  placeholder="Enter your email"
                  {...register('email', validationRules.email)}
                />
                {errors.email && <p className="error_mes">*{errors.email.message}</p>}
              </div>
              <div className="button">
                <input type="submit" value="Send Reset Link" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
