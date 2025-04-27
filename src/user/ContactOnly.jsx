import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Loader } from '../components/Loader';

export const ContactOnly = () => {
    const { register, handleSubmit, formState: { errors },reset } = useForm();
    const [loading, setLoading] = useState(false);

    const submitData = async (data) => {
        setLoading(true)
        console.log('Submitted Data:', data);
        try {
            const query = await axios.post(`http://127.0.0.1:8000/query`, data)
            // alert("Data Submitted")
            toast.success("Data Submitted")
            reset()
        }
        catch (error) {
            console.error("Error fetching Data:", error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                {loading && <Loader/>}
                <div className="container">
                    <nav className="breadcrumb bg-transparent m-0 p-0">
                        <a className="breadcrumb-item" href="#">
                            Home
                        </a>
                        <span className="breadcrumb-item active">Contact Us</span>
                    </nav>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Contact Us Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="bg-light py-2 px-4 mb-3">
                        <h3 className="m-0">Get in Touch</h3>
                    </div>
                    <div className="row">
                        {/* Left Side Info */}
                        <div className="col-md-5">
                            <div className="bg-light mb-3" style={{ padding: 30 }}>
                                <h6 className="font-weight-bold">Connect with StateBuzz</h6>
                                <p>
                                    Whether you have news tips, feedback, or general inquiries, we would love to hear from you. Feel free to reach out through any of the following ways:
                                </p>

                                <div className="d-flex align-items-center mb-3">
                                    <i className="fa fa-2x fa-map-marker-alt text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Our Location</h6>
                                        <p className="m-0">SAL College of Engineering, Ahmedabad, India</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <i className="fa fa-2x fa-envelope-open text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Email Us</h6>
                                        <p className="m-0">contact@statebuzz.com</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <i className="fas fa-2x fa-phone-alt text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Call Us</h6>
                                        <p className="m-0">+91 98765 43210</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Contact Form */}
                        <div className="col-md-7">
                            <div className="contact-form bg-light mb-3" style={{ padding: 30 }}>
                                <form name="contactForm" id="contactForm" noValidate="novalidate" onSubmit={handleSubmit(submitData)}>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="control-group mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    {...register('name', { required: 'Name is required' })}
                                                />
                                                {errors.name && <small className="text-danger">{errors.name.message}</small>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="control-group mb-2">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Your Email"
                                                    {...register('email', { required: 'Email is required' })}
                                                />
                                                {errors.email && <small className="text-danger">{errors.email.message}</small>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="control-group mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            placeholder="Subject"
                                            {...register('subject', { required: 'Subject is required' })}
                                        />
                                        {errors.subject && <small className="text-danger">{errors.subject.message}</small>}
                                    </div>

                                    <div className="control-group mb-2">
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            id="message"
                                            placeholder="Message"
                                            {...register('message', { required: 'Message is required' })}
                                        />
                                        {errors.message && <small className="text-danger">{errors.message.message}</small>}
                                    </div>

                                    <div>
                                        <button
                                            className="btn btn-primary font-weight-semi-bold px-4"
                                            style={{ height: 50 }}
                                            type="submit"
                                            id="sendMessageButton"
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Contact Us End */}
        </>
    );
};
