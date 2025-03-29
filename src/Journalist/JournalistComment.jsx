import React, { useState } from 'react';

export const JournalistComment = () => {
    const [commentVisibility, setCommentVisibility] = useState({});
    const [replyVisibility, setReplyVisibility] = useState({});
    const [searchText, setSearchText] = useState("");

    const articlesData = [
        {
            id: 1,
            title: "Breaking News Title 1",
            comments: [
                { id: 1, user: "User1", text: "This is an interesting article!" },
                { id: 2, user: "User2", text: "I agree with this perspective." },
            ],
        },
        {
            id: 2,
            title: "Breaking News Title 2",
            comments: [{ id: 3, user: "User3", text: "Great insights!" }],
        },
    ];

    const toggleComments = (id) => {
        setCommentVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleReply = (id) => {
        setReplyVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const filterComments = (event) => {
        setSearchText(event.target.value.toLowerCase());
    };

    return (
        <div className="container shadow-lg">
            <h2 className="text-center text-danger">
                <i className="fas fa-comments" /> Comments &amp; Feedback
            </h2>
            <input
                type="text"
                className="form-control filter"
                placeholder="Search comments..."
                onKeyUp={filterComments}
            />

            <div id="articles">
                {articlesData.map((article) => (
                    <div className="article" key={article.id}>
                        <h4>{article.title}</h4>
                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => toggleComments(article.id)}
                        >
                            {commentVisibility[article.id] ? "Hide Comments" : "View Comments"}
                        </button>

                        {/* Use inline style to override CSS display property */}
                        <div
                            className="comment-section"
                            style={{ display: commentVisibility[article.id] ? "block" : "none" }}
                        >
                            {article.comments
                                .filter((comment) =>
                                    comment.text.toLowerCase().includes(searchText)
                                )
                                .map((comment) => (
                                    <div className="comment" key={comment.id}>
                                        <strong>{comment.user}:</strong> {comment.text}
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
                                            />
                                            <button className="btn btn-primary btn-sm mt-2">Post Reply</button>
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
