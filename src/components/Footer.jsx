import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
    return (
        <>
            {/* Footer Start */}
            <div className="container-fluid bg-light pt-5 px-sm-3 px-md-5">
                <div className="row">
                    <div className="col-lg-3 col-md-6 mb-5">
                        <a href="index.html" className="navbar-brand">
                            <h1 className="mb-2 mt-n2 display-5 text-uppercase">
                                <span className="text-primary">State</span>Buzz
                            </h1>
                        </a>
                        <p>
                        Stay informed with the latest headlines, breaking stories, and real-time local updates from across the nation.
    
                        </p>
                        <div className="d-flex justify-content-start mt-4">
                            <a
                                className="btn btn-outline-secondary text-center mr-2 px-0"
                                style={{ width: 38, height: 38 }}
                                href="#"
                            >
                                <i className="fab fa-twitter" />
                            </a>
                            <a
                                className="btn btn-outline-secondary text-center mr-2 px-0"
                                style={{ width: 38, height: 38 }}
                                href="#"
                            >
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a
                                className="btn btn-outline-secondary text-center mr-2 px-0"
                                style={{ width: 38, height: 38 }}
                                href="#"
                            >
                                <i className="fab fa-linkedin-in" />
                            </a>
                            <a
                                className="btn btn-outline-secondary text-center mr-2 px-0"
                                style={{ width: 38, height: 38 }}
                                href="#"
                            >
                                <i className="fab fa-instagram" />
                            </a>
                            <a
                                className="btn btn-outline-secondary text-center mr-2 px-0"
                                style={{ width: 38, height: 38 }}
                                href="#"
                            >
                                <i className="fab fa-youtube" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="font-weight-bold mb-4">Categories</h4>
                        <div className="d-flex flex-wrap m-n1">
                            <Link to="/category/Politics" className="btn btn-sm btn-outline-secondary m-1">
                                Politics
                            </Link>
                            <Link to="/category/Sports" className="btn btn-sm btn-outline-secondary m-1">
                                Sports
                            </Link>
                            <Link to="/category/Entertainment" className="btn btn-sm btn-outline-secondary m-1">
                                Entertainment
                            </Link>
                            <Link to="/category/Lifestyle" className="btn btn-sm btn-outline-secondary m-1">
                                Lifestyle
                            </Link>
                            <Link to="/category/Technology" className="btn btn-sm btn-outline-secondary m-1">
                                Technology
                            </Link>
                            <Link to="/category/Business" className="btn btn-sm btn-outline-secondary m-1">
                                Business
                            </Link>
                            <Link to="/category/Health" className="btn btn-sm btn-outline-secondary m-1">
                                Health
                            </Link>
                            <Link to="/category/Science" className="btn btn-sm btn-outline-secondary m-1">
                                Science
                            </Link>
                            <Link to="/category/Education" className="btn btn-sm btn-outline-secondary m-1">
                                Education
                            </Link>
                            <Link to="/category/World" className="btn btn-sm btn-outline-secondary m-1">
                                World
                            </Link>
                            <Link to="/category/Food" className="btn btn-sm btn-outline-secondary m-1">
                                Food
                            </Link>
                            <Link to="/category/Finance" className="btn btn-sm btn-outline-secondary m-1">
                                Finance
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="font-weight-bold mb-4">States</h4>
                        <div className="d-flex flex-wrap m-n1">
                            <Link to="/state/state/Delhi" className="btn btn-sm btn-outline-secondary m-1">
                                Delhi
                            </Link>
                            <Link to="/state/state/Maharashtra" className="btn btn-sm btn-outline-secondary m-1">
                                Maharashtra
                            </Link>
                            <Link to="/state/state/TamilNadu" className="btn btn-sm btn-outline-secondary m-1">
                                Tamil Nadu
                            </Link>
                            <Link to="/state/state/Karnataka" className="btn btn-sm btn-outline-secondary m-1">
                                Karnataka
                            </Link>
                            <Link to="/state/state/WestBengal" className="btn btn-sm btn-outline-secondary m-1">
                                West Bengal
                            </Link>
                            <Link to="/state/state/UttarPradesh" className="btn btn-sm btn-outline-secondary m-1">
                                Uttar Pradesh
                            </Link>
                            <Link to="/state/state/Gujarat" className="btn btn-sm btn-outline-secondary m-1">
                                Gujarat
                            </Link>
                            <Link to="/state/state/Rajasthan" className="btn btn-sm btn-outline-secondary m-1">
                                Rajasthan
                            </Link>
                            <Link to="/state/state/Bihar" className="btn btn-sm btn-outline-secondary m-1">
                                Bihar
                            </Link>
                            <Link to="/state/state/Punjab" className="btn btn-sm btn-outline-secondary m-1">
                                Punjab
                            </Link>
                        </div>

                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="font-weight-bold mb-4">Quick Links</h4>
                        <div className="d-flex flex-column justify-content-start">
                            <a className="text-secondary mb-2" href="#">
                                <i className="fa fa-angle-right text-dark mr-2" />
                                About
                            </a>
                            <a className="text-secondary mb-2" href="#">
                                <i className="fa fa-angle-right text-dark mr-2" />
                                Advertise
                            </a>
                            <a className="text-secondary mb-2" href="#">
                                <i className="fa fa-angle-right text-dark mr-2" />
                                Privacy &amp; policy
                            </a>
                            <a className="text-secondary mb-2" href="#">
                                <i className="fa fa-angle-right text-dark mr-2" />
                                Terms &amp; conditions
                            </a>
                            {/* <a className="text-secondary" href="#">
                                <i className="fa fa-angle-right text-dark mr-2" />
                                Contact
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-4 px-sm-3 px-md-5">
                <p className="m-0 text-center">
                    ©{" "}
                    <a className="font-weight-bold" href="#">
                        StateBuzz : Your Local News Hub  &nbsp;
                    </a>
                    <span className="mb-0"> 
                    🗞️ Designed & Developed by <strong>StateBuzz Team</strong>
    </span>
                </p>
            </div>
            {/* Footer End */}
        </>

    )
}
