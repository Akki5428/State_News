import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormatDate } from '../components/FormatDate';

export const SingleNews = () => {
    const [news, setnews] = useState({})
    const [para, setPara] = useState([])
    const [trending, setTrending] = useState([])
    const navigate = useNavigate()
    const [showReplyBoxFor, setShowReplyBoxFor] = useState(null);
    const [showRepliesFor, setShowRepliesFor] = useState({});
    const [getComments, setGetComments] = useState([])
    const [replyText, setReplyText] = useState({});
    const [commentText, setCommentText] = useState("");
    const [replyTexts, setReplyTexts] = useState({});
    // user_id = localStorage.getItem("userId")
    const user_id = "67d028a7d2ada10a6e36079e"

    const handleReplySubmit = (commentId) => {
        const reply = replyText[commentId];
        if (reply?.trim()) {
            console.log("Reply posted to:", commentId, "=>", reply);
            // post reply to backend here
            setReplyText((prev) => ({ ...prev, [commentId]: "" }));
            setShowReplyBoxFor(null);
        }
    };

    var comments = getComments;
    const parentComments = comments.filter(
        (c) => c.parentCommentId === null || c.parentCommentId === "None"
    );
    const replies = comments.filter(
        (c) => c.parentCommentId !== null && c.parentCommentId !== "None"
    );



    const handleToggleReplyBox = (commentId) => {
        setShowReplyBoxFor(showReplyBoxFor === commentId ? null : commentId);
    };

    const handleToggleReplies = (commentId) => {
        setShowRepliesFor(prev => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };


    const { type, newsId } = useParams()
    console.log(type, newsId)

    const splitDescription = (description) => {
        return description ? description.split("\n\n") : []; // Split description into paragraphs
    };

    const extractTitle = (paragraph) => {
        const firstSentence = paragraph?.split(". ")[0]; // Get the first sentence
        return firstSentence
    };

    const fetchNews = async () => {
        const news = await axios.get(`http://127.0.0.1:8000/news/${newsId}`)
        const res = await axios.get("http://127.0.0.1:8000/news/trending/")
        // console.log(news.data)
        setnews(news.data)
        setPara(splitDescription(news.data.content))
        setTrending(res.data)

    }

    const fetchComments = async () => {
        const comments = await axios.get(`http://127.0.0.1:8000/comments/newsonly/${newsId}`)
        console.log("data: ", comments.data[0].comments)
        setGetComments(comments.data[0].comments)
    }

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const payload = {
            newsId: newsId,
            userId: user_id,
            rId: news?.userId,
            comment_text: commentText,
            created_at: new Date().toISOString(),
            parentCommentId: null
        };

        try {
            await axios.post("http://127.0.0.1:8000/comment/add", payload);
            setCommentText("");
            alert("Comment posted!");
            // Optionally reload comments here
        } catch (error) {
            console.error("Failed to post comment", error);
        }
        fetchComments()
    };

    const handlePostReply = async (comment) => {
        const text = replyTexts[comment.id];
        if (!text?.trim()) return;

        const payload = {
            newsId: newsId,
            userId: user_id,
            rId: news?.userId,
            comment_text: text,
            created_at: new Date().toISOString(),
            parentCommentId: comment.id || null
        };

        try {
            await axios.post("http://127.0.0.1:8000/comment/add", payload);
            setReplyTexts(prev => ({ ...prev, [comment.id]: "" }));
            setShowReplyBoxFor(null);
            alert("Reply posted!");
            // Optionally reload replies here
        } catch (error) {
            console.error("Failed to post reply", error);
        }
        fetchComments()
    };


    useEffect(() => {
        fetchNews()
        fetchComments()
    }, [newsId])

    const title1 = extractTitle(para[2])
    const title2 = extractTitle(para[3])

    return (
        <>
            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="container">
                    <nav className="breadcrumb bg-transparent m-0 p-0">
                        <a className="breadcrumb-item" href="#">
                            Home
                        </a>
                        {
                            type === "category" ? (
                                <>
                                    <a className="breadcrumb-item" href="#">
                                        Category
                                    </a>
                                    <a className="breadcrumb-item" href="#">
                                        {news.category}
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a className="breadcrumb-item" href="#">
                                        State_City
                                    </a>
                                    <a className="breadcrumb-item" href="#">
                                        {news.state?.name}
                                    </a>
                                    <a className="breadcrumb-item" href="#">
                                        {news.city?.name}
                                    </a>
                                </>
                            )
                        }
                        {/* <a className="breadcrumb-item" href="#">
                            Category
                        </a>
                        <a className="breadcrumb-item" href="#">
                            Technology
                        </a> */}
                        <span className="breadcrumb-item active">{news.title}</span>
                    </nav>
                </div>
            </div>
            {/* Breadcrumb End */}

            {/* News With Sidebar Start */}
            <div className="container-fluid py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            {/* News Detail Start */}
                            <div className="position-relative mb-3">
                                <img
                                    className="img-fluid w-100"
                                    // src="img/news-700x435-2.jpg"
                                    // src={`/img/news-700x435-2.jpg?v=${new Date().getTime()}`}
                                    src={news.images?.[0]}
                                    style={{ objectFit: "cover", height: "400px" }}
                                    alt='news'
                                />
                                <div className="overlay position-relative bg-light">
                                    <div className="mb-3">

                                        {
                                            type === "category" ? (
                                                <>
                                                    <a href="">{news.category}</a>
                                                    <span className="px-1">/</span>
                                                </>
                                            ) : (
                                                <>
                                                    <a href="">{news.state?.name}</a>
                                                    <span className="px-1">/</span>

                                                    <a href="">{news.city?.name}</a>
                                                    <span className="px-1">/</span>

                                                </>
                                            )
                                        }
                                        <span>{FormatDate(news.news_date)}</span>
                                    </div>
                                    <div>
                                        <h3 className="mb-3">
                                            {/* Est stet amet ipsum stet clita rebum duo */}
                                            {news.title}
                                        </h3>
                                        {para.length > 0 && <p>{para[0]}</p>}
                                        {para.length > 1 && <p>{para[1]}</p>}
                                        {/* <h4 className="mb-3">{title1}</h4> */}
                                        {news.images?.length > 1 && (
                                            <div className="d-flex flex-wrap gap-3 mb-4" style={{ gap: 20 }}>
                                                {news.images.slice(1).map((img, idx) => (
                                                    <div key={idx} style={{ flex: "1 1 calc(50% - 12px)" }}>
                                                        <img
                                                            className="img-fluid"
                                                            src={img}
                                                            alt={`News ${idx + 2}`}
                                                            style={{
                                                                width: "100%",
                                                                height: "auto",
                                                                maxWidth: "330px",
                                                                maxHeight: "200px",
                                                                objectFit: "cover",
                                                                borderRadius: "10px",
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* <p>
                                            Diam dolor est labore duo invidunt ipsum clita et, sed et
                                            lorem voluptua tempor invidunt at est sanctus sanctus. Clita
                                            dolores sit kasd diam takimata justo diam lorem sed. Magna
                                            amet sed rebum eos. Clita no magna no dolor erat diam tempor
                                            rebum consetetur, sanctus labore sed nonumy diam lorem amet
                                            eirmod. No at tempor sea diam kasd, takimata ea nonumy elitr
                                            sadipscing gubergren erat. Gubergren at lorem invidunt
                                            sadipscing rebum sit amet ut ut, voluptua diam dolores at
                                            sadipscing stet. Clita dolor amet dolor ipsum vero ea ea eos.
                                            Invidunt sed diam dolores takimata dolor dolore dolore sit.
                                            Sit ipsum erat amet lorem et, magna sea at sed et eos. Accusam
                                            eirmod kasd lorem clita sanctus ut consetetur et. Et duo
                                            tempor sea kasd clita ipsum et.
                                        </p> */}
                                        {para.length > 2 && <p>{para[2]}</p>}
                                        {/* <h5 className="mb-3">Est dolor lorem et ea</h5> */}
                                        {/* <img
                                            className="img-fluid w-50 float-right ml-4 mb-2"
                                            // src="img/news-500x280-2.jpg"
                                            src={`/img/news-500x280-2.jpg?v=${new Date().getTime()}`}
                                        /> */}
                                        {/* <p>
                                            Diam dolor est labore duo invidunt ipsum clita et, sed et
                                            lorem voluptua tempor invidunt at est sanctus sanctus. Clita
                                            dolores sit kasd diam takimata justo diam lorem sed. Magna
                                            amet sed rebum eos. Clita no magna no dolor erat diam tempor
                                            rebum consetetur, sanctus labore sed nonumy diam lorem amet
                                            eirmod. No at tempor sea diam kasd, takimata ea nonumy elitr
                                            sadipscing gubergren erat. Gubergren at lorem invidunt
                                            sadipscing rebum sit amet ut ut, voluptua diam dolores at
                                            sadipscing stet. Clita dolor amet dolor ipsum vero ea ea eos.
                                            Invidunt sed diam dolores takimata dolor dolore dolore sit.
                                            Sit ipsum erat amet lorem et, magna sea at sed et eos. Accusam
                                            eirmod kasd lorem clita sanctus ut consetetur et. Et duo
                                            tempor sea kasd clita ipsum et. Takimata kasd diam justo est
                                            eos erat aliquyam et ut.
                                        </p> */}
                                        {para.length > 3 && <p>{para[3]}</p>}

                                        {/* Print remaining paragraphs */}
                                        {para.slice(3).map((pa, index) => (
                                            <p key={index}>{pa}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* News Detail End */}
                            {/* Comment List Start */}
                            <div className="bg-light mb-3 p-4">
                                <h3 className="mb-4">{parentComments.length} Comments</h3>

                                {/* Comment Form */}
                                <div className="mb-4">
                                    <h5>Leave a Comment</h5>
                                    <form onSubmit={handlePostComment}>
                                        <div className="form-group">
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                placeholder="Your Comment"
                                                value={commentText}
                                                onChange={(e) => setCommentText(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Post Comment" />
                                    </form>
                                </div>

                                {/* All Parent Comments */}
                                {parentComments.map((comment) => (
                                    <div key={comment.id} className="media mb-4">
                                        <img
                                            src="/img/newslogo.jpg"
                                            alt="User"
                                            className="img-fluid mr-3 mt-1"
                                            style={{ width: 45, borderRadius: "50%" }}
                                        />
                                        <div className="media-body">
                                            <h6>
                                                <a href="#">
                                                    {comment.user.firstName} {comment.user.lastName}
                                                </a>{" "}
                                                <small>
                                                    <i>{new Date(comment.created_at).toLocaleString()}</i>
                                                </small>
                                            </h6>
                                            <p>{comment.text}</p>

                                            <button
                                                className="btn btn-sm btn-outline-secondary mr-2"
                                                onClick={() => handleToggleReplyBox(comment.id)}
                                            >
                                                Reply
                                            </button>

                                            {replies.some((r) => r.parentCommentId === comment.id) && (
                                                <button
                                                    className="btn btn-sm btn-outline-info"
                                                    onClick={() => handleToggleReplies(comment.id)}
                                                >
                                                    {showRepliesFor[comment.id] ? "Hide Replies" : "Show Replies"}
                                                </button>
                                            )}

                                            {/* Reply Input Box */}
                                            {showReplyBoxFor === comment.id && (
                                                <div className="mt-3">
                                                    <textarea
                                                        className="form-control mb-2"
                                                        rows="2"
                                                        placeholder="Write a reply..."
                                                        value={replyTexts[comment.id] || ""}
                                                        onChange={(e) =>
                                                            setReplyTexts((prev) => ({
                                                                ...prev,
                                                                [comment.id]: e.target.value,
                                                            }))
                                                        }
                                                    ></textarea>
                                                    <button
                                                        className="btn btn-sm btn-success"
                                                        onClick={() => handlePostReply(comment)}
                                                    >
                                                        Post Reply
                                                    </button>
                                                </div>
                                            )}


                                            {/* Replies Section */}
                                            {showRepliesFor[comment.id] &&
                                                replies
                                                    .filter((reply) => reply.parentCommentId === comment.id)
                                                    .map((reply) => (
                                                        <div className="media mt-4" key={reply.id}>
                                                            {/* <img
                                                                src="img/user.jpg"
                                                                alt="User"
                                                                className="img-fluid mr-3 mt-1"
                                                                style={{ width: 45 }}
                                                            /> */}
                                                            <div className="media-body">
                                                                <h6>
                                                                    <a href="#">
                                                                        {reply.user.firstName} {reply.user.lastName}
                                                                    </a>{" "}
                                                                    <small>
                                                                        <i>{new Date(reply.created_at).toLocaleString()}</i>
                                                                    </small>
                                                                </h6>
                                                                <p>{reply.text}</p>
                                                                {/* No reply button here to prevent replying to a reply */}
                                                            </div>
                                                        </div>
                                                    ))}
                                        </div>
                                    </div>
                                ))}
                            </div>



                            {/* Comment List End */}
                            {/* Comment Form Start */}
                            {/* <div class="bg-light mb-3" style="padding: 30px;">
                  <h3 class="mb-4">Leave a comment</h3>
                  <form>
                      <div class="form-group">
                          <label for="name">Name *</label>
                          <input type="text" class="form-control" id="name">
                      </div>
                      <div class="form-group">
                          <label for="email">Email *</label>
                          <input type="email" class="form-control" id="email">
                      </div>
                      <div class="form-group">
                          <label for="website">Website</label>
                          <input type="url" class="form-control" id="website">
                      </div>

                      <div class="form-group">
                          <label for="message">Message *</label>
                          <textarea id="message" cols="30" rows="5" class="form-control"></textarea>
                      </div>
                      <div class="form-group mb-0">
                          <input type="submit" value="Leave a comment"
                              class="btn btn-primary font-weight-semi-bold py-2 px-3">
                      </div>
                  </form>
              </div>
                            {/* Comment Form End */}
                        </div>
                        <div className="col-lg-4 pt-3 pt-lg-0">
                            {/* Social Follow Start */}
                            <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">Follow Us</h3>
                                </div>
                                <div className="d-flex mb-3">
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none mr-2"
                                        style={{ background: "#39569E" }}
                                    >
                                        <small className="fab fa-facebook-f mr-2" />
                                        <small>12,345 Fans</small>
                                    </a>
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none ml-2"
                                        style={{ background: "#52AAF4" }}
                                    >
                                        <small className="fab fa-twitter mr-2" />
                                        <small>12,345 Followers</small>
                                    </a>
                                </div>
                                <div className="d-flex mb-3">
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none mr-2"
                                        style={{ background: "#0185AE" }}
                                    >
                                        <small className="fab fa-linkedin-in mr-2" />
                                        <small>12,345 Connects</small>
                                    </a>
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none ml-2"
                                        style={{ background: "#C8359D" }}
                                    >
                                        <small className="fab fa-instagram mr-2" />
                                        <small>12,345 Followers</small>
                                    </a>
                                </div>
                                <div className="d-flex mb-3">
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none mr-2"
                                        style={{ background: "#DC472E" }}
                                    >
                                        <small className="fab fa-youtube mr-2" />
                                        <small>12,345 Subscribers</small>
                                    </a>
                                    <a
                                        href=""
                                        className="d-block w-50 py-2 px-3 text-white text-decoration-none ml-2"
                                        style={{ background: "#1AB7EA" }}
                                    >
                                        <small className="fab fa-vimeo-v mr-2" />
                                        <small>12,345 Followers</small>
                                    </a>
                                </div>
                            </div>
                            {/* Social Follow End */}
                            {/* Newsletter Start */}
                            <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">Newsletter</h3>
                                </div>
                                <div className="bg-light text-center p-4 mb-3">
                                    <p>
                                        Just Sign up and get news related notification from our website
                                    </p>
                                    <div className="input-group d-flex justify-content-center mt-3" style={{ width: "100%" }}>
                                        {/* <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Your Email"
                                        /> */}
                                        <div className="input-group-append">
                                            <button className="btn btn-primary px-5 py-2 fs-5" onClick={() => { navigate("/signup") }}>Sign Up</button>
                                        </div>
                                    </div>
                                    <small>Very Easy Signup Process</small>
                                </div>
                            </div>
                            {/* Newsletter End */}
                            {/* Ads Start */}
                            <div className="mb-3 pb-3">
                                <a href="">
                                    <img className="img-fluid" src="img/news-500x280-4.jpg" alt="" />
                                </a>
                            </div>
                            {/* Ads End */}
                            {/* Popular News Start */}
                            <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">Tranding</h3>
                                </div>
                                <div className="d-flex mb-3">
                                    <img
                                        src="img/news-100x100-1.jpg"
                                        style={{ width: 100, height: 100, objectFit: "cover" }}
                                    />
                                    <div
                                        className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                                        style={{ height: 100 }}
                                    >
                                        <div className="mb-1" style={{ fontSize: 13 }}>
                                            <a href="">Technology</a>
                                            <span className="px-1">/</span>
                                            <span>January 01, 2045</span>
                                        </div>
                                        <a className="h6 m-0" href="">
                                            Lorem ipsum dolor sit amet consec adipis elit
                                        </a>
                                    </div>
                                </div>
                                {trending.length > 0 ? (
                                    trending.slice(0, 5).map((item, index) => (
                                        <div className="d-flex mb-3" key={index}>
                                            <img
                                                // src={item.image || "img/news-100x100-2.jpg"}
                                                // src={`/img/news-100x100-1.jpg?v=${new Date().getTime()}`}
                                                src={item.images[0]}
                                                style={{ width: 100, height: 100, objectFit: "cover" }}
                                                alt="Trending News"
                                            />
                                            <div
                                                className="w-100 d-flex flex-column justify-content-center bg-light px-3"
                                                style={{ height: 100 }}
                                            >
                                                <div className="mb-1" style={{ fontSize: 13 }}>
                                                    <Link to={`/state/state/${item.stateId}`}>{item.state.name || "Gujarat"}</Link>
                                                    <span className="px-1">/</span>

                                                    <span>{FormatDate(item.news_date) || "January 01, 2045"}</span>
                                                </div>
                                                <Link className="h6 m-0" to={`/single/category/${item._id}`} style={{
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {item.title || "Lorem ipsum dolor sit amet consec adipis elit"}
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Loading trending news...</p>
                                )}

                            </div>
                            {/* Popular News End */}
                            {/* Tags Start */}
                            <div className="pb-3">
                                <div className="bg-light py-2 px-4 mb-3">
                                    <h3 className="m-0">Tags</h3>
                                </div>
                                <div className="d-flex flex-wrap m-n1">
                                    <Link to="/category/Politics" className="btn btn-sm btn-outline-secondary m-1">
                                        Politics
                                    </Link>
                                    <Link to="/category/Sports" className="btn btn-sm btn-outline-secondary m-1">
                                        Sports
                                    </Link>
                                    <Link to="/category/Entertainment" className="btn btn-sm btn-outline-secondary m-1">
                                        Entertainment
                                    </Link>
                                    <Link to="/category/Lifestyle" className="btn btn-sm btn-outline-secondary m-1">
                                        Lifestyle
                                    </Link>
                                    <Link to="/category/Technology" className="btn btn-sm btn-outline-secondary m-1">
                                        Technology
                                    </Link>
                                    <Link to="/category/Business" className="btn btn-sm btn-outline-secondary m-1">
                                        Business
                                    </Link>
                                    <Link to="/category/Health" className="btn btn-sm btn-outline-secondary m-1">
                                        Health
                                    </Link>
                                    <Link to="/category/Science" className="btn btn-sm btn-outline-secondary m-1">
                                        Science
                                    </Link>
                                    <Link to="/category/Education" className="btn btn-sm btn-outline-secondary m-1">
                                        Education
                                    </Link>
                                    <Link to="/category/World" className="btn btn-sm btn-outline-secondary m-1">
                                        World
                                    </Link>
                                    <Link to="/category/Food" className="btn btn-sm btn-outline-secondary m-1">
                                        Food
                                    </Link>
                                    <Link to="/category/Finance" className="btn btn-sm btn-outline-secondary m-1">
                                        Finance
                                    </Link>
                                </div>
                            </div>
                            {/* Tags End */}
                        </div>
                    </div>
                </div>
            </div>
            {/* News With Sidebar End */}
        </>

    )
}
