import React from 'react'
import { Link } from 'react-router-dom'
import "../css/dropdown.css"

export const Navbar = () => {
    return (
        <>
            <div className="container-fluid p-0 mb-3">
                <nav className="navbar navbar-expand-lg bg-light navbar-light py-2 py-lg-0 px-lg-5">
                    <a href="" className="navbar-brand d-block d-lg-none">
                        <h1 className="m-0 display-5 text-uppercase">
                            <span className="text-primary">State</span>Buzz
                        </h1>
                    </a>
                    <button
                        type="button"
                        className="navbar-toggler"
                        data-toggle="collapse"
                        data-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-between px-0 px-lg-3"
                        id="navbarCollapse"
                    >
                        <div className="navbar-nav mr-auto py-0">
                            <a href="/" className="nav-item nav-link active">
                                Home
                            </a>
                            {/* Category */}
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                    Categories
                                </a>
                                <div className="dropdown-menu rounded-0 m-0 p-3" style={{ minWidth: 600 }}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <a href="index.html" className="dropdown-item">
                                                Politics
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Business
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Technology
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Health
                                            </a>
                                        </div>
                                        <div className="col-md-3">
                                            <a href="#" className="dropdown-item">
                                                Sports
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Entertainment
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Science
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                World
                                            </a>
                                        </div>
                                        <div className="col-md-3">
                                            <a href="#" className="dropdown-item">
                                                Lifestyle
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Education
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Environment
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Travel
                                            </a>
                                        </div>
                                        <div className="col-md-3">
                                            <a href="#" className="dropdown-item">
                                                Food
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Fashion
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Finance
                                            </a>
                                            <a href="#" className="dropdown-item">
                                                Culture
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* State-City Mega Dropdown */}
                            <div className="nav-item dropdown" id="navbarNav">
                                <ul className="navbar-nav">
                                    {/* State-City Mega Dropdown */}
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href="#"
                                            id="stateCityDropdown"
                                            data-toggle="dropdown"
                                        >
                                            State &amp; City
                                        </a>
                                        <div
                                            className="dropdown-menu rounded-0 m-0 p-3"
                                            style={{ minWidth: 600, maxHeight: 400, overflowY: "auto" }}
                                        >
                                            {/* Search Bar */}
                                            <input
                                                type="text"
                                                className="form-control mb-2"
                                                id="searchStateCity"
                                                placeholder="Search State or City..."
                                            />
                                            <div className="row">
                                                {/* Column 1 */}
                                                <div className="col-md-3">
                                                    <a href="#" className="dropdown-header">
                                                        Gujarat
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Ahmedabad
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Surat
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Vadodara
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Rajkot
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Bhavnagar
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Jamnagar
                                                    </a>
                                                </div>
                                                {/* Column 2 */}
                                                <div className="col-md-3">
                                                    <a href="#" className="dropdown-header">
                                                        Maharashtra
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Mumbai
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Pune
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Nagpur
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Nashik
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Aurangabad
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Thane
                                                    </a>
                                                </div>
                                                {/* Column 3 */}
                                                <div className="col-md-3">
                                                    <a href="#" className="dropdown-header">
                                                        Rajasthan
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Jaipur
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Jodhpur
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Udaipur
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Kota
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Bikaner
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        Ajmer
                                                    </a>
                                                </div>
                                                {/* Column 4 */}
                                                <div className="col-md-3">
                                                    <a href="#" className="dropdown-header">
                                                        Delhi
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        New Delhi
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        South Delhi
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        North Delhi
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        East Delhi
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        West Delhi
                                                    </a>
                                                </div>
                                                <div className="col-md-3">
                                                    <a href="#" className="dropdown-header">
                                                        Delhi
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        New Delhi
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        South Delhi
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        North Delhi
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        East Delhi
                                                    </a>
                                                    <a className="dropdown-item" href="#">
                                                        West Delhi
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <Link to='/contact' className="nav-item nav-link">
                                Contact
                            </Link>
                        </div>
                        <div
                            className="input-group ml-auto"
                            style={{ width: "100%", maxWidth: 300 }}
                        >
                            <input type="text" className="form-control" placeholder="Keyword" />
                            <div className="input-group-append">
                                <button className="input-group-text text-secondary">
                                    <i className="fa fa-search" />
                                </button>
                            </div>
                            <div className="input-group-append">
                                <Link to='/login'>
                                    <button
                                        className="input-group-text text-secondary"
                                        style={{ marginLeft: 10 }}
                                    >
                                        <i className="fa fa-user" />
                                        Login
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            {/* Navbar End */}
        </>

    )
}
