import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

import { loginUser,getProfile } from "../features/auth/authAPI";
import { loginSuccess } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("LOGIN CLICKED");
    console.log(formData);

    try {
      // 1. Login
      const response = await loginUser(formData);

      const access = response.data.access;
      const refresh = response.data.refresh;

      console.log("API RESPONSE:", response.data);

      // 2. Get logged-in user's profile
      const profileResponse = await getProfile(access);

      console.log("PROFILE:", profileResponse.data);

      
      // 3. Save everything in Redux
      dispatch(
        loginSuccess({
          access: access,
          refresh: refresh,
          user: profileResponse.data,
        })
      );
      
      console.log("LOGIN SUCCESS");
      navigate('/dashboard')

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      console.log("ERROR MESSAGE:", error.message);
      console.log("ERROR RESPONSE:", error.response);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center">
          Account Hub
        </h1>

        <p className="mt-2 text-center text-slate-300">
          Welcome Back
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <Button type="submit">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-slate-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;