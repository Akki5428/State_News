import React from 'react'

export const AdminUserManage = () => {
    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center text-primary">User Management</h2>
            {/* Search & Filter Section */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or email"
                    />
                </div>
                <div className="col-md-3">
                    <select className="form-control">
                        <option value="">Filter by Role</option>
                        <option value="reader">Reader</option>
                        <option value="citizen_journalist">Citizen Journalist</option>
                        <option value="journalist">Journalist</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-control">
                        <option value="">Filter by Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>
            {/* Users Table */}
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>
                                <span className="badge bg-info">Journalist</span>
                            </td>
                            <td>
                                <span className="badge bg-success">Active</span>
                            </td>
                            <td>
                                <div className="d-flex flex-column flex-md-row gap-2">
                                    <button className="btn btn-primary btn-sm text-nowrap mr-1" >
                                        <i className="fas fa-user-edit" /> Edit Role
                                    </button>
                                    <button className="btn btn-warning btn-sm text-nowrap mr-1">
                                        <i className="fas fa-user-slash" /> Deactivate
                                    </button>
                                    <button className="btn btn-danger btn-sm text-nowrap mr-1">
                                        <i className="fas fa-trash" /> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Jane Smith</td>
                            <td>janesmith@example.com</td>
                            <td>
                                <span className="badge bg-warning">Citizen Journalist</span>
                            </td>
                            <td>
                                <span className="badge bg-danger">Inactive</span>
                            </td>
                            <td>
                                <div className="d-flex flex-column flex-md-row gap-2">
                                    <button className="btn btn-primary btn-sm text-nowrap mr-1">
                                        <i className="fas fa-user-edit" /> Edit Role
                                    </button>
                                    <button className="btn btn-success btn-sm text-nowrap mr-1">
                                        <i className="fas fa-user-check" /> Activate
                                    </button>
                                    <button className="btn btn-danger btn-sm text-nowrap mr-1">
                                        <i className="fas fa-trash" /> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="text-center mt-4">
                <a href="admin-dashboard.html" className="btn btn-outline-dark">
                    <i className="fas fa-arrow-left" /> Back to Dashboard
                </a>
            </div>
        </div>

    )
}
