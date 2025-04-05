import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const JournalistComment = () => {
    const [commentVisibility, setCommentVisibility] = useState({});
    const [replyVisibility, setReplyVisibility] = useState({});
    const [searchText, setSearchText] = useState("");
    const [articlesData, setArticlesData] = useState([]);
    const [replyText, setReplyText] = useState({});
    const id = "67d03086eeb4bbc43d6ec3a5"

    // const articlesData = [
    //     {
    //         id: 1,
    //         title: "Breaking News Title 1",
    //         comments: [
    //             { id: 1, user: "User1", text: "This is an interesting article!" },
    //             { id: 2, user: "User2", text: "I agree with this perspective." },
    //         ],
    //     },
    //     {
    //         id: 2,
    //         title: "Breaking News Title 2",
    //         comments: [{ id: 3, user: "User3", text: "Great insights!" }],
    //     },
    // ];

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/comments/news/${id}`);
            console.log(response.data)
            setArticlesData(response.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const postReply = async (comment, newsId) => {
        const payload = {
            newsId: newsId,
            userId: id, // current user's ID (reporter or logged-in user)
            rId: id, // reporter ID
            comment_text: replyText[comment.id],
            created_at: new Date().toISOString(),
            parentCommentId: comment.id || null
        };

        try {
            await axios.post("http://127.0.0.1:8000/comment/add", payload);
            alert("Reply posted!");
            setReplyText({ ...replyText, [comment.id]: "" }); // Clear input
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
        fetchComments()
    }, [])


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
                                {article.comments.map((comment) => (
                                    <div className="comment" key={comment.id}>
                                        <strong>{comment.user?.firstName}:</strong> {comment.text}
                                        <span
                                            className="reply-btn"
                                            onClick={() => toggleReply(comment.id)}
                                            style={{ cursor: "pointer", fontSize: "12px", marginLeft: "10px", color: "#d32f2f" }}
                                        >
                                            Reply
                                        </span>

                                        <div
                                            className="reply-section"
                                            style={{ display: replyVisibility[comment.id] ? "block" : "none", marginLeft: "40px", marginTop: "10px" }}
                                        >
                                            <textarea
                                                className="form-control mt-2"
                                                placeholder="Write a reply..."
                                                value={replyText[comment.id] || ""}
                                                onChange={(e) =>
                                                    setReplyText({ ...replyText, [comment.id]: e.target.value })
                                                }
                                            />
                                            <button className="btn btn-primary btn-sm mt-2" onClick={() => postReply(comment, article.id)}>Post Reply</button>
                                        </div>
                                    </div>
                                ))}
                                <textarea
                                    className="form-control mt-2"
                                    placeholder="Write a comment..."
                                />
                                <button className="btn btn-primary btn-sm mt-2">Post Comment</button>
                            </div>
                        </div>
                    ))}
            </div>

        </div>
    );
};
