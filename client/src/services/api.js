import axios from "axios";

const API_URL = "https://task-manager-server-eojg.onrender.com";

const handleApiError = (error) => {
  if (error.response) {
    // server responded with an error
    throw new Error(error.response.data.message || "An error occurred");
  } else if (error.request) {
    // request made but no response received
    throw new Error("No response from server. Check your network connection.");
  } else {
    // Error in setting up the request
    throw new Error("Error setting up the request");
  }
};

export const api = {
  // with proper error handling

  getTasks: async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      return response.data;
    } catch (error) {
      const handledError = handleApiError(error);
      throw handledError;
    }
  },
  createTask: async (task) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task);
      return response.data;
    } catch (error) {
      const handledError = handleApiError(error);
      throw handledError;
    }
  },
  updateTask: async (id, task) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, task);
      return response.data;
    } catch (error) {
      const handledError = handleApiError(error);
      throw handledError;
    }
  },
  deleteTask: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${id}`);
      return response.data;
    } catch (error) {
      const handledError = handleApiError(error);
      throw handledError;
    }
  },
  getTask: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/tasks/${id}`);
      return response.data;
    } catch (error) {
      const handledError = handleApiError(error);
      throw handledError;
    }
  },
};
