import React, { useEffect } from 'react'
import '../css/login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const Login = ({ setShowNavbar , setShowTopbar,setShowAjTopbar}) => {
  useEffect(() => {
    setShowNavbar(false); // Hide navbar when Login is mounted
    setShowTopbar(false); // Hide topbar when Login is mounted
    setShowAjTopbar(false); // Hide AjTopbar when Login is mounted
    return () => 
      {setShowNavbar(true)
      setShowTopbar(true)
      }; // Show navbar again when Login unmounts
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()

  const login_data = async (data) => {
    console.log(data)

    const res = await axios.post("http://127.0.0.1:8000/user/login/", data);
    console.log(res.data.user._id); 
    console.log(res.data); 
    if(res.status === 200){
        
        localStorage.setItem('userId', res.data.user._id); // Store the user ID in local storage
        localStorage.setItem('name', res.data.user.firstName); // Store the token in local storage
        localStorage.setItem('role', res.data.user.role.role)
        localStorage.setItem('status', res.data.user.status)
        if(res.data.user.role.role === "admin"){
          navigate('/admindash')
        }
        else if(res.data.user.role.role === "journalist" || res.data.user.role.role === "citizen_journalist"){
          navigate('/journalistdash')
        }
        else {navigate('/home')}

    }
  }

  const validationRules = {
    email: { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } },
    password: {
      required: "Password is required",
      minLength: { value: 6, message: "Minimum 6 characters" },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message: "Must contain at least 1 letter, 1 number, and 1 special character"
      }
    }

  }

  return (
    <>
      <div className='login-con'>
        <div className="container">

          <div className="title">Login</div>
          <div className="content">
            {/* Registration form */}
            <form action="#" onSubmit={handleSubmit(login_data)}>
              <div className="user-details">

                {/* Input for Email */}
                <div className="input-box">
                  <span className="details">Email</span>
                  <input type="text" placeholder="Enter your email" {...register('email',validationRules.email)}/>
                  {errors.email && <p className='error_mes'>*{errors.email.message}</p>}
                </div>

                {/* Input for Password */}
                <div className="input-box">
                  <span className="details">Password</span>
                  <input type="password" placeholder="Enter your password" {...register('password',validationRules.password)}/>
                  {errors.password && <p className='error_mes'>*{errors.password.message}</p>}

                </div>
                <div className='dont_txt'>
                  <span >Dont have Account? </span>
                  <Link to="/signup">Signup</Link>
                </div>

                {/* Submit button */}
                <div className="button">
                  <input type="submit" defaultValue="Login" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}
