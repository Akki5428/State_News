import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/journalist.css';

export const JournEditq = () => {
  const { newsId } = useParams(); // Dynamic from route

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
    fetchStates();
    if (newsId) {
      fetchNewsData(newsId);
    }
  }, [newsId]);

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

  const fetchNewsData = async (id) => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/news/${id}`);
      const newsData = res.data;
      setValue('title', newsData.title);
      setValue('content', newsData.content);
      setValue('category', newsData.category);
      setValue('stateId', newsData.stateId);
      setValue('cityId', newsData.cityId);
      setValue('isBreaking', newsData.isBreaking);
      setExistingImages(newsData.images || []);
    } catch (err) {
      console.error('Error fetching news data:', err);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const total = files.length + imageFiles.length + existingImages.length;
    if (total > 3) {
      alert('You can upload a maximum of 3 images.');
      return;
    }
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeImage = (index) => {
    if (index < existingImages.length) {
      const newExisting = [...existingImages];
      newExisting.splice(index, 1);
      setExistingImages(newExisting);
    } else {
      const newFiles = [...imageFiles];
      newFiles.splice(index - existingImages.length, 1);
      setImageFiles(newFiles);
    }
  };

  const uploadImagesToCloudinary = async () => {
    const urls = [...existingImages]; // keep the existing image URLs
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

  const onSubmit = async (data, status = 'submit') => {
    setUploading(true);
    const imageUrls = await uploadImagesToCloudinary();
    const payload = {
      ...data,
      images: imageUrls,
      userId: '67d03086eeb4bbc43d6ec3a5',
      status: status === 'draft' ? 'draft' : 'submitted',
    };

    try {
      if (newsId) {
        await axios.put(`http://127.0.0.1:8000/news/update/${newsId}`, payload);
      } else {
        await axios.post('http://127.0.0.1:8000/news', payload);
      }
      alert('News submitted successfully!');
      reset();
      setImageFiles([]);
      setExistingImages([]);
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
          <h3 className="mb-3">{newsId ? 'Edit News' : 'Submit News'}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                {...register('title', { required: 'Title is required' })}
              />
              {errors.title && <span>{errors.title.message}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Content</label>
              <textarea
                className="form-control"
                rows="5"
                {...register('content', { required: 'Content is required' })}
              ></textarea>
              {errors.content && <span>{errors.content.message}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                {...register('category', { required: 'Category is required' })}
              />
              {errors.category && <span>{errors.category.message}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">State</label>
              <select
                className="form-control"
                {...register('stateId', { required: 'State is required' })}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.stateId && <span>{errors.stateId.message}</span>}
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <select
                className="form-control"
                {...register('cityId', { required: 'City is required' })}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.cityId && <span>{errors.cityId.message}</span>}
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                {...register('isBreaking')}
              />
              <label className="form-check-label">Breaking News</label>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Upload Images (Max: 3)</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                disabled={imageFiles.length + existingImages.length >= 3}
              />
            </div>

            {(imageFiles.length > 0 || existingImages.length > 0) && (
              <div>
                <h5>Uploaded Images:</h5>
                <div className="image-preview-container">
                  {[...existingImages, ...imageFiles].map((img, index) => (
                    <div key={index} className="image-preview">
                      <img
                        src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                        alt={`img-${index}`}
                        className="preview-image"
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onSubmit(watch(), 'draft')}
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="btn btn-danger"
                disabled={uploading}
              >
                {uploading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
