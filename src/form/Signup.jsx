import React, { useEffect } from 'react'
import '../css/signup.css'
import { set, useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Signup = ({ setShowNavbar, setShowTopbar }) => {
  useEffect(() => {
    setShowNavbar(false); // Hide navbar when Login is mounted
    setShowTopbar(false); // Hide topbar when Login is mounted
    return () => {
      setShowNavbar(true);
      setShowTopbar(true);
    } // Show navbar again when Login unmounts
  }, []);

  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: { role_id: '' } })

  const role = watch('role_id');
  const isJournalist = role === '67cf072ccbd63e6e033ef9e4';
  const isCitizen = role === '67d12b0041ced2ad826813d1';

  const sign_data = async (data) => {
    console.log(data)

    const res = await axios.post("http://127.0.0.1:8000/user/", data);
    console.log(res); //axios
    console.log(res.data); //api response
    if (res.status === 200) {
      alert("Signup success");
      navigate("/login") // check in app.j slogin...
    } else {
      alert("Signup failed");
    }
  }

  const validationRules = {
    firstName: { required: "First Name is required", minLength: { value: 3, message: "Minimum 3 characters" }, maxLength: { value: 50, message: "Maximum 50 characters" } },
    lastName: { required: "Last Name is required", minLength: { value: 3, message: "Minimum 3 characters" }, maxLength: { value: 50, message: "Maximum 50 characters" } },
    email: { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } },
    // pressId: { required: "Press ID is required", minLength: { value: 5, message: "Minimum 5 characters" }, maxLength: { value: 20, message: "Maximum 20 characters" } },
    // organization: { required: "Organization is required" },
    role: { required: "Role is required" },
    password: {
      required: "Password is required",
      minLength: { value: 6, message: "Minimum 6 characters" },
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        message: "Must contain at least 1 letter, 1 number, and 1 special character"
      },
      role_id: { required: 'Role is required' },
      ...(isJournalist && {
        pressId: { required: 'Press ID is required', minLength: { value: 5, message: 'Minimum 5 characters' }, maxLength: { value: 20, message: 'Maximum 20 characters' } },
        organization: { required: 'Organization is required' },
      }),
      ...(isCitizen && {
        proofId: { required: 'Proof ID is required' },
        workLink: { required: 'Work Link is required', pattern: { value: /^https?:\/\//, message: 'Must be a valid URL' } },
      }),
    }

  }

  return (
    <div className='sign-con'>

      <div className="container">

        <div className="title">Registration</div>
        <div className="content">
          {/* Registration form */}
          <form action="#" onSubmit={handleSubmit(sign_data)}>
            <div className="user-details">

              <div className="input-box">
                <span className="details">First Name</span>
                <input type="text" placeholder="Enter your Firstname" {...register("firstName", validationRules.firstName)} />
                {errors.firstName && <p className='error_mes'>*{errors.firstName.message}</p>}
              </div>

              <div className="input-box">
                <span className="details">Last Name</span>
                <input type="text" placeholder="Enter your Lastname" {...register("lastName", validationRules.lastName)} />
                {errors.lastName && <p className='error_mes'>*{errors.lastName.message}</p>}
              </div>

              <div className="input-box">
                <span className="details">Email</span>
                <input type="email" placeholder="Enter your email" {...register("email", validationRules.email)} />
                {errors.email && <p className='error_mes'>*{errors.email.message}</p>}
              </div>

              <div className="input-box">
                <span className="details">Password</span>
                <input type="password" placeholder="Enter your password" {...register("password", validationRules.password)} />
                {errors.password && <p className='error_mes'>*{errors.password.message}</p>}
              </div>

              {isJournalist &&
                <>
                  <div className="input-box">
                    <span className="details">Press ID</span>
                    <input type="text" placeholder="Enter your PressID" {...register("pressId", validationRules.pressId)} />
                    {errors.pressId && <p className='error_mes'>*{errors.pressId.message}</p>}
                  </div>

                  <div className="input-box">
                    <span className="details">Oragnization Name</span>
                    <input type="text" placeholder="Enter your Org Name"  {...register("organization", validationRules.organization)} />
                    {errors.organization && <p className='error_mes'>*{errors.organization.message}</p>}
                  </div>
                </>
              }

              {isCitizen && (
                <>
                  <div className="input-box">
                    <span className="details">Proof ID</span>
                    <input placeholder="Provide proof document link" {...register('proofId', validationRules.proofId)} />
                    {errors.proofId && <p className="error_mes">* {errors.proofId.message}</p>}
                  </div>
                  <div className="input-box">
                    <span className="details">Work Link</span>
                    <input placeholder="Link to sample work" {...register('workLink', validationRules.workLink)} />
                    {errors.workLink && <p className="error_mes">* {errors.workLink.message}</p>}
                  </div>
                </>
              )}

            </div>
            <div className="gender-details">
              {/* Radio buttons for gender selection */}
              <input type="radio" name="role_id" id="dot-1" {...register("role_id", validationRules.role)} value="67cf074ecbd63e6e033ef9e6" />
              <input type="radio" name="role_id" id="dot-2" {...register("role_id", validationRules.role)} value="67cf072ccbd63e6e033ef9e4" />
              <input type="radio" name="role_id" id="dot-3" {...register("role_id", validationRules.role)} value="67d12b0041ced2ad826813d1" />
              <span className="gender-title">Role</span>
              <div className="category">
                {/* Label for Male */}
                <label htmlFor="dot-1">
                  <span className="dot one" />
                  <span className="gender">Reader</span>
                </label>
                {/* Label for Female */}
                <label htmlFor="dot-2">
                  <span className="dot two" />
                  <span className="gender">Journalist</span>
                </label>
                {/* Label for Prefer not to say */}
                <label htmlFor="dot-3">
                  <span className="dot three" />
                  <span className="gender">Citizen Reporter</span>
                </label>
              </div>
              {errors.role && <p className='error_mes'>*{errors.role.message}</p>}
            </div>
            {/* Submit button */}
            <div className="button">
              <input type="submit" defaultValue="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}
