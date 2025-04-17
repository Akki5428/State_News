import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormatDate } from "../components/FormatDate"

export const AdminSingleUser = () => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/user/${id}`);
            console.log(response.data)
            setUser(response.data); // Assuming backend sends JSON with these keys
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this User?")) {
            await axios.delete(`http://127.0.0.1:8000/user/${id}`);
            alert("User deleted!");
            navigate('/adminusermanage'); // Redirect to News Management Page
        }
    };

    const handleBlock = async () => {
        if (user.status == "approved") {
            if (window.confirm("Are you sure you want to Block this User?")) {
                await axios.patch(`http://127.0.0.1:8000/user/block/${id}`);
                alert("User Blocked!");
                navigate('/adminusermanage');
            }
        }
        else if (user.status == "rejected") {
            if (window.confirm("Are you sure you want to Reconsider this User?")) {
                await axios.patch(`http://127.0.0.1:8000/user/block/${id}`);
                alert("User Reconsider!");
                navigate('/adminusermanage');
            }
        }
        else {
            await axios.patch(`http://127.0.0.1:8000/user/block/${id}`);
            alert("User UnBlocked!");
            navigate('/adminusermanage');
        }
    }

    const handleApprove = async () => {
        try {
            await axios.patch(`http://127.0.0.1:8000/user/approve/${id}`);
            alert("User approved!");
            navigate('/adminusermanage');
        } catch (error) {
            console.error("Error approving news:", error.response?.data || error.message);
            alert("Failed to approve User.");
        }
    };

    const handleRejection = async () => {
        try {
            await axios.put("http://127.0.0.1:8000/user/rejected/", { id: id, rejectReason: rejectionReason });
            alert("News Rejected!");
            navigate('/adminusermanage');
        } catch (error) {
            console.error("Error approving news:", error.response?.data || error.message);
            alert("Failed to approve news.");
        }
    };


    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">User Approval</h2>

            {/* User Details Section */}
            <div className="p-4 shadow-sm bg-white">
                <h3 className="text-primary">{user.firstName + " " + user.lastName}</h3>
                <p className="text-muted">
                    Email: <strong>{user.email}</strong> | Joined on <strong>{FormatDate(user.created_at)}</strong>
                </p>
                <span className="badge bg-warning">{user.status}</span>
                <hr />

                {/* Profile Image */}
                <div className="text-center">
                    <img
                        src="https://via.placeholder.com/150"
                        className="rounded-circle img-thumbnail mb-3"
                        alt="User Profile"
                        width="150"
                    />
                </div>

                {/* User Information */}
                <ul className="list-unstyled">
                    <li><strong>Role:</strong> {user?.role?.role}</li>
                    <li><strong>User ID:</strong> JRN-12345</li>
                    <li><strong>Phone:</strong> +91 9876543210</li>
                    <li><strong>Address:</strong> New York, USA</li>
                    <li><strong>Documents Submitted:</strong> Yes ✅</li>
                </ul>

                <div className="d-flex flex-column flex-md-row gap-2 mt-4">
                    {user.status === "approved" &&
                        <>
                            <button className="btn btn-secondary mx-1 mb-1" onClick={handleBlock}>
                                <i className="fas fa-ban" /> Block User
                            </button>
                            <button className="btn btn-primary mx-1 mb-1" onClick={handleDelete}>
                                <i className="fas fa-user-trash" /> Delete User
                            </button>
                        </>
                    }
                    {user.status === "pending" &&
                        <>
                            <button className="btn btn-success mx-1 mb-1" onClick={handleApprove}>
                                <i className="fas fa-check" /> Approve User
                            </button>
                            <button className="btn btn-danger mx-1 mb-1" onClick={() => setShowRejectForm(!showRejectForm)}>
                                <i className="fas fa-times" /> Reject User
                            </button>
                        </>
                    }
                    {user.status === "rejected" &&
                        <>
                            <button className="btn btn-warning mx-1 mb-1" onClick={handleBlock}>
                                <i className="fas fa-undo" /> Reconsider User
                            </button>
                            <button className="btn btn-danger mx-1 mb-1" onClick={handleDelete}>
                                <i className="fas fa-trash" /> Delete User
                            </button>
                        </>
                    }
                    {user.status === "block" &&
                        <>
                            <button className="btn btn-success mx-1 mb-1" onClick={handleBlock}>
                                <i className="fas fa-check" /> Unblock User
                            </button>
                            <button className="btn btn-danger mx-1 mb-1" onClick={handleDelete}>
                                <i className="fas fa-trash" /> Delete User
                            </button>
                        </>
                    }
                </div>
                {/* Admin Actions */}
                {/* <div className="d-flex flex-column flex-md-row gap-2 mt-4">
                    <button className="btn btn-success mx-1 mb-1">
                        <i className="fas fa-check" /> Approve User
                    </button>
                    <button className="btn btn-danger mx-1 mb-1">
                        <i className="fas fa-times" /> Reject User
                    </button>
                    <button className="btn btn-primary mx-1 mb-1">
                        <i className="fas fa-user-edit" /> Edit Details
                    </button>
                </div> */}
            </div>


            {/* Reject Form (Only Styling) */}
            {
                showRejectForm &&
                <div className="mt-3 p-3 border rounded bg-light">
                    <label className="form-label">Rejection Reason (Optional):</label>
                    <textarea className="form-control" rows="3" value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)} placeholder="Enter reason for rejection..." />
                    <div className="d-flex flex-column flex-md-row gap-2 mt-2">
                        <button className="btn btn-danger mx-1 mb-1" onClick={handleRejection}>
                            Submit Rejection
                        </button>
                        <button className="btn btn-secondary mx-1 mb-1" onClick={() => { setShowRejectForm(false) }}>
                            Cancel
                        </button>
                    </div>
                </div>
            }


            {/* Edit Form (Only Styling) */}
            {/* <div className="mt-3 p-3 border rounded bg-light">
                <h5 className="mb-3">Edit User Details</h5>
                <label className="form-label">Name:</label>
                <input type="text" className="form-control mb-2" placeholder="Enter user name" />

                <label className="form-label">Email:</label>
                <input type="email" className="form-control mb-2" placeholder="Enter email" />

                <label className="form-label">Phone:</label>
                <input type="text" className="form-control mb-2" placeholder="Enter phone number" />

                <label className="form-label">Role:</label>
                <select className="form-select mb-2">
                    <option>Journalist</option>
                    <option>Citizen Reporter</option>
                    <option>Reader</option>
                </select>

                <div className="d-flex flex-column flex-md-row gap-2 mt-2">
                    <button className="btn btn-danger mx-1 mb-1">
                        Save Changes
                    </button>
                    <button className="btn btn-secondary mx-1 mb-1">
                        Cancel
                    </button>
                </div>
            </div> */}

            {/* Back Button */}
            <div className="text-center mt-4">
                <Link to="/adminusermanage" className="btn btn-outline-dark">
                    <i className="fas fa-arrow-left" /> Back to User List
                </Link>
            </div>
            <div className="text-center mt-4">
                <Link to="/admindash" className="btn btn-outline-dark">
                    <i className="fas fa-arrow-left" /> Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
