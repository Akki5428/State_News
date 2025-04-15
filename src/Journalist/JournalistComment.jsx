import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const JournalistComment = () => {
    const [commentVisibility, setCommentVisibility] = useState({});
    const [replyVisibility, setReplyVisibility] = useState({});
    const [searchText, setSearchText] = useState("");
    const [articlesData, setArticlesData] = useState([]);
    const [replyText, setReplyText] = useState({});
    const id = "67d03086eeb4bbc43d6ec3a5";
    const { articleId, commentId } = useParams(); 

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/comments/news/${id}`);
            console.log(response.data);
            setArticlesData(response.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const postReply = async (comment, newsId) => {
        const payload = {
            newsId: newsId,
            userId: id,
            rId: id,
            comment_text: replyText[comment.id],
            created_at: new Date().toISOString(),
            parentCommentId: comment.id || null
        };

        try {
            await axios.post("http://127.0.0.1:8000/comment/add", payload);
            alert("Reply posted!");
            setReplyText({ ...replyText, [comment.id]: "" });
            fetchComments(); // Refresh comments
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    };

    const toggleComments = (id) => {
        setCommentVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleReply = (id) => {
        setReplyVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const filterComments = (event) => {
        setSearchText(event.target.value.toLowerCase());
    };

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        if (articlesData.length && articleId) {
            setCommentVisibility((prev) => ({ ...prev, [articleId]: true }));
            if (commentId) {
                setCommentVisibility((prev) => ({ ...prev, [commentId]: true }));
                setReplyVisibility((prev) => ({ ...prev, [commentId]: true }));
            }
        }
    }, [articlesData, articleId, commentId]);

    return (
        <div className="container journ-container shadow-lg">
            <h2 className="text-center text-danger">
                <i className="fas fa-comments" /> Comments &amp; Feedback
            </h2>
            <input
                type="text"
                className="form-control filter"
                placeholder="Search News..."
                onKeyUp={filterComments}
            />

            <div id="articles">
                {articlesData
                    .filter((article) =>
                        article.title.toLowerCase().includes(searchText)
                    )
                    .map((article) => (
                        <div className="article" key={article.id}>
                            <h4>{article.title}</h4>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => toggleComments(article.id)}
                            >
                                {commentVisibility[article.id] ? "Hide Comments" : "View Comments"}
                            </button>

                            <div
                                className="comment-section"
                                style={{ display: commentVisibility[article.id] ? "block" : "none" }}
                            >
                                {article.comments
                                    .filter(comment => comment.parentCommentId === "None")
                                    .map((comment) => (
                                        <div className="comment" key={comment.id} style={{ marginBottom: '10px' }}>
                                            <strong style={{color:comment.user?._id === id ? "red" : "grey"}}>{comment.user?._id === id ? "(My Comment)" :comment.user?.firstName}:</strong> {comment.text}
                                            <span
                                                className="reply-btn"
                                                onClick={() => toggleReply(comment.id)}
                                                style={{ cursor: "pointer", fontSize: "12px", marginLeft: "10px", color: "#d32f2f" }}
                                            >
                                                Reply
                                            </span>
                                            <span
                                                className="reply-btn"
                                                onClick={() => toggleComments(comment.id)}
                                                style={{ cursor: "pointer", fontSize: "12px", marginLeft: "10px", color: "blue" }}
                                            >
                                                {commentVisibility[comment.id] ? "Hide Replies" : "Show Replies"}
                                            </span>

                                            {/* Reply Input */}
                                            <div
                                                className="reply-section"
                                                style={{
                                                    display: replyVisibility[comment.id] ? "block" : "none",
                                                    marginLeft: "40px",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                <textarea
                                                    className="form-control mt-2"
                                                    placeholder="Write a reply..."
                                                    value={replyText[comment.id] || ""}
                                                    onChange={(e) =>
                                                        setReplyText({ ...replyText, [comment.id]: e.target.value })
                                                    }
                                                />
                                                <button
                                                    className="btn btn-primary btn-sm mt-2"
                                                    onClick={() => postReply(comment, article.id)}
                                                >
                                                    Post Reply
                                                </button>
                                            </div>

                                            {/* Replies */}
                                            <div
                                                className="nested-replies"
                                                style={{
                                                    display: commentVisibility[comment.id] ? "block" : "none",
                                                    marginLeft: "30px",
                                                    marginTop: "10px",
                                                }}
                                            >
                                                {article.comments
                                                    .filter(reply => reply.parentCommentId === comment.id)
                                                    .map((reply) => (
                                                        <div className="reply" key={reply.id} style={{ marginBottom: '5px' }} >
                                                            <strong style={{color:reply.user?._id === id ? "red" : "black"}}>{reply.user?._id === id ? "(My Reply)" : reply.user?.firstName}:</strong> {reply.text}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};
