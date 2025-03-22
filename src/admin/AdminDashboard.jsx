import React from 'react'
import '../css/admin.css'

export const AdminDashboard = () => {
    return (
        
            <div className="container mt-4 mb-4">
                {/* Summary Cards */}
                <div className="row g-4">
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card h-100 text-center shadow">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <i className="fas fa-users fa-3x text-primary" />
                                <h5 className="card-title mt-2">Total Users</h5>
                                <p className="card-text">1,250</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card h-100 text-center shadow">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <i className="fas fa-newspaper fa-3x text-success" />
                                <h5 className="card-title mt-2">Total News</h5>
                                <p className="card-text">320</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card h-100 text-center shadow">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <i className="fas fa-clock fa-3x text-warning" />
                                <h5 className="card-title mt-2">Pending Approvals</h5>
                                <p className="card-text">45</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 mb-4">
                        <div className="card h-100 text-center shadow">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <i className="fas fa-exclamation-triangle fa-3x text-danger" />
                                <h5 className="card-title mt-2">Reported News</h5>
                                <p className="card-text">12</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Recent News Submissions */}
                <div className="table-container mt-4">
                    <h4>
                        <i className="fas fa-bullhorn" /> Recent News Submissions
                    </h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Breaking: Market Crash</td>
                                <td>John Doe</td>
                                <td>2025-03-19</td>
                                <td>
                                    <span className="badge bg-warning">Pending</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Sports Update: FIFA</td>
                                <td>Jane Smith</td>
                                <td>2025-03-18</td>
                                <td>
                                    <span className="badge bg-success">Approved</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Recent User Signups */}
                <div className="table-container mt-4">
                    <h4>
                        <i className="fas fa-user-plus" /> Recent User Signups
                    </h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Signup Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Amit Patel</td>
                                <td>Journalist</td>
                                <td>2025-03-19</td>
                                <td>
                                    <span className="badge bg-success">Active</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Sneha Shah</td>
                                <td>Citizen Journalist</td>
                                <td>2025-03-18</td>
                                <td>
                                    <span className="badge bg-danger">Banned</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        

    )
}
