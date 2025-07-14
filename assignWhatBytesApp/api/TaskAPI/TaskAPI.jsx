import axios from "axios";
import { API_URL_BASE } from "../../utils/helper";
import { getAsyncData } from "../../utils/asyncDataOperation";

// API to add task

export const addTaskAPI = async (data) => {
  // console.log(data);
  const token = await getAsyncData("accessToken");
  // console.log(token);
  try {
    const result = await axios.post(`${API_URL_BASE}/addTask`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

// API to delete task

export const deleteTaskAPI = async (taskId) => {
  // console.log(data);
  const token = await getAsyncData("accessToken");
  // console.log(token);
  try {
    const result = await axios.delete(
      `${API_URL_BASE}/deleteTask?taskId=${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API to get overall response

export const getUserTasksAPI = async () => {
  try {
    const token = await getAsyncData("accessToken");
    const userId = await getAsyncData("userId");

    if (!token || !userId) {
      throw new Error("Missing token or userId");
    }

    const response = await axios.get(`${API_URL_BASE}/getTasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response; // Return just the data for easier use
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error.response?.data || error.message || "Unknown error";
  }
};
