import React from 'react'

export const Contact = () => {
    return (
        <>
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="container">
                    <nav className="breadcrumb bg-transparent m-0 p-0">
                        <a className="breadcrumb-item" href="#">
                            Home
                        </a>
                        <span className="breadcrumb-item active">Contact</span>
                    </nav>
                </div>
            </div>
            {/* Breadcrumb End */}
            {/* Contact Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="bg-light py-2 px-4 mb-3">
                        <h3 className="m-0">Contact Us For Any Queries</h3>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="bg-light mb-3" style={{ padding: 30 }}>
                                <h6 className="font-weight-bold">Get in touch</h6>
                                <p>
                                    Labore ipsum ipsum rebum erat amet nonumy, nonumy erat justo sit
                                    dolor ipsum sed, kasd lorem sit et duo dolore justo lorem stet
                                    labore, diam dolor et diam dolor eos magna, at vero lorem elitr
                                </p>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fa fa-2x fa-map-marker-alt text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Our Office</h6>
                                        <p className="m-0">123 Street, New York, USA</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <i className="fa fa-2x fa-envelope-open text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Email Us</h6>
                                        <p className="m-0">info@example.com</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-2x fa-phone-alt text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Call Us</h6>
                                        <p className="m-0">+012 345 6789</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="contact-form bg-light mb-3" style={{ padding: 30 }}>
                                <div id="success" />
                                <form name="sentMessage" id="contactForm" noValidate="novalidate">
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="control-group">
                                                <input
                                                    type="text"
                                                    className="form-control p-4"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    required="required"
                                                    data-validation-required-message="Please enter your name"
                                                />
                                                <p className="help-block text-danger" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="control-group">
                                                <input
                                                    type="email"
                                                    className="form-control p-4"
                                                    id="email"
                                                    placeholder="Your Email"
                                                    required="required"
                                                    data-validation-required-message="Please enter your email"
                                                />
                                                <p className="help-block text-danger" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="control-group">
                                        <input
                                            type="text"
                                            className="form-control p-4"
                                            id="subject"
                                            placeholder="Subject"
                                            required="required"
                                            data-validation-required-message="Please enter a subject"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            id="message"
                                            placeholder="Message"
                                            required="required"
                                            data-validation-required-message="Please enter your message"
                                            defaultValue={""}
                                        />
                                        <p className="help-block text-danger" />
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
            {/* Contact End */}
        </>

    )
}
