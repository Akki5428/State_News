import React, { useEffect, useState } from 'react';
import '../css/login.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loader } from '../components/Loader';

export const ResetPass = ({ setShowNavbar , setShowTopbar,setShowAjTopbar}) => {
  const { token } = useParams(); // Get token from URL
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
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
      const res = await axios.post("http://127.0.0.1:8000/user/reset/", {
        token: token,
        password: data.password
      });
      console.log(res.data);
      // alert("Password has been reset successfully.");
      toast.success("Password has been reset successfully.");
      navigate('/login'); // Redirect to login page after successful reset
    } catch (error) {
      console.error(error);
      // alert("Error resetting password. Please try again.");
      toast.error("Error resetting password. Please try again.");
    }
    finally {
      setIsLoading(false);
    }

  };

  const validationRules = {
    password: {
      required: "Password is required",
      minLength: { value: 6, message: "Minimum 6 characters" },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message: "Must contain at least 1 letter, 1 number, and 1 special character",
      },
    },
  };

  return (
    
    <div className="login-con">
      {isLoading && <Loader />}
      <div className="container">
        <div className="title">Reset Password</div>
        <div className="content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">New Password</span>
                <input
                  type="password"
                  placeholder="Enter new password"
                  {...register('password', validationRules.password)}
                />
                {errors.password && <p className="error_mes">*{errors.password.message}</p>}
              </div>
              <div className="button">
                <input type="submit" value="Reset Password" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
