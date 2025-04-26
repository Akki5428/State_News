import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormatDate } from "../components/FormatDate"
import { toast } from 'react-toastify';
import { Loader } from '../components/Loader';

export const AdminSingleUser = () => {
    const { id ,stat} = useParams()
    const [user, setUser] = useState({})
    const [showRejectForm, setShowRejectForm] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const[isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    

    const fetchUser = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/user/${id}`);
            console.log(response.data)
            setUser(response.data); // Assuming backend sends JSON with these keys
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        try{
            if (window.confirm("Are you sure you want to delete this User?")) {
                await axios.delete(`http://127.0.0.1:8000/user/${id}`);
                setIsLoading(true);
                // alert("User deleted!");
                toast.success("User deleted!", {
                    className: "red-toast", 
                    bodyClassName: "red-toast-body",
                    progressClassName: "red-toast-progress",
                });
                navigate('/adminusermanage'); // Redirect to News Management Page
            }    
        }catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
            alert("Failed to delete user.");
        }
        finally {   
            setIsLoading(false);
        }
        
    };

    const handleBlock = async () => {
        try{
            if (user.status == "approved") {
                if (window.confirm("Are you sure you want to Block this User?")) {
                    await axios.patch(`http://127.0.0.1:8000/user/block/${id}`);
                    // alert("User Blocked!");
                    toast.success("User Blocked!", {
                        className: "red-toast",
                        bodyClassName: "red-toast-body",
                        progressClassName: "red-toast-progress",
                    });
                    navigate('/adminusermanage');
                }
            }
            else if (user.status == "rejected") {
                if (window.confirm("Are you sure you want to Reconsider this User?")) {
                    await axios.patch(`http://127.0.0.1:8000/user/block/${id}`);
                    // alert("User Reconsider!");
                    toast.success("User Reconsider!")
                    navigate('/adminusermanage');
                }
            }
            else {
                await axios.patch(`http://127.0.0.1:8000/user/block/${id}`);
                // alert("User UnBlocked!");
                toast.success("User UnBlocked!")
                navigate('/adminusermanage');
            }
            setIsLoading(true);
        }catch (error) {
            console.error("Error blocking user:", error.response?.data || error.message);
            // alert("Failed to Perform action on user.");
            toast.error("Failed to Perform action on user.", {
                className: "red-toast",
                bodyClassName: "red-toast-body",
                progressClassName: "red-toast-progress",
            });
        }
        finally {
            setIsLoading(false);
        }

        
    }

    const handleApprove = async () => {
        setIsLoading(true);
        try {
            await axios.patch(`http://127.0.0.1:8000/user/approve/${id}`);
            // alert("User approved!");
           
            toast.success("User approved!");
            navigate('/adminusermanage');
        } catch (error) {
            console.error("Error approving news:", error.response?.data || error.message);
            // alert("Failed to approve User.");
            toast.error("Failed to approve User.", {
                className: "red-toast",
                bodyClassName: "red-toast-body",
                progressClassName: "red-toast-progress",
            });
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleRejection = async () => {
        setIsLoading(true);
        try {
            await axios.put("http://127.0.0.1:8000/user/rejected/", { id: id, rejectReason: rejectionReason });
            // alert("News Rejected!");
            
            toast.success("User Rejected!", {
                className: "red-toast",
                bodyClassName: "red-toast-body",
                progressClassName: "red-toast-progress",
            });
            navigate('/adminusermanage');
        } catch (error) {
            console.error("Error approving news:", error.response?.data || error.message);
            // alert("Failed to approve news.");
            toast.error("Failed to Reject news.", {
                className: "red-toast",
                bodyClassName: "red-toast-body",
                progressClassName: "red-toast-progress",
            });
        }
        finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchUser()
        console.log(stat)
        setShowRejectForm(stat=="yes"?true:false)
    }, [])


    return (
        <div className="container mt-4">
            {isLoading && <Loader/>}
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
                    {/* <img
                        src="https://via.placeholder.com/150"
                        className="rounded-circle img-thumbnail mb-3"
                        alt="User Profile"
                        width="150"
                    /> */}
                </div>

                {/* User Information */}
                <ul className="list-unstyled">
                    <li><strong>Role:</strong> {user?.role?.role}</li>
                    <li><strong>Username:</strong> {user?.firstName}123</li>
                    {
                        user?.role?.role !== "reader" &&  
                        <>
                            <li><strong>PressId:</strong> {user?.pressId}</li>
                            <li><strong>Organization Name:</strong> {user?.organization}</li>
                        </>
                    }
                    
                    {/* <li><strong>Phone:</strong> </li>
                    <li><strong>Address:</strong> New York, USA</li>
                    <li><strong>Documents Submitted:</strong> Yes ✅</li> */}
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
