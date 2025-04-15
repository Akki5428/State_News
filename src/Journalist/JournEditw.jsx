import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../css/journalist.css';
import { useNavigate, useParams } from 'react-router-dom';

export const JournEditw = () => {
  // const newsId = "67f90741c0cdb2465cd4346e"; // Static for testing
  const { id } = useParams(); // Get newsId from URL params
  const newsId = id; // Use the newsId from URL params
  const navigate = useNavigate();
  const [news, setnews] = useState({});
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const selectedStateId = watch('stateId');

  useEffect(() => {
    fetchNewsData(newsId);
  }, [newsId]);

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedStateId) {
      fetchCities(selectedStateId);
    } else {
      setCities([]);
    }
  }, [selectedStateId]);

  const fetchStates = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/getStates/');
      setStates(res.data);
    } catch (err) {
      console.error('Error fetching states:', err);
    }
  };

  const fetchCities = async (stateId) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/city/${stateId}`);
      setCities(res.data);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + existingImages.length > 3) {
      alert('You can upload a maximum of 3 images (including existing).');
      return;
    }
    setImageFiles(files);
  };

  const removeExistingImage = (indexToRemove) => {
    setExistingImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const uploadImagesToCloudinary = async () => {
    const urls = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const formData = new FormData();
      formData.append('file', imageFiles[i]);
      formData.append('upload_preset', 'images_preset');
      formData.append('cloud_name', 'dmwmbomir');

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dmwmbomir/image/upload',
          formData
        );
        urls.push(res.data.secure_url);
      } catch (err) {
        console.error('Cloudinary upload failed:', err);
      }
    }
    return urls;
  };

  const fetchNewsData = async (id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/news/${id}`);
      const newsData = res.data;
      setnews(newsData)
      setValue('title', newsData.title);
      setValue('content', newsData.content);
      setValue('category', newsData.category);
      setValue('stateId', newsData.stateId);
      setValue('isBreaking', newsData.isBreaking == true ? "yes" : "no");

      setExistingImages(newsData.images || []);

      await fetchCities(newsData.stateId);
      setTimeout(() => {
        setValue('cityId', newsData.cityId);
      }, 100);
    } catch (err) {
      console.error('Error fetching news data:', err);
    }
  };

  const handleSaveDraft = () => {
    const data = watch();
    onSubmit(data, "draft");
  };

  const handleApprove = async () => {
    try {
      await axios.patch(`http://127.0.0.1:8000/news/approve/${newsId}`);
      alert("News Published!");
      navigate('/journalistNewsManage'); // Redirect to News Management Page
    } catch (error) {
      console.error("Error Publishing news:", error.response?.data || error.message);
      alert("Failed to Published news.");
    }
  };

  const onSubmit = async (data, status) => {
    setUploading(true);
    const imageUrls = await uploadImagesToCloudinary();
    const allImages = [...existingImages, ...imageUrls];
    let payload = {};
    var mess;

    if (allImages.length > 3) {
      alert("You can only submit 3 images.");
      setUploading(false);
      return;
    }

    if (newsId) {
      if (status === "draft") {
        payload = {
          ...data,
          images: allImages,
          id: newsId,
          status: "draft",
        };
        console.log("Hello")
        if(news.status === "inProgress")
          mess = "News saved as draft!";
        else
          mess = "Changes Saved!";       
      }
      else {
        payload = {
          ...data,
          images: allImages,
          id: newsId,
          status: "inProgress",
        };
        console.log("Hi")
        if(news.status === "inProgress")
          mess = "Changes Saved!";
        else
          mess = "News Submitted!!"; 
      }

      try {
        await axios.put('http://127.0.0.1:8000/news/update/', payload);
        console.log(status)
        alert(mess);
        reset();
        setImageFiles([]);
        setExistingImages([]);
        navigate("/journalistNewsManage");
      } catch (err) {
        console.error('Edit failed:', err);
        alert('Edit failed.');
      } finally {
        setUploading(false);
      }
    }
  };

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

      <div className="container">
        <div className="form-container">
          <h3 className="mb-3">Edit News</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                placeholder="Enter news title"
                value={watch('title')}
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <small className="text-danger">{errors.title.message}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows={5}
                placeholder="Write your news content here..."
                {...register('content', { required: 'Content is required' })}
              />
              {errors.content && <small className="text-danger">{errors.content.message}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-control"
                {...register('category', { required: 'Category is required' })}
              >
                <option value="">Select Category</option>
                <option>Politics</option>
                <option>Sports</option>
                <option>Technology</option>
                <option>Entertainment</option>
              </select>
              {errors.category && <small className="text-danger">{errors.category.message}</small>}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">State</label>
                <select
                  className="form-control"
                  {...register('stateId', { required: 'State is required' })}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state._id} value={state._id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.stateId && <small className="text-danger">{errors.stateId.message}</small>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <select
                  className="form-control"
                  {...register('cityId', { required: 'City is required' })}
                  disabled={!selectedStateId}
                >
                  <option value="">
                    {selectedStateId ? 'Select City' : 'Please select a state first'}
                  </option>
                  {cities.map((city) => (
                    <option key={city._id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.cityId && <small className="text-danger">{errors.cityId.message}</small>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Uploaded Images (Click to Remove)</label>
              <div className="d-flex gap-3 flex-wrap">
                {existingImages.map((img, index) => (
                  <div key={index} style={{ position: 'relative' }}>
                    <img
                      src={img}
                      alt={`uploaded-${index}`}
                      style={{ height: 200, width: 300, objectFit: 'cover', marginLeft: 10 }}
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Upload New Images (Max: 3)</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Breaking News</label>
              <select className="form-control" {...register('isBreaking')}>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            <div className="d-flex justify-content-between">
              {news.status === "draft" && (
                <>
                  <button type="button" className="btn btn-info" onClick={handleSaveDraft}>
                    <i className="fas fa-save" /> Save Changes
                  </button>
                  <button type="submit" className="btn btn-danger" disabled={uploading} onClick={() => { onSubmit(watch(), "inProgress") }}>
                    <i className="fas fa-paper-plane" /> {uploading ? 'Submitting...' : 'Submit'}
                  </button>
                </>
              )}
              {news.status === "inProgress" && (
                <>
                  <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                    <i className="fas fa-file-alt" /> Save as Draft
                  </button>
                  <button type="submit" className="btn btn-info" disabled={uploading} onClick={() => { onSubmit(watch(), "inProgress") }}>
                    <i className="fas fa-save" /> Save Changes
                  </button>
                  <button type="button" className="btn btn-success" onClick={handleApprove}>
                    <i className="fas fa-check-circle" /> Approve
                  </button>
                </>
              )}
              {/* <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                <i className="fas fa-file-alt" /> Save as Draft
              </button>
              <button type="submit" className="btn btn-danger" disabled={uploading} onClick={() => { onSubmit(watch(), "inProgress") }}>
                <i className="fas fa-paper-plane" /> {uploading ? 'Submitting...' : 'Submit'}
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
