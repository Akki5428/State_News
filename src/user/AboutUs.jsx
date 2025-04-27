import React from 'react';

export const AboutUs = () => {
    return (
        <>
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="container">
                    <nav className="breadcrumb bg-transparent m-0 p-0">
                        <a className="breadcrumb-item" href="#">
                            Home
                        </a>
                        <span className="breadcrumb-item active">About Us</span>
                    </nav>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* About Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="bg-light py-2 px-4 mb-3">
                        <h3 className="m-0">About Our News Platform</h3>
                    </div>
                    <div className="row">
                        {/* Left Side Content */}
                        <div className="col-md-6">
                            <div className="bg-light mb-3" style={{ padding: 30 }}>
                                <h6 className="font-weight-bold">Who We Are</h6>
                                <p>
                                    We are a trusted news platform delivering the latest and most accurate local, state, and city news. Our mission is to keep communities informed, engaged, and empowered through credible journalism.
                                </p>

                                <h6 className="font-weight-bold mt-4">Become a Citizen Journalist</h6>
                                <p>
                                    Passionate about your city or state? You can now contribute news stories and reports by becoming a Citizen Journalist. Share important events, local happenings, and impactful stories — your voice matters!
                                </p>

                                <h6 className="font-weight-bold mt-4">What We Offer</h6>
                                <ul>
                                    <li>Breaking News by City and State</li>
                                    <li>Category-wise News (Politics, Sports, Entertainment, etc.)</li>
                                    <li>Comment and discuss directly on news articles</li>
                                    <li>Opportunities to report as a citizen journalist</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Side Info */}
                        <div className="col-md-6">
                            <div className="bg-light mb-3" style={{ padding: 30 }}>
                                <h6 className="font-weight-bold">Why Choose Us?</h6>
                                <p>
                                    We are committed to promoting transparency, freedom of speech, and grassroots journalism. Our platform empowers the public to both consume and create news content.
                                </p>

                                <div className="d-flex align-items-center mb-3">
                                    <i className="fa fa-2x fa-bullhorn text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Your Voice Matters</h6>
                                        <p className="m-0">Join the movement and be heard.</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center mb-3">
                                    <i className="fa fa-2x fa-newspaper text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Stay Updated</h6>
                                        <p className="m-0">Daily updates on local, national, and global news.</p>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <i className="fa fa-2x fa-comments text-primary mr-3" />
                                    <div className="d-flex flex-column">
                                        <h6 className="font-weight-bold">Engage and Interact</h6>
                                        <p className="m-0">Comment and share your opinion freely.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
        </>
    );
};
