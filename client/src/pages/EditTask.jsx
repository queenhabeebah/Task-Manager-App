import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";

function EditTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const formatDateTimeLocal = (isoString) => {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset() * 60000; // Convert timezone offset to milliseconds
    const localDate = new Date(date.getTime() - offset); // Adjust to local time
    return localDate.toISOString().slice(0, 16); // Return YYYY-MM-DDTHH:MM
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await api.getTask(id);
        // const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
        setDueDate(task.dueDate ? formatDateTimeLocal(task.dueDate) : "");
      } catch (error) {
        console.error("Error fetching task", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.updateTask(id, {
        title,
        description,
        status,
        priority,
        dueDate,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="container row justify-content-center mb-5">
      <div className="col-md-6">
        <h2 className="mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          {/* Same form fields as CreateTask */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Priority</label>
            <select
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Due Date</label>
            <input
              type="datetime-local"
              name="dueDate"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
