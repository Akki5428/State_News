import React from 'react'
import '../css/admin.css'

export const AdminNewsManage = () => {
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
                    <thead className="">
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Breaking News: Market Crash</td>
                            <td>John Doe</td>
                            <td>Business</td>
                            <td>
                                <span className="badge bg-warning">Pending</span>
                            </td>
                            <td>
                                <div className="d-flex flex-column flex-md-row gap-2">
                                    <button className="btn btn-success btn-sm mr-1 mb-1">
                                        <i className="fas fa-check" />
                                    </button>
                                    <button className="btn btn-danger btn-sm  mr-1 mb-1">
                                        <i className="fas fa-times" />
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1 mb-1">
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-secondary btn-sm mr-1 mb-1">
                                        <i className="fas fa-trash" />
                                    </button>
                                </div>                               
                            </td>
                        </tr>
                        <tr>
                            <td>Sports Update: Championship Finals</td>
                            <td>Jane Smith</td>
                            <td>Sports</td>
                            <td>
                                <span className="badge bg-success">Approved</span>
                            </td>
                            <td>
                                <div className="d-flex flex-column flex-md-row gap-2">
                                    <button className="btn btn-primary btn-sm mr-1 mb-1">
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-secondary btn-sm mr-1 mb-1">
                                        <i className="fas fa-trash" />
                                    </button>
                                </div> 
                            </td>
                        </tr>
                        <tr>
                            <td>Entertainment Buzz: New Movie Release</td>
                            <td>Michael Lee</td>
                            <td>Entertainment</td>
                            <td>
                                <span className="badge bg-danger">Rejected</span>
                            </td>
                            <td>
                                <div className="d-flex flex-column flex-md-row gap-2">
                                    <button className="btn btn-primary btn-sm mr-1 mb-1">
                                        <i className="fas fa-edit" />
                                    </button>
                                    <button className="btn btn-secondary btn-sm mr-1 mb-1">
                                        <i className="fas fa-trash" />
                                    </button>
                                </div>    
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
