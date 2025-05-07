import api from "./axios";
const BASE_URL = 'https://task-manager-backend-lpje.onrender.com';
// const BASE_URL = "http://localhost:5000";

//here the all APIs, I just with the custom methods
export const getTasks = async () => {
  try {
    const response = await api.get(`${BASE_URL}/api/tasks/all-task`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getDashboardTasks = async () => {
  try {
    const response = await api.get(`${BASE_URL}/api/tasks/dashboard`);
    // console.log("deshboard Task", response.data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post(
      `${BASE_URL}/api/tasks/create-task`,
      taskData
    );
    console.log("response Data------->", response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const response = await api.put(
      `${BASE_URL}/api/tasks/update-task/${id}`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(
      `${BASE_URL}/api/tasks/delete-task/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const searchTasks = async (queryParams) => {
  try {
    const response = await api.get(`${BASE_URL}/api/tasks/search`, {
      params: queryParams,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getNotifications = async () => {
  try {
    const response = await api.get(`${BASE_URL}/api/tasks/my-notification`);
    // console.log("notification response===========",response)
    console.log(" noti respo data--------->", response.data);
    return response?.data;
  } catch (error) {
    if (error.response?.status === 404 || !error.response) {
      return [];
    }
    console.error("Error fetching notifications:", error);
    throw error.response?.data || error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await api.patch(
      `${BASE_URL}/api/tasks/mark-as-read/${id}`
    );
    console.log("mark as read notification----------->", response.data);
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error.response?.data || error;
  }
};
