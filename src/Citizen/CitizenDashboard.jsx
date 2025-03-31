import React from 'react'

export const CitizenDashboard = () => {
    return (
        <div className="container mt-4 mb-4">
            {/* Summary Cards */}
            <div className="row g-4">
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-file-alt fa-3x text-primary" />
                            <h5 className="card-title mt-2">Total Articles</h5>
                            <p className="card-text">1,500</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-check-circle fa-3x text-success" />
                            <h5 className="card-title mt-2">Published Articles</h5>
                            <p className="card-text">900</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-pencil-alt fa-3x text-info" />
                            <h5 className="card-title mt-2">Draft Articles</h5>
                            <p className="card-text">250</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-eye fa-3x text-warning" />
                            <h5 className="card-title mt-2">Views</h5>
                            <p className="card-text">50,000</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-clock fa-3x text-secondary" />
                            <h5 className="card-title mt-2">Pending Approvals</h5>
                            <p className="card-text">45</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-times-circle fa-3x text-danger" />
                            <h5 className="card-title mt-2">Rejected Articles</h5>
                            <p className="card-text">30</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-container mt-4">
                <h4><i className="fas fa-bullhorn" /> Recent Articles</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tech Trends in 2025</td>
                            <td>2025-03-19</td>
                            <td><span className="badge bg-success">Published</span></td>
                        </tr>
                        <tr>
                            <td>Political Debate Highlights</td>
                            <td>2025-03-18</td>
                            <td><span className="badge bg-warning">Draft</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Recent Comments */}
            <div className="table-container mt-4">
                <h4><i className="fas fa-comments" /> Recent Comments</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Comment</th>
                            <th>Article</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Great insights on AI!</td>
                            <td>Tech Trends in 2025</td>
                            <td>2025-03-19</td>
                            <td><button className="btn btn-primary btn-sm">Reply</button></td>
                        </tr>
                        <tr>
                            <td>Well-explained debate summary.</td>
                            <td>Political Debate Highlights</td>
                            <td>2025-03-18</td>
                            <td><button className="btn btn-primary btn-sm">Reply</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
