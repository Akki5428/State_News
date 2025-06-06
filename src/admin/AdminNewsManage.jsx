import React, { useEffect, useState } from 'react'
import '../css/admin.css'
import axios from 'axios';
import { GetStatusClass } from '../utils/getStatusClass';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { toast } from 'react-toastify';

export const AdminNewsManage = () => {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate();

    // Fetch dashboard stats from backend
    const fetchNews = async () => {
        setLoading(true)
        try {
            const response = await axios.get("http://127.0.0.1:8000/news/new/");
            console.log(response.data)
            setNews(response.data); // Assuming backend sends JSON with these keys
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
        finally{
            setLoading(false)
        }
    };

    const handleDelete = async (id) => {
        setLoading(true)
        try {
            if (window.confirm("Are you sure you want to delete this news? You can see details using the 'Eye' button.")) {
                await axios.delete(`http://127.0.0.1:8000/news/${id}`);
                await fetchNews()
                toast("News Deleted!", {
                    className: "red-toast",
                    bodyClassName: "red-toast-body",
                    progressClassName: "red-toast-progress",
                    autoClose: 2000,});
            }
        }
        catch (error) {
            console.error("Error deleting news:", error.response?.data || error.message);
            toast("Failed to Delete", {
                className: "red-toast",
                bodyClassName: "red-toast-body",
                progressClassName: "red-toast-progress",
                autoClose: 2000,});
        }
        finally{
            setLoading(false)
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.patch(`http://127.0.0.1:8000/news/approve/${id}`);
            // alert("News approved!");
            await fetchNews()
            toast("News Approved!", {
                className: "red-toast",
                bodyClassName: "red-toast-body",
                progressClassName: "red-toast-progress",
                autoClose: 2000,});
            
        } catch (error) {
            console.error("Error approving news:", error.response?.data || error.message);
            // alert("Failed to approve news.");
            toast("Failed to Approve", {
                className: "red-toast",
                bodyClassName: "red-toast-body",
                progressClassName: "red-toast-progress",
                autoClose: 2000,});
        }
    };



    useEffect(() => {
        fetchNews()
    }, [])

    // useEffect(() => {
    //     console.log("op", news)
    // }, [news])

    const filteredNews = news.filter(n => {
        return (
            (searchQuery === '' || n.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (categoryFilter === '' || n.category === categoryFilter) &&
            (statusFilter === '' || n.status === statusFilter)
        );
    });

    const handleViewClick = (newsId, edit) => {
        navigate(`/adminsingle/${newsId}?edit=${edit}`); // Replace with your actual route
    };

    const handleRejection = (newsId, reject) => {
        navigate(`/adminsingle/${newsId}?reject_form=${reject}`); // Replace with your actual route
    };

    return (
        <div className="container mt-4">
            {loading && <Loader/>}
            <h2 className="mb-4 text-center text-primary">News Management</h2>
            {/* Search and Filter */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search news..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <select className="form-control" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="">Filter by Category</option>
                        <option>Politics</option>
                        <option>Sports</option>
                        <option>Entertainment</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="">Filter by Status</option>
                        <option>inProgress</option>
                        <option>published</option>
                        <option>rejected</option>
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

                        {filteredNews.length > 0 ? filteredNews.filter(news => {
                            // If user is a journalist and status is inprogress, exclude it
                            return !(news.user?.role?.role === "journalist" && news.status === "inProgress");
                        }).map((n, index) => (
                            <tr key={index}>
                                <td>{n.title}</td>
                                <td>{n.user?.firstName || "John Doe"} </td>
                                <td>{n.category}</td>
                                <td>
                                    <span className={`badge ${GetStatusClass(n.status)}`}>
                                        {n.status}
                                    </span>
                                </td>
                                <td>
                                    {n.status === "inProgress" &&
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <button className="btn btn-info btn-sm mr-1 mb-1" onClick={() => handleViewClick(n._id, false)}>
                                                <i className="fas fa-eye" />
                                            </button>
                                            <button className="btn btn-secondary btn-sm mr-1 mb-1" onClick={() => handleViewClick(n._id, true)}>
                                                <i className="fas fa-edit" />
                                            </button>
                                            <button className="btn btn-success btn-sm mr-1 mb-1" onClick={() => handleApprove(n._id)}>
                                                <i className="fas fa-check" />
                                            </button>
                                            <button className="btn btn-danger btn-sm  mr-1 mb-1" onClick={() => handleRejection(n._id, true)}>
                                                <i className="fas fa-times" />
                                            </button>

                                        </div>
                                    }
                                    {(n.status === "published") &&
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            {/* <button className="btn btn-success btn-sm mr-1 mb-1">
                                        <i className="fas fa-check" />
                                    </button> */}
                                            <button className="btn btn-info btn-sm mr-1 mb-1" onClick={() => handleViewClick(n._id)}>
                                                <i className="fas fa-eye" />
                                            </button>
                                            <button className="btn btn-secondary btn-sm mr-1 mb-1" onClick={() => handleViewClick(n._id, true)}>
                                                <i className="fas fa-edit" />
                                            </button>
                                            <button className="btn btn-danger btn-sm  mr-1 mb-1" onClick={() => handleDelete(n._id)}>
                                                <i className="fas fa-trash" />
                                            </button>
                                        </div>
                                    }
                                    {
                                        n.status === "rejected" &&
                                        <button className="btn btn-info btn-sm mr-1 mb-1" onClick={() => handleViewClick(n._id)}>
                                            <i className="fas fa-eye" />
                                        </button>
                                    }

                                    {/* <div className="d-flex flex-column flex-md-row gap-2">
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
                                </div> */}
                                </td>
                            </tr>
                        )) : (<tr>
                            <td colSpan="5" className="text-center">No news found</td>
                        </tr>)}

                        {/* <tr>
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
                        </tr> */}
                        {/* <tr>
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
                        </tr> */}
                    </tbody>
                </table>
                <div className="text-center mt-4">
                    <Link to="/admindash" className="btn btn-outline-dark">
                        <i className="fas fa-arrow-left" /> Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>

    )
}
