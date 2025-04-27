import React from 'react';

export const Privacy = () => {
    return (
        <>
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="container">
                    <nav className="breadcrumb bg-transparent m-0 p-0">
                        <a className="breadcrumb-item" href="#">
                            Home
                        </a>
                        <span className="breadcrumb-item active">Privacy Policy</span>
                    </nav>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* Privacy Policy Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="bg-light py-2 px-4 mb-3">
                        <h3 className="m-0">Privacy Policy</h3>
                    </div>
                    <div className="row">
                        {/* Left Side Info */}
                        <div className="col-md-5">
                            <div className="bg-light mb-3" style={{ padding: 30 }}>
                                <h6 className="font-weight-bold">Your Privacy Matters to Us</h6>
                                <p>
                                    At StateBuzz, operated by SAL College of Engineering, we are committed to protecting your personal information and your right to privacy.
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
                                        <p className="m-0">privacy@statebuzz.com</p>
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

                        {/* Right Side Policy Details */}
                        <div className="col-md-7">
                            <div className="contact-form bg-light mb-3" style={{ padding: 30 }}>
                                <h5 className="font-weight-bold mb-3">Information We Collect</h5>
                                <p>
                                    We collect information you voluntarily provide to us when you submit news articles, comments, inquiries, or subscribe to our updates. This may include your name, email address, and content you share.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">How We Use Your Information</h5>
                                <p>
                                    We use your information to manage user accounts, communicate with you, improve our website experience, and feature user-submitted content like citizen journalism articles.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">Sharing Your Information</h5>
                                <p>
                                    We do not sell or rent your personal data to third parties. However, we may share information with service providers who assist us in running the website.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">Cookies and Tracking</h5>
                                <p>
                                    We may use cookies and similar technologies to enhance your browsing experience. You can adjust your browser settings to refuse cookies if you prefer.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">Your Rights</h5>
                                <p>
                                    You have the right to access, update, or delete your personal information at any time. Please contact us at privacy@statebuzz.com for any privacy-related concerns.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">Data Security</h5>
                                <p>
                                    We use appropriate security measures to protect your information, but please understand that no method of transmission over the Internet is 100% secure.
                                </p>

                                <h5 className="font-weight-bold mt-4 mb-3">Changes to This Policy</h5>
                                <p>
                                    We may update our Privacy Policy occasionally. We encourage users to review this page regularly for any changes.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Privacy Policy End */}
        </>
    );
};
