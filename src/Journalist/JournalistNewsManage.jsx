import React from 'react'

export const JournalistNewsManage = () => {
    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center text-primary">News Management</h2>
            {/* Search and Filter */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search news..."
                    />
                </div>
                <div className="col-md-3">
                    <select className="form-control">
                        <option selected="">Filter by Category</option>
                        <option>Politics</option>
                        <option>Sports</option>
                        <option>Entertainment</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-control">
                        <option selected="">Filter by Status</option>
                        <option>Pending</option>
                        <option>Approved</option>
                        <option>Rejected</option>
                    </select>
                </div>
            </div>
            {/* News Table */}
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Action</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Breaking News: Market Crash</td>
                            <td>2025-03-29</td>
                            <td>
                                <span className="badge bg-success">Published</span>
                            </td>
                            <td>
                                <div className="d-flex flex-column flex-md-row gap-2">
                                    <button className="btn btn-info btn-sm mr-1 mb-1">
                                        <i className="fas fa-eye" />
                                    </button>
                                    <button className="btn btn-secondary btn-sm mr-1 mb-1">
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1 mb-1">
                                        <i className="fas fa-trash" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Sports Update: Championship Finals</td>
                            <td>2025-03-28</td>
                            <td>
                                <span className="badge bg-warning">Draft</span>
                            </td>
                            <td>
                                <div className="d-flex flex-column flex-md-row gap-2">
                                    <button className="btn btn-info btn-sm mr-1 mb-1">
                                        <i className="fas fa-eye" />
                                    </button>
                                    <button className="btn btn-secondary btn-sm mr-1 mb-1">
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1 mb-1">
                                        <i className="fas fa-trash" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Entertainment Buzz: New Movie Release</td>
                            <td>2025-03-27</td>
                            <td>
                                <span className="badge bg-success">Published</span>
                            </td>

                            <td>
                                <div className="d-flex flex-column flex-md-row gap-2">
                                    <button className="btn btn-info btn-sm mr-1 mb-1">
                                        <i className="fas fa-eye" />
                                    </button>
                                    <button className="btn btn-secondary btn-sm mr-1 mb-1">
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1 mb-1">
                                        <i className="fas fa-trash" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
