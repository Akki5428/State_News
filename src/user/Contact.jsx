import React from 'react'
import { useForm } from 'react-hook-form'

export const Contact = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        console.log(data) // Handle form submission
    }
    
    return (
        <>
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="container">
                    <nav className="breadcrumb bg-transparent m-0 p-0">
                        <a className="breadcrumb-item" href="#">
                            Home
                        </a>
                        <span className="breadcrumb-item active">Advertise With Us</span>
                    </nav>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Contact Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="bg-light py-2 px-4 mb-3">
                        <h3 className="m-0">Submit Your Advertisement Inquiry</h3>
                    </div>
                    <div className="row">
                        {/* Left Side Info */}
                        <div className="col-md-5">
                            <div className="bg-light mb-3" style={{ padding: 30 }}>
                                <h6 className="font-weight-bold">Partner with Our News Platform</h6>
                                <p>
                                    Promote your business or brand to a wide audience by advertising on our platform. Choose from various ad placements like homepage banners, sidebars, and article embeds. We’ll get in touch with pricing and placement options after your inquiry submission.
                                </p>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fa fa-2x fa-map-marker-alt text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Office Address</h6>
                                        <p className="m-0">SAL College, Ahmedabad, India</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fa fa-2x fa-envelope-open text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Email Us</h6>
                                        <p className="m-0">ads@yournewsportal.com</p>
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

                        {/* Right Side Form */}
                        <div className="col-md-7">
                            <div className="contact-form bg-light mb-3" style={{ padding: 30 }}>
                                <form name="adInquiryForm" id="adInquiryForm" noValidate="novalidate" onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="control-group mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fullName"
                                                    placeholder="Your Name"
                                                    required="required"
                                                    // data-validation-required-message="Please enter your name"
                                                    {...register('fullName', { required: 'Please enter your name' })}
                                                    
                                                />
                                                {/* <p className="help-block text-danger" />
                                                 */}
                                                 {errors.fullName && <p className="help-block text-danger">{errors.fullName.message}</p>}
                                        
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="control-group mb-2">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="Your Email"
                                                    required="required"
                                                    // data-validation-required-message="Please enter your email"
                                                    {...register('email', { required: 'Please enter your email' })}
                                        
                                                />
                                                {/* <p className="help-block text-danger" />
                                                 */}
                                                    {errors.email && <p className="help-block text-danger">{errors.email.message}</p>}
                                           
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="control-group mb-2">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="companyName"
                                                    placeholder="Company or Brand Name(Optional)"
                                                    required="required"
                                                    // data-validation-required-message="Please enter company name"
                                                    {...register('companyName')}

                                                />
                                                <p className="help-block text-danger" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="control-group mb-2">
                                                <select
                                                    className="form-control"
                                                    id="adType"
                                                    // required="required"
                                                    {...register('adType', { required: 'Please select an ad type' })}

                                                >
                                                    <option value="">Select Ad Type</option>
                                                    <option value="banner">Banner</option>
                                                    <option value="sidebar">Sidebar</option>
                                                    <option value="popup">Popup</option>
                                                </select>
                                                {errors.adType && <p className="help-block text-danger">{errors.adType.message}</p>}

                                                {/* <p className="help-block text-danger" /> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="control-group mb-2">
                                        <select
                                            className="form-control"
                                            id="placement"
                                            // required="required"
                                            {...register('placement', { required: 'Please select a preferred placement' })}

                                        >
                                            <option value="">Preferred Placement</option>
                                            <option value="homepage">Homepage Top</option>
                                            <option value="navbar">Navbar</option>
                                            <option value="singleNews">Single News Page</option>
                                            <option value="sidebar">Sidebar</option>
                                        </select>
                                        {errors.placement && <p className="help-block text-danger">{errors.placement.message}</p>}

                                        {/* <p className="help-block text-danger" /> */}
                                    </div>

                                    <div className="control-group mb-2" >
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="duration"
                                            placeholder="Duration (e.g., 7 days, 1 month)"
                                            // required="required"
                                            {...register('duration', { required: 'Please enter duration' })}

                                        />
                                        {errors.duration && <p className="help-block text-danger">{errors.duration.message}</p>}

                                        {/* <p className="help-block text-danger" /> */}
                                    </div>

                                    <div className="control-group mb-2" >
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            id="message"
                                            placeholder="Additional Details or Message"
                                            // required="required"
                                            defaultValue={""}
                                            {...register('message', { required: 'Please enter your message' })}

                                        />
                                        {/* <p className="help-block text-danger" /> */}
                                    </div>

                                    <div>
                                        <button
                                            className="btn btn-primary font-weight-semi-bold px-4"
                                            style={{ height: 50 }}
                                            type="submit"
                                            id="submitAdInquiry"
                                        >
                                            Submit Inquiry
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}
        </>
    )
}
