import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormatDate } from '../components/FormatDate'
import { GetStatusClass } from '../utils/getStatusClass'

export const AdminSingleNews = () => {
    const [news, setNews] = useState({})
    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate()

    const fetchNews = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/news/${id}`);
            console.log(response.data)
            setNews(response.data); // Assuming backend sends JSON with these keys
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    useEffect(() => {
        fetchNews()
    }, [])

    useEffect(() => {
        console.log(news)
    }, [news])

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this news?")) {
            await axios.delete(`http://127.0.0.1:8000/news/${id}`);
            alert("News deleted!");
            navigate('/adminnewsmanage'); // Redirect to News Management Page
        }
    };

    const handleApprove = async () => {
        try {
            await axios.patch(`http://127.0.0.1:8000/news/approve/${id}`);
            alert("News approved!");
            navigate('/adminnewsmanage'); 
        } catch (error) {
            console.error("Error approving news:", error.response?.data || error.message);
            alert("Failed to approve news.");
        }
    };


    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">News Details</h2>
            <div className="p-4 shadow-sm bg-white">
                <h3 className="text-primary">{news.title}</h3>
                <p className="text-muted">
                    By <strong>{news?.user && (news.user.firstName + " " + news.user.lastName)}</strong> | Published on{" "}
                    <strong>{FormatDate(news.news_date)}</strong>
                </p>
                <span className={`badge ${GetStatusClass(news.status)}`}>{news.status}</span>
                <hr />
                {/* Responsive Images */}
                <div className="row">
                    <div className="col-md-4">
                        <img
                            src="https://via.placeholder.com/800x400"
                            className="img-fluid mb-3"
                            alt="News Image"
                        />
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://via.placeholder.com/800x400"
                            className="img-fluid mb-3"
                            alt="News Image"
                        />
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://via.placeholder.com/800x400"
                            className="img-fluid mb-3"
                            alt="News Image"
                        />
                    </div>
                </div>
                <p className="lead">
                    {news.content}
                </p>
                {/* Responsive Buttons */}
                {news.status === "published" &&
                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <button className="btn btn-primary mx-1">
                            <i className="fas fa-edit" /> Edit
                        </button>
                        <button className="btn btn-secondary mx-1" onClick={handleDelete}>
                            <i className="fas fa-trash" /> Delete
                        </button>
                    </div>
                }
                {news.status === "inProgress" &&
                    <div className="d-flex flex-wrap gap-2 mt-4">
                        <button className="btn btn-success mx-1" onClick={handleApprove}>
                            <i className="fas fa-check" /> Approve
                        </button>
                        <button className="btn btn-danger mx-1">
                            <i className="fas fa-times" /> Reject
                        </button>
                        <button className="btn btn-secondary mx-1">
                            <i className="fas fa-edit" /> Edit
                        </button>
                        
                    </div>
                }
                {/* <div className="d-flex flex-wrap gap-2 mt-4">
                    <button className="btn btn-success mx-1">
                        <i className="fas fa-check" /> Approve
                    </button>
                    <button className="btn btn-danger mx-1">
                        <i className="fas fa-times" /> Reject
                    </button>
                    <button className="btn btn-primary mx-1">
                        <i className="fas fa-edit" /> Edit
                    </button>
                    <button className="btn btn-secondary mx-1">
                        <i className="fas fa-trash" /> Delete
                    </button>
                </div> */}
            </div>

            

            <div className="text-center mt-4">
                <a href="news-management.html" className="btn btn-outline-dark">
                    <i className="fas fa-arrow-left" /> Back to News Management
                </a>
            </div>
        </div>

    )
}
