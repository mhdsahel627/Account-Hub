import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});


// 1. Add access token to every request
api.interceptors.request.use(
  (config) => {
    const savedAuth = localStorage.getItem("auth");

    if (savedAuth) {
      const auth = JSON.parse(savedAuth);

      if (auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// 2. Refresh access token when it expires
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const savedAuth = localStorage.getItem("auth");

        if (!savedAuth) {
          return Promise.reject(error);
        }

        const auth = JSON.parse(savedAuth);

        const response = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            refresh: auth.refreshToken,
          }
        );

        const newAccessToken = response.data.access;

        // Update localStorage
        auth.accessToken = newAccessToken;

        localStorage.setItem(
          "auth",
          JSON.stringify(auth)
        );

        // Update failed request
        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);

      } catch (refreshError) {
        console.log("REFRESH TOKEN ERROR:", refreshError);

        localStorage.removeItem("auth");

        window.location.href = "/";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default api;
