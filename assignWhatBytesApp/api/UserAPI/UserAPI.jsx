import axios from "axios";
import { API_URL_BASE } from "../../utils/helper";

// API for loging user

export const userLoginAPI = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      withCredentials: true,
      data: data,
    });

    return result;
  } catch (error) {
    return error;
  }
};

// API for user logout

export const userLogoutAPI = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //mode: "no-cors",
      },
      withCredentials: true,
    });

    return result;
  } catch (error) {
    return error;
  }
};

// API for registering user

export const userRegisterAPI = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/registerUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
      withCredentials: true,
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting user details

export const getUserDetailsAPI = async (user_id) => {
  try {
    let result = await axios(`${EXPO}/getUserDetails?user_id=${user_id}`, {
      method: "GET",
      withCredentials: true,
    });
    return result;
  } catch (error) {
    return error;
  }
};
