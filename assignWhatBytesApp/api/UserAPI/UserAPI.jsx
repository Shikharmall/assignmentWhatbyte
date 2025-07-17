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
      data: data,
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
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};
