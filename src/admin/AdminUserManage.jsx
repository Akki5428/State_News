import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GetStatusClass } from '../utils/getStatusClass';
import { Link } from 'react-router-dom';

export const AdminUserManage = () => {
    const [user, setUser] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const fetchUser = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/user/new/");
            console.log(response.data)
            setUser(response.data); // Assuming backend sends JSON with these keys
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };



    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        console.log("opp", user)
    }, [user])

    const filteredUser = user.filter(u => {
        return (
            (searchQuery === '' || u.firstName.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (roleFilter === '' || u.role.role === roleFilter) &&
            (statusFilter === '' || u.status === statusFilter)
        );
    });


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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select className="form-control" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                        <option value="">Filter by Role</option>
                        <option value="reader">Reader</option>
                        <option value="citizen_journalist">Citizen Journalist</option>
                        <option value="journalist">Journalist</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="col-md-3" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <select className="form-control">
                        <option value="">Filter by Status</option>
                        <option value="approved">approved</option>
                        <option value="rejected">rejected</option>
                        <option value="pending">pending</option>
                        <option value="blocked">blocked</option>
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
                        {filteredUser.length > 0 ? filteredUser.map((u, index) => (
                            // <td>
                            //     <span className={`badge ${GetStatusClass(n.status)}`}>
                            //         {n.status}
                            //     </span>
                            // </td>
                            <tr key={index}>
                                <td>{u.firstName}</td>
                                <td>{u.email}</td>
                                <td>
                                    <span className={`badge ${GetStatusClass(u.role.role)}`}>{u.role.role}</span>
                                </td>
                                <td>
                                    <span className={`badge ${GetStatusClass(u.status)}`}>{u.status}</span>
                                </td>
                                <td>
                                    {u.status === "approved" &&
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <button className="btn btn-secondary btn-sm text-nowrap mr-1" >
                                                <i className="fas fa-ban" /> Block
                                            </button>
                                            <button className="btn btn-danger btn-sm text-nowrap mr-1">
                                                <i className="fas fa-trash" /> Delete
                                            </button>
                                        </div>
                                    }
                                    {u.status === "pending" &&
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <button className="btn btn-success btn-sm text-nowrap mr-1" >
                                                <i className="fas fa-check" /> Approve
                                            </button>
                                            <button className="btn btn-danger btn-sm text-nowrap mr-1">
                                                <i className="fas fa-times" /> Reject
                                            </button>
                                        </div>
                                    }
                                    {u.status === "rejected" &&
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <button className="btn btn-info btn-sm text-nowrap mr-1" >
                                                <i className="fas fa-undo" /> Reconsider
                                            </button>
                                            <button className="btn btn-danger btn-sm text-nowrap mr-1">
                                                <i className="fas fa-trash" /> Delete
                                            </button>
                                        </div>
                                    }
                                    {/* <div className="d-flex flex-column flex-md-row gap-2">
                                        <button className="btn btn-primary btn-sm text-nowrap mr-1" >
                                            <i className="fas fa-user-edit" /> Edit Role
                                        </button>
                                        <button className="btn btn-warning btn-sm text-nowrap mr-1">
                                            <i className="fas fa-user-slash" /> Deactivate
                                        </button>
                                        <button className="btn btn-danger btn-sm text-nowrap mr-1">
                                            <i className="fas fa-trash" /> Delete
                                        </button>
                                    </div> */}
                                </td>
                            </tr>

                        )) : (<tr>
                            <td colSpan="5" className="text-center">No User found</td>
                        </tr>)}

                        {/* <tr>
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
                        </tr> */}
                    </tbody>
                </table>
            </div>
            <div className="text-center mt-4">
                <Link to="/admindash" className="btn btn-outline-dark">
                    <i className="fas fa-arrow-left" /> Back to Dashboard
                </Link>
            </div>
        </div>

    )
}
