import React from 'react';

export const TermCond = () => {
    return (
        <>
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="container">
                    <nav className="breadcrumb bg-transparent m-0 p-0">
                        <a className="breadcrumb-item" href="#">
                            Home
                        </a>
                        <span className="breadcrumb-item active">Terms and Conditions</span>
                    </nav>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Terms and Conditions Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="bg-light py-2 px-4 mb-3">
                        <h3 className="m-0">Terms and Conditions</h3>
                    </div>
                    <div className="row">
                        {/* Left Side Info */}
                        <div className="col-md-5">
                            <div className="bg-light mb-3" style={{ padding: 30 }}>
                                <h6 className="font-weight-bold">Welcome to StateBuzz</h6>
                                <p>
                                    By accessing and using StateBuzz (www.statebuzz.com), operated by SAL College of Engineering, you agree to comply with these Terms and Conditions. Please read them carefully.
                                </p>

                                <h6 className="font-weight-bold">Citizen Journalism</h6>
                                <p>
                                    Users can submit news articles and local stories. All submissions must be accurate and respectful. We reserve the right to edit or remove any content without notice.
                                </p>

                                <div className="d-flex align-items-center mb-3">
                                    <i className="fa fa-2x fa-map-marker-alt text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Office Address</h6>
                                        <p className="m-0">SAL College of Engineering, Ahmedabad, India</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <i className="fa fa-2x fa-envelope-open text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Email Us</h6>
                                        <p className="m-0">info@statebuzz.com</p>
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

                        {/* Right Side Terms */}
                        <div className="col-md-7">
                            <div className="contact-form bg-light mb-3" style={{ padding: 30 }}>
                                <h5 className="font-weight-bold mb-3">Use of Our Website</h5>
                                <p>
                                    You agree not to misuse our website. Unlawful activities, spreading false information, or harming others' rights are strictly prohibited.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">Intellectual Property</h5>
                                <p>
                                    All content on StateBuzz, including articles, images, logos, and designs, is our property or licensed to us. You may not copy or reuse our content without permission.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">User Content</h5>
                                <p>
                                    By submitting articles or comments, you grant us the right to display and promote your content. You must not post anything illegal, offensive, or plagiarized.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">Disclaimer</h5>
                                <p>
                                    While we aim to provide accurate news, we do not guarantee the accuracy, completeness, or reliability of any information published. Users are responsible for verifying news before relying on it.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">Governing Law</h5>
                                <p>
                                    These Terms are governed by the laws of India. Any disputes shall be handled in the courts of Ahmedabad, Gujarat.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">Changes to Terms</h5>
                                <p>
                                    We may update these Terms and Conditions from time to time. Continued use of StateBuzz means you accept the updated Terms.
                                </p>

                                {/* <h5 className="font-weight-bold mt-4 mb-3">Contact Information</h5>
                                <p>
                                    If you have any questions about these Terms and Conditions, please contact us at info@statebuzz.com.
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Terms and Conditions End */}
        </>
    );
};
