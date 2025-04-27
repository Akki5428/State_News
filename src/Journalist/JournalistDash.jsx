import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormatDate } from "../components/FormatDate"
import { GetStatusClass } from '../utils/getStatusClass';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loader';


export const JournalistDash = () => {
    const [stats, setStats] = useState({
        total_news: 0,
        publshied_news: 0,
        draft_news: 0,
        total_views: 0,
    });
    // const id = "67d03086eeb4bbc43d6ec3a5"
    const id = localStorage.getItem("userId")

    const navigate = useNavigate();

    const [recentNews, setRecentNews] = useState([]);
    const [recentComments, setRecentComments] = useState([]);
    const[loading, setLoading] = useState(false)

    // Fetch dashboard stats from backend
    const fetchStats = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/dash/journ/stats/${id}`);
            console.log(response.data)
            setStats(response.data); // Assuming backend sends JSON with these keys
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const fetchRecentData = async () => {
        setLoading(true)
        try {
            const newsResponse = await axios.get(`http://127.0.0.1:8000/news/recent/user/${id}`);
            const commentsResponse = await axios.get(`http://127.0.0.1:8000/comments/recent/${id}`);

            console.log("Recent News:", newsResponse.data);
            console.log("Recent Comments:", commentsResponse.data);

            setRecentNews(newsResponse.data);
            setRecentComments(commentsResponse.data);
        } catch (error) {
            console.error("Error fetching recent data:", error);
        }
        finally {
            setLoading(false)
        }

    };

    const handleRowClick = (id) => {
        navigate(`/journsinglenews/${id}`);
    }

    const handleReplyClick = (articleId, commentId) => {
        navigate(`/comments/${articleId}/${commentId}`);
    };

    useEffect(() => {
        fetchStats();
        fetchRecentData()
    }, []);

    return (
        <div className="container mt-4 mb-4">
            {loading && <Loader/>}
            {/* Summary Cards */}
            <div className="row g-4">
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-newspaper fa-3x text-primary" />
                            <h5 className="card-title mt-2">Total Articles</h5>
                            <p className="card-text">{stats.total_news}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-check-circle fa-3x text-success" />
                            <h5 className="card-title mt-2">Published Articles</h5>
                            <p className="card-text">{stats.publshied_news}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-file-alt fa-3x text-warning" />
                            <h5 className="card-title mt-2">Draft Articles</h5>
                            <p className="card-text">{stats.draft_news}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                    <div className="card h-100 text-center shadow">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <i className="fas fa-eye fa-3x text-danger" />
                            <h5 className="card-title mt-2">Total Views</h5>
                            <p className="card-text">{stats.total_views}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Recent Articles */}
            <div className="table-container mt-4">
                <h4><i className="fas fa-bullhorn" /> Recent Articles</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recentNews.map((news, index) => (
                                <tr key={index} onClick={() => handleRowClick(news._id)} style={{ cursor: 'pointer' }}>
                                    <td>{news.title}</td>
                                    <td>{FormatDate(news.news_date)}</td>
                                    <td><span className={`badge ${GetStatusClass(news.status)}`}>{news.status}</span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* Recent Comments */}
            <div className="table-container mt-4">
                <h4><i className="fas fa-comments" /> Recent Comments</h4>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Comment</th>
                            <th>Article</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentComments.map((com, index) => (
                            <tr key={index}>
                                <td>{com.comment_text.slice(0, 35)}...</td>
                                <td>{com.news?.title}</td>
                                <td>{FormatDate(com.created_at)}</td>
                                <td><button className="btn btn-primary btn-sm" onClick={()=>handleReplyClick(com.newsId,com._id)}>Reply</button></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
