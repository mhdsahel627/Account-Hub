import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

import { createUser } from "../features/auth/authAPI";

const AddUser = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await createUser(formData, accessToken);

      setMessage("User created successfully!");

      setFormData({
        username: "",
        email: "",
        password: "",
      });

    } catch (error) {
      console.log("CREATE USER ERROR:", error.response?.data);
      setMessage("Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">

      <div className="mx-auto max-w-md">

        <Card className="w-full">

          <h1 className="text-3xl font-bold text-white text-center">
            Add User
          </h1>

          <p className="mt-2 text-center text-slate-300">
            Create a new user account
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
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
              {loading ? "Creating..." : "Create User"}
            </Button>

          </form>

          {message && (
            <p className="mt-5 text-center text-emerald-400">
              {message}
            </p>
          )}

          <button
            onClick={() => navigate("/admin/dashboard")}
            className="mt-5 w-full text-slate-400 hover:text-white"
          >
            ← Back to Dashboard
          </button>

        </Card>

      </div>
    </div>
  );
};

export default AddUser;