import { useEffect } from "react";
import { Link } from "react-router-dom";

const PendingApproval = () => {
    useEffect(() => {
        localStorage.removeItem("userId");
        localStorage.removeItem("name");
        localStorage.removeItem("role");
        localStorage.removeItem("status");
    }, []);
    
    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h2 className="mb-4 font-weight-bold text-secondary">
                            It takes some time to get your account approved.
                        </h2>
                        <p className="mb-4 text-muted">
                            Meanwhile, you can check out the latest news or try logging in again later.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <Link to="/" className="btn btn-primary px-4 py-2">
                                Go to News Page
                            </Link>
                            <Link to="/login" className="btn btn-outline-secondary px-4 py-2">
                                Try to Login Again
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingApproval;
