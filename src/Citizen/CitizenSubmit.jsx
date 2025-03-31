import React from 'react'

export const CitizenSubmit = () => {
    return (
        <>
            <div className="container mt-4">
                <div className="guidelines">
                    <h4>News Submission Guidelines</h4>
                    <ul>
                        <li>Ensure that your news is factual and well-researched.</li>
                        <li>Avoid using offensive language or promoting hate speech.</li>
                        <li>Provide credible sources for your claims.</li>
                        <li>Ensure your news article is grammatically correct.</li>
                        <li>Upload only relevant images (Max: 3 images).</li>
                        <li>Do not plagiarize content from other sources.</li>
                    </ul>
                </div>
            </div>
            {/* Submit News Form */}
            <div className="container">
                <div className="form-container">
                    <h3 className="mb-3">Submit News</h3>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter news title"
                                required=""
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea
                                className="form-control"
                                rows={5}
                                placeholder="Write your news content here..."
                                required=""
                                defaultValue={""}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category</label>
                            <select className="form-control">
                                <option>Select Category</option>
                                <option>Politics</option>
                                <option>Sports</option>
                                <option>Technology</option>
                                <option>Entertainment</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label">State</label>
                                <select className="form-control">
                                    <option>Select State</option>
                                    <option>State 1</option>
                                    <option>State 2</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label">City</label>
                                <select className="form-control">
                                    <option>Select City</option>
                                    <option>City 1</option>
                                    <option>City 2</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Upload Images (Max: 3)</label>
                            <input
                                type="file"
                                className="form-control"
                                multiple=""
                                accept="image/*"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Breaking News</label>
                            <select className="form-control">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary">
                                <i className="fas fa-file-alt" /> Save as Draft
                                {/* <i className="fa-solid fa-save" /> Save as Draft */}
                            </button>
                            <button type="submit" className="btn btn-danger">
                                <i className="fas fa-paper-plane" /> Submit
                                {/* <i className="fa-solid fa-paper-plane" /> Submit */}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
}
