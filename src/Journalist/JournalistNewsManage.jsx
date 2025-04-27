import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createRequestHandler, Link, useNavigate } from 'react-router-dom';
import { GetStatusClass } from '../utils/getStatusClass';
import { set } from 'react-hook-form';
import { Loader } from '../components/Loader';
import { toast } from 'react-toastify';

export const JournalistNewsManage = () => {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // const id = "67d03086eeb4bbc43d6ec3a5"
    const id = localStorage.getItem("userId")

    // Fetch dashboard stats from backend
    const fetchNews = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`http://127.0.0.1:8000/news/user/${id}`);
            console.log(response.data)
            setNews(response.data); // Assuming backend sends JSON with these keys
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
        finally {
            setLoading(false)
        }

    };

    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this news? You can see details using the 'Eye' button.")) {
                await axios.delete(`http://127.0.0.1:8000/news/${id}`);
                // alert("News deleted!");
                toast.error("News deleted!");
                fetchNews()
            }
        }
        catch (error) {
            console.error("Error deleting news:", error);
            toast.error("Error deleting news!");
        }
        finally {
            setLoading(false)
        }
    };

    const handleApprove = async (id) => {
        setLoading(true)
        try {
            await axios.patch(`http://127.0.0.1:8000/news/approve/${id}`);
            // alert("News Published!");
            toast.success("News Published!");
            fetchNews()
        } catch (error) {
            console.error("Error Publishing news:", error.response?.data || error.message);
            // alert("Failed to Published news.");
            toast.error("Failed to Publish news.");
        }
        finally {
            setLoading(false)
        }

    };



    useEffect(() => {
        fetchNews()
    }, [])

    useEffect(() => {
        console.log("op", news)
    }, [news])

    const filteredNews = news.filter(n => {
        return (
            (searchQuery === '' || n.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (categoryFilter === '' || n.category === categoryFilter) &&
            (statusFilter === '' || n.status === statusFilter)
        );
    });

    const handleViewClick = (newsId, edit) => {
        navigate(`/journsinglenews/${newsId}?edit=${edit}`); // Replace with your actual route
    };

    const handleEdit = (newsId) => {
        navigate(`/journSubmit/${newsId}`); // Replace with your actual route
    };

    const handleRejection = (newsId, reject) => {
        navigate(`/adminsingle/${newsId}?reject_form=${reject}`); // Replace with your actual route
    };

    const handleSubmit = async (id) => {
        setLoading(true)
        try {
            await axios.patch(`http://127.0.0.1:8000/news/submit/${id}`);
            // alert("News Submitted!");
            toast.success("News Submitted!");
          
            fetchNews()
        } catch (error) {
            console.error("Error Submiting news:", error.response?.data || error.message);
            // alert("Failed to Submit news.");
            toast.error("Failed to Submit news.");
        }
        finally {
            setLoading(false)
        }

    };

    return (
        <div className="container mt-4">
            {loading && <Loader />}
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
                        <option>draft</option>
                    </select>
                </div>
            </div>
            {/* News Table */}
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="">
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Views</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredNews.length > 0 ? filteredNews.map((n, index) => (
                            <tr key={index}>
                                <td>{n.title}</td>
                                <td>{n.category}</td>
                                <td>{n.status == "published" ? n.views : 0} </td>
                                <td>
                                    <span className={`badge ${GetStatusClass(n.status)}`}>
                                        {n.status}
                                    </span>
                                </td>
                                <td>
                                    {n.status === "published" &&
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <button className="btn btn-info btn-sm mr-1 mb-1" onClick={() => handleViewClick(n._id, false)}>
                                                <i className="fas fa-eye" />
                                            </button>
                                            {/* <button className="btn btn-info btn-sm mr-1 mb-1" onClick={() => handleEdit(n._id)}>
                                                <i className="fas fa-edit" />
                                            </button> */}
                                        </div>
                                    }
                                    {(n.status == "inProgress") &&
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <button className="btn btn-info btn-sm mr-1 mb-1" onClick={() => handleViewClick(n._id)}>
                                                <i className="fas fa-eye" />
                                            </button>
                                            <button className="btn btn-secondary btn-sm mr-1 mb-1" onClick={() => handleViewClick(n._id, true)}>
                                                <i className="fas fa-edit" />
                                            </button>
                                            <button className="btn btn-danger btn-sm  mr-1 mb-1" onClick={() => handleDelete(n._id)}>
                                                <i className="fas fa-trash" />
                                            </button>
                                            <button className="btn btn-success btn-sm  mr-1 mb-1" onClick={() => handleApprove(n._id)}>
                                                <i className="fas fa-check" />
                                            </button>
                                        </div>
                                    }
                                    {(n.status == "draft") &&
                                        <div className="d-flex flex-column flex-md-row gap-2">
                                            <button className="btn btn-info btn-sm mr-1 mb-1" onClick={() => handleViewClick(n._id)}>
                                                <i className="fas fa-eye" />
                                            </button>
                                            <button className="btn btn-secondary btn-sm mr-1 mb-1" onClick={() => handleViewClick(n._id, true)}>
                                                <i className="fas fa-edit" />
                                            </button>
                                            <button className="btn btn-danger btn-sm  mr-1 mb-1" onClick={() => handleDelete(n._id)}>
                                                <i className="fas fa-trash" />
                                            </button>
                                            <button className="btn btn-primary btn-sm  mr-1 mb-1" onClick={() => handleSubmit(n._id)}>
                                                <i className="fas fa-paper-plane" />
                                            </button>
                                        </div>
                                    }
                                </td>
                            </tr>
                        )) : (<tr>
                            <td colSpan="5" className="text-center">No news found</td>
                        </tr>)}
                    </tbody>
                </table>
                <div className="text-center mt-4">
                    <Link to="/journDash" className="btn btn-outline-dark">
                        <i className="fas fa-arrow-left" /> Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>

    )
}
