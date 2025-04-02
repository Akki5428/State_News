import React from 'react'

export const AdminSingleNews = () => {
    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">News Details</h2>
            <div className="p-4 shadow-sm bg-white">
                <h3 className="text-primary">Breaking News: Market Crash</h3>
                <p className="text-muted">
                    By <strong>John Doe</strong> | Published on{" "}
                    <strong>March 19, 2025</strong>
                </p>
                <span className="badge bg-warning">Pending</span>
                <hr />
                {/* Responsive Images */}
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src="https://via.placeholder.com/800x400"
                            className="img-fluid mb-3"
                            alt="News Image"
                        />
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://via.placeholder.com/800x400"
                            className="img-fluid mb-3"
                            alt="News Image"
                        />
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://via.placeholder.com/800x400"
                            className="img-fluid mb-3"
                            alt="News Image"
                        />
                    </div>
                </div>
                <p className="lead">
                    The stock market witnessed a significant crash today, leading to panic
                    among investors. Experts believe that multiple factors have contributed to
                    the sudden decline...
                </p>
                {/* Responsive Buttons */}
                <div className="d-flex flex-wrap gap-2 mt-4">
                    <button className="btn btn-success mx-1">
                        <i className="fas fa-check" /> Approve
                    </button>
                    <button className="btn btn-danger mx-1">
                        <i className="fas fa-times" /> Reject
                    </button>
                    <button className="btn btn-primary mx-1">
                        <i className="fas fa-edit" /> Edit
                    </button>
                    <button className="btn btn-secondary mx-1">
                        <i className="fas fa-trash" /> Delete
                    </button>
                </div>
            </div>
            <div className="text-center mt-4">
                <a href="news-management.html" className="btn btn-outline-dark">
                    <i className="fas fa-arrow-left" /> Back to News Management
                </a>
            </div>
        </div>

    )
}
