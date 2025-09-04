import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { MdDelete, MdEdit } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks when component mounts

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await api.getTasks();
      setTasks(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError("Error fetching tasks, please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.deleteTask(id);
        // Refresh the task list
        fetchTasks();
      } catch (err) {
        setError("Error deleting task. Please try again.");
      }
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning";
      case "in-progress":
        return "bg-info";
      case "completed":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading tasks...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task List</h2>
        <Link to="/create" className="btn btn-primary">
          Create New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks found. Create one!</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td> {task.description} </td>
                  <td>
                    <span
                      className={`badge ${getStatusBadgeColor(task.status)}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        task.priority === "high"
                          ? "bg-danger"
                          : task.priority === "medium"
                          ? "bg-warning"
                          : "bg-info"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link
                        to={`/edit/${task._id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                  
                        <MdEdit size={24} />
                      </Link>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task._id)}>
                    
                        <MdDelete size={24} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TaskList