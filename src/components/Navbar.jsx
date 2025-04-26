import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../css/dropdown.css"
import axios from 'axios';

export const Navbar = ({ login }) => {

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [groupedCities, setGroupedCities] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const stateRes = await axios.get('http://127.0.0.1:8000/getStates'); // Adjust endpoint
                const cityRes = await axios.get('http://127.0.0.1:8000/city');  // Adjust endpoint
                setStates(stateRes.data);
                setCities(cityRes.data);
                console.log(cityRes.data)

                // Group cities by stateId
                const grouped = {};
                cityRes.data.forEach(city => {
                    if (!grouped[city.state_id]) {
                        grouped[city.state_id] = [];
                    }
                    grouped[city.state_id].push(city);
                });
                setGroupedCities(grouped);
            } catch (error) {
                console.error('Failed to fetch states or cities:', error);
            }

        };

        fetchData();
    }, []);

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
                            <Link to="/" className="nav-item nav-link">
                                Home
                            </Link>
                            {/* Category */}
                            <div className="nav-item dropdown">
                                <Link to="/categories" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                    Categories
                                </Link>
                                <div className="dropdown-menu rounded-0 m-0 p-3" style={{ minWidth: 600 }}>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <Link to="/category/Politics" className="dropdown-item">
                                                Politics
                                            </Link>
                                            <Link className="dropdown-item">
                                                Business
                                            </Link>
                                            <Link to="/category/Technology" className="dropdown-item">
                                                Technology
                                            </Link>
                                            <Link to="/category/Health" className="dropdown-item">
                                                Health
                                            </Link>
                                        </div>
                                        <div className="col-md-3">
                                            <Link to="/category/Sports" className="dropdown-item">
                                                Sports
                                            </Link>
                                            <Link to="/category/Entertainment" className="dropdown-item">
                                                Entertainment
                                            </Link>
                                            <Link to="/category/Sports" className="dropdown-item">
                                                Sports
                                            </Link>
                                            <Link to="/category/World" className="dropdown-item">
                                                World
                                            </Link>
                                        </div>
                                        <div className="col-md-3">
                                            <Link to="/category/Lifestyle" className="dropdown-item">
                                                Lifestyle
                                            </Link>
                                            <Link to="/category/Education" className="dropdown-item">
                                                Education
                                            </Link>
                                            <Link to="/category/Environment" className="dropdown-item">
                                                Environment
                                            </Link>
                                            <Link to="/category/Travel" className="dropdown-item">
                                                Travel
                                            </Link>
                                        </div>
                                        <div className="col-md-3">
                                            <Link to="/category/Food" className="dropdown-item">
                                                Food
                                            </Link>
                                            <Link to="/category/Fashion" className="dropdown-item">
                                                Fashion
                                            </Link>
                                            <Link to="/category/Finance" className="dropdown-item">
                                                Finance
                                            </Link>
                                            <Link to="/category/Culture" className="dropdown-item">
                                                Culture
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* State-City Mega Dropdown */}
                            <div className="nav-item dropdown" id="navbarNav">
                                <ul className="navbar-nav">
                                    {/* State-City Mega Dropdown */}
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            to="/states"
                                            id="stateCityDropdown"
                                            data-toggle="dropdown"
                                        >
                                            State &amp; City
                                        </Link>
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
                                            {/* <div className="row">
                                                
                                                <div className="col-md-3">
                                                    <Link to="/state/state/67d1318e373d4a02a3104ea3" className="dropdown-header">
                                                        Gujarat
                                                    </Link>
                                                    <a className="dropdown-item" href="/state/city/67d1341cd5ac4dd2104fcf7e">
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
                                            </div> */}

                                            <div className="row">
                                                {states.map((state, index) => (
                                                    <div className="col-md-3" key={state._id}>
                                                        <Link to={`/state/state/${state._id}`} className="dropdown-header">
                                                            {state.name}
                                                        </Link>
                                                        {(groupedCities[state._id] || []).map((city) => (
                                                            <Link key={city._id} to={`/state/city/${city._id}`} className="dropdown-item">
                                                                {city.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <Link to='/contact' className="nav-item nav-link">
                            Advertise With Us
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
                                {login ?
                                    <Link to='/login'>
                                        <button
                                            className="input-group-text text-secondary"
                                            style={{ marginLeft: 10 }}
                                        >
                                            <i className="fa fa-user" />
                                            Login
                                        </button>
                                    </Link> :

                                    <button
                                        className="input-group-text text-secondary"
                                        style={{ marginLeft: 10 }}
                                        onClick={() => {
                                             
                                            localStorage.removeItem('userId'); // Remove the user ID from local storage
                                            localStorage.removeItem('name'); // Remove the name from local storage
                                            localStorage.removeItem('role'); // Remove the role from local storage
                                            navigate('/login')
                                        }}
                                    >
                                        <i className="fa fa-user" />
                                        Logout
                                    </button>}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            {/* Navbar End */}
        </>

    )
}
