import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const JournalistNavbar = () => {
    const navigate = useNavigate()
    
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
                            <Link to='/journDash' className="nav-item nav-link ">
                                Dashboard
                            </Link>
                            <Link to='/journSubmit' className="nav-item nav-link">
                                Submit News
                            </Link>
                            <Link to='/journalistNewsManage' className="nav-item nav-link">
                                News Management
                            </Link>  
                            <Link to='/journalistcomment' className="nav-item nav-link">
                                Comments
                            </Link> 
                            {/* <Route path='/journDash' element={<JournalistDash/>} /> */}
          {/* <Route path='/journSubmit' element={<JournalistSubmit/>} />
          <Route path='/journalistNewsManage' element={<JournalistNewsManage/>} />
          <Route path='/journalistcomment' element={<JournalistComment/>} />                         */}
                        </div>
                        <div
                            className="input-group ml-auto"
                            style={{ width: "100%", maxWidth: 80 }}
                        >
                            <div className="input-group-append">
                                <Link to='/login'>
                                    <button
                                        className="input-group-text text-secondary ms-auto"
                                        onClick={() => {
                                            
                                            localStorage.removeItem("role")
                                            localStorage.removeItem("userId")
                                            localStorage.removeItem("name")
                                            navigate("/login")
    
                                        }}>
                                        <i className="fa fa-user" />
                                        LogOut
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
