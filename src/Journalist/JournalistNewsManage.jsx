import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GetStatusClass } from '../utils/getStatusClass';

export const JournalistNewsManage = () => {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const navigate = useNavigate();
    const id = "67d03086eeb4bbc43d6ec3a5"

    // Fetch dashboard stats from backend
    const fetchNews = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/news/user/${id}`);
            console.log(response.data)
            setNews(response.data); // Assuming backend sends JSON with these keys
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this news? You can see details using the 'Eye' button.")) {
            await axios.delete(`http://127.0.0.1:8000/news/${id}`);
            alert("News deleted!");
            fetchNews()
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

    const handleRejection = (newsId, reject) => {
        navigate(`/adminsingle/${newsId}?reject_form=${reject}`); // Replace with your actual route
    };

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
                                <td>{n.status=="published" ? n.views : 0} </td>
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
                                        </div>
                                    }
                                    {(n.status !== "published") &&
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
