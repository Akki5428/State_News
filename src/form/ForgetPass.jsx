import React, { useEffect, useState } from 'react';
import '../css/login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader } from '../components/Loader';

export const ForgetPass = ({ setShowNavbar , setShowTopbar,setShowAjTopbar}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      const res = await axios.post(`http://127.0.0.1:8000/user/forget/${data.email}`);
      console.log(res.data.email);
      // alert("Password reset link sent to your email.");
      toast.success("Password reset link sent to your email.")
    } catch (error) {
      console.error(error);
      // alert("Error sending reset link. Please try again.");
      if(error.response.status === 404) {
        toast.error(error.response.data.detail);
      }
      else{
        toast.error("Error sending reset link. Please try again.");
      }
      
    }finally {
      setIsLoading(false);
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
    {isLoading && <Loader />}
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
