import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FormatDate } from '../components/FormatDate'
import { GetStatusClass } from '../utils/getStatusClass'

export const JournalistSingleNews = () => {
    const [news, setNews] = useState({})
    const [searchParams] = useSearchParams();

    const [showEditForm, setShowEditForm] = useState(false)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [images, setImages] = useState([]); // List of image URLs
    const [selectedImages, setSelectedImages] = useState([]); // Images to remove

    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate()

    const fetchNews = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/news/${id}`);
            console.log(response.data)
            setNews(response.data); // Assuming backend sends JSON with these keys
            setTitle(response.data.title)
            setContent(response.data.content)
            setImages(response.data.images || [])
            setShowEditForm(searchParams.get("edit") === "true" ? true : false)
            setShowRejectForm(searchParams.get("reject_form") === "true" ? true : false)
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

    const handleUpdate = async () => {
        try {
            await axios.put("http://127.0.0.1:8000/news/update/", {
                id: id,
                title: title || undefined,
                content: content || undefined,
                removeImages: selectedImages, // Send images to remove
            });

            alert("News updated successfully!");
            navigate("/journalistNewsManage")
        } catch (error) {
            console.error("Error updating news:", error.response?.data || error.message);
            alert("Failed to update news.");
        }
    };

    const toggleSelection = (img) => {
        setSelectedImages((prevSelected) =>
            prevSelected.includes(img)
                ? prevSelected.filter((i) => i !== img) // Remove if exists
                : [...prevSelected, img] // Add if not exists
        );
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
                    {news?.images?.length > 0 ? (
                        news.images.map((i, index) => (
                            <div className="col-md-4" key={index}>
                                <img src={i} className="img-fluid mb-3" alt="News Image" />
                            </div>
                        ))
                    ) : (
                        <p>No images available</p> // Fallback when images are empty or undefined
                    )}

                </div>
                <p className="lead">
                    {news.content}
                </p>
                {/* Responsive Buttons */}
                {news.status !== "published" &&
                    <div className="d-flex flex-column flex-md-row gap-2">
                        <button className="btn btn-secondary mx-1 mb-1"  onClick={() => setShowEditForm(!showEditForm)}>
                            <i className="fas fa-edit" /> Edit
                        </button>
                        <button className="btn btn-danger mx-1 mb-1" onClick={handleDelete}>
                            <i className="fas fa-trash" /> Delete
                        </button>

                    </div>
                }
            </div>

            {showEditForm && (
                <div className="mt-3 p-3 border rounded bg-light">
                    <div className="row">
                        <div className="col-md-4">
                            <img
                                src={images[0]}
                                className="img-fluid mb-3"
                                alt="News Image"
                            />
                        </div>
                        {images.slice(1, 3).map((i, index) => {

                            const isSelected = selectedImages.includes(i); // Check from useState
                            return (

                                <div key={index} className="col-md-4">
                                    <img
                                        src={i}
                                        className="img-fluid mb-3"
                                        alt="News Image"
                                    />
                                    <button
                                        className={`btn ${isSelected ? "btn-danger" : "btn-success"} btn-sm position-absolute top-0 end-0`}
                                        onClick={() => toggleSelection(i)}
                                    >
                                        {isSelected ? "✖" : "✔"} {/* Toggle icon */}
                                    </button>
                                </div>

                            )
                        })}
                    </div>
                    <label className="form-label">Title:</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter reason for rejection..."
                    />
                    <label className="form-label">Content:</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Enter reason for rejection..."
                    />
                    <div className="d-flex flex-column flex-md-row gap-2 mt-2">
                        <button className="btn btn-danger mx-1 mb-1" onClick={handleUpdate}>
                            Save Changes
                        </button>
                        <button
                            className="btn btn-secondary mx-1 mb-1"
                            onClick={() => setShowEditForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <div className="text-center mt-4">
                <Link to="/journalistNewsManage" className="btn btn-outline-dark">
                    <i className="fas fa-arrow-left" /> Back to News Management
                </Link>
            </div>
        </div>

    )


}
