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

export const adminLogin = (data) => {
  return api.post("admin/login/", data);
};

export const getUsers = (token, search = "", page = 1) => {
  return api.get("admin/users/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      search: search,
      page: page,
    },
  });
};

export const createUser = (data,token) => {
  return api.post('admin/users/add/',data, {
    headers : {
      Authorization : `Bearer ${token}`,
    },
  });
};

export const updateUser = (id, data, token) => {
  return api.patch(`admin/users/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = (id, token) => {
  return api.delete(`admin/users/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const changePassword = (data, token) => {
  return api.post("change-password/",data, {
    headers : {
      Authorization : `Bearer ${token}`,
    },
  });
};