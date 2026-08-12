import { data } from "react-router-dom";
import api from "../../api/axios";

export const registerUser = (data) => {
  return api.post("register/", data);
};

export const loginUser = (data) => {
  return api.post("login/", data);
};

export const getProfile = (token) => {
  return api.get("profile/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const updateProfile = (data, token) => {
  return api.patch("profile/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};