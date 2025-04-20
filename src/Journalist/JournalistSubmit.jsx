import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../css/journalist.css';

export const JournalistSubmit = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const user_id = localStorage.getItem('userId'); // Get the user ID from local storage

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const selectedStateId = watch('stateId');

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
    if (files.length > 3) {
      alert('You can upload a maximum of 3 images.');
      return;
    }
    setImageFiles(files);
  };

  const uploadImagesToCloudinary = async () => {
    const urls = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const formData = new FormData();
      formData.append('file', imageFiles[i]);
      formData.append('upload_preset', 'images_preset'); // ⬅️ Replace this
      formData.append('cloud_name', 'dmwmbomir');       // ⬅️ Replace this

      try {
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dmwmbomir/image/upload', // ⬅️ Replace this
          formData
        );
        urls.push(res.data.secure_url);
      } catch (err) {
        console.error('Cloudinary upload failed:', err);
      }
    }
    return urls;
  };

  const handleSaveDraft = () => {
    const data = watch(); // Get all the current form data
    onSubmit(data, "draft");  // Call the function to handle submission with "draft" status
  };

  const onSubmit = async (data,status) => {
    setUploading(true);
    const imageUrls = await uploadImagesToCloudinary();
    var payload = {}
    if(status == "draft")
    {
        payload = {
        ...data,
        images: imageUrls,
        userId: user_id, // change this based on authentication
        status:"draft"
      };  
    }
    else{
       payload = {
        ...data,
        images: imageUrls,
        userId: user_id, // change this based on authentication
      };
    }

    console.log(data)
    

    try {
      await axios.post('http://127.0.0.1:8000/news', payload);
      alert('News submitted successfully!');
      reset();
      setImageFiles([]);
    } catch (err) {
      console.error('Submission failed:', err);
      alert('Submission failed.');
    } finally {
      setUploading(false);
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
          <h3 className="mb-3">Submit News</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                placeholder="Enter news title"
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
                <option>LifeStyle</option>
                <option>Food</option>
                <option>Business</option>
                <option>Entertainment</option>
                <option>Education</option>
                <option>Fashion</option>
                <option>Technology</option>
                <option>Science</option>
                <option>Environment</option>
                <option>Finance</option>
                <option>Health</option>
                <option>World</option>
                <option>Travel</option>
                <option>Culture</option>
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
                    <option key={city.id} value={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                {errors.cityId && <small className="text-danger">{errors.cityId.message}</small>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Upload Images (Max: 3)</label>
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
              <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                <i className="fas fa-file-alt" /> Save as Draft
              </button>
              <button type="submit" className="btn btn-danger" disabled={uploading}>
                <i className="fas fa-paper-plane" /> {uploading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
