import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

export const JournalistEditNews = () => {
  const [news, setNews] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const [showEditForm, setShowEditForm] = useState(false);
  const [searchParams] = useSearchParams();

  const fetchNews = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/news/${id}`);
      setNews(response.data);
      setTitle(response.data.title);
      setContent(response.data.content);
      setCategory(response.data.category);
      setState(response.data.state);
      setCity(response.data.city);
      setImages(response.data.images || []);
      setShowEditForm(searchParams.get("edit") === "true" ? true : false);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put('http://127.0.0.1:8000/news/update/', {
        id: id,
        title: title || undefined,
        content: content || undefined,
        category: category || undefined,
        state: state || undefined,
        city: city || undefined,
        removeImages: selectedImages,
      });

      alert('News updated successfully!');
      navigate('/journalistNewsManage');
    } catch (error) {
      console.error('Error updating news:', error);
      alert('Failed to update news.');
    }
  };

  const toggleSelection = (img) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(img)
        ? prevSelected.filter((i) => i !== img)
        : [...prevSelected, img]
    );
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Edit News</h3>
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter news title"
            required=""
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your news content here..."
            required=""
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
            <select
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option>Select State</option>
              <option>State 1</option>
              <option>State 2</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <select
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
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

        {/* Images display and selection */}
        <div className="row">
          {images.length > 0 &&
            images.map((i, index) => {
              const isSelected = selectedImages.includes(i);
              return (
                <div key={index} className="col-md-4">
                  <img src={i} className="img-fluid mb-3" alt="News Image" />
                  <button
                    className={`btn ${isSelected ? 'btn-danger' : 'btn-success'} btn-sm position-absolute top-0 end-0`}
                    onClick={() => toggleSelection(i)}
                  >
                    {isSelected ? '✖' : '✔'}
                  </button>
                </div>
              );
            })}
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowEditForm(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleUpdate}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
