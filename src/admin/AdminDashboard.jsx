import React, { useEffect, useState } from 'react'
import '../css/admin.css'
import axios from 'axios';
import { GetStatusClass } from '../utils/getStatusClass';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = () => {
    const [stats, setStats] = useState({
        total_users: 0,
        total_news: 0,
        pending_news: 0,
        pending_user: 0,
    });
    const [recentNews, setRecentNews] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);
    const navigate = useNavigate()

    // Fetch dashboard stats from backend
    const fetchStats = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/dash/stats/");
            console.log(response.data)
            setStats(response.data); // Assuming backend sends JSON with these keys
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const fetchRecentData = async () => {
        try {
            const newsResponse = await axios.get("http://127.0.0.1:8000/news/recent/");
            const usersResponse = await axios.get("http://127.0.0.1:8000/user/recent/");

            console.log("Recent News:", newsResponse.data);
            console.log("Recent Users:", usersResponse.data);

            setRecentNews(newsResponse.data);
            setRecentUsers(usersResponse.data);
        } catch (error) {
            console.error("Error fetching recent data:", error);
        }
    };

    const handleNewsClick = (id) => {
        navigate(`/adminsingle/${id}`);
    }

    const handleUserClick = (id) => {
        navigate(`/adminsingleuser/${id}`);
    }


    useEffect(() => {
        fetchStats();
        fetchRecentData()
    }, []);


    return (

        <div className="container mt-4 mb-4">
            {/* Summary Cards */}
            <div className="row g-4">
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-users fa-3x text-primary" />
                            <h5 className="card-title mt-2">Total Users</h5>
                            <p className="card-text">{stats.total_users}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-newspaper fa-3x text-success" />
                            <h5 className="card-title mt-2">Total News</h5>
                            <p className="card-text">{stats.total_news}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-clock fa-3x text-warning" />
                            <h5 className="card-title mt-2">Pending News</h5>
                            <p className="card-text">{stats.pending_news}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-user-plus fa-3x text-danger" />
                            <h5 className="card-title mt-2">Pending User</h5>
                            <p className="card-text">{stats.pending_user}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Recent News Submissions */}
            <div className="table-container mt-4">
                <h4>
                    <i className="fas fa-bullhorn" /> Recent News Submissions
                </h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentNews.map((news, index) => (
                            <tr key={index} onClick={() => handleNewsClick(news._id)} style={{ cursor: 'pointer' }}>
                                <td>{news.title}</td>
                                <td>{news.user.firstName}</td>
                                <td>{news.news_date.split("T")[0]}</td>
                                <td>
                                    <span className={`badge ${GetStatusClass(news.status)}`}>
                                        {news.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {/* <tr>
                            <td>Breaking: Market Crash</td>
                            <td>John Doe</td>
                            <td>2025-03-19</td>
                            <td>
                                <span className="badge bg-warning">Pending</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Sports Update: FIFA</td>
                            <td>Jane Smith</td>
                            <td>2025-03-18</td>
                            <td>
                                <span className="badge bg-success">Approved</span>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
            {/* Recent User Signups */}
            <div className="table-container mt-4">
                <h4>
                    <i className="fas fa-user-plus" /> Recent User Signups
                </h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Signup Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentUsers.map((user, index) => (
                            <tr key={index} onClick={() => handleUserClick(user._id)} style={{ cursor: 'pointer' }}>
                                <td>{user.firstName}</td>
                                <td>{user.role.role}</td>
                                <td>{user.created_at.split("T")[0]}</td>
                                <td>
                                    <span className={`badge ${GetStatusClass(user.status)}`}>
                                        {user.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {/* <tr>
                            <td>Amit Patel</td>
                            <td>Journalist</td>
                            <td>2025-03-19</td>
                            <td>
                                <span className="badge bg-success">Active</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Sneha Shah</td>
                            <td>Citizen Journalist</td>
                            <td>2025-03-18</td>
                            <td>
                                <span className="badge bg-danger">Banned</span>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>


    )
}
