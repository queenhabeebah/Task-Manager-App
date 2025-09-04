import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function CreateTask() {
  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    return new Date(now.getTime() - offset).toISOString().slice(0, 16);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: getCurrentDateTimeLocal()
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const now = new Date();
      if (selectedDate.getTime() < now.getTime()) {
        newErrors.dueDate = "Due date must be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await api.createTask(formData);
      navigate("/");
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container row justify-content-center mb-5">
      <div className="col-md-6">

      <h2 className="mb-4">Create New Task</h2>
      {submitError && (
        <div className="alert alert-danger" role="alert">
          {submitError}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={formData.title}
            onChange={handleChange}
            />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            value={formData.description}
            onChange={handleChange}
            />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            className={`form-control ${errors.status ? "is-invalid" : ""}`}
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <div className="invalid-feedback">{errors.status}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Priority</label>
          <select
            name="priority"
            className={`form-control ${errors.priority ? "is-invalid" : ""}`}
            value={formData.priority}
            onChange={handleChange}
            >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {errors.priority && (
            <div className="invalid-feedback">{errors.priority}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Due Date</label>
          <input
            type="datetime-local"
            name="dueDate"
            className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
            value={formData.dueDate}
            onChange={handleChange}
            />
          {errors.dueDate && (
            <div className="invalid-feedback">{errors.dueDate}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
          </div>
    </div>
  );
}

export default CreateTask;
