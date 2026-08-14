import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

import { getUsers, updateUser } from "../features/auth/authAPI";

const EditUser = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Get existing user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUsers(accessToken);

        const user = response.data.find(
          (user) => user.id === Number(id)
        );

        if (user) {
          setFormData({
            username: user.username || "",
            email: user.email || "",
          });
        }
      } catch (error) {
        console.log("GET USER ERROR:", error.response?.data);
      }
    };

    fetchUser();
  }, [accessToken, id]);

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
      await updateUser(id, formData, accessToken);

      setMessage("User updated successfully!");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);

    } catch (error) {
      console.log("UPDATE USER ERROR:", error.response?.data);
      setMessage("Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">

      <div className="mx-auto max-w-md">

        <Card className="w-full">

          <h1 className="text-3xl font-bold text-white text-center">
            Edit User
          </h1>

          <p className="mt-2 text-center text-slate-300">
            Update user information
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

            <Button type="submit">
              {loading ? "Updating..." : "Save Changes"}
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

export default EditUser;