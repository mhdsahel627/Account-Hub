import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

import { getProfile, updateProfile } from "../features/auth/authAPI";
import { loginSuccess } from "../features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, accessToken, refreshToken } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(user?.profile_image || "");

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {

      const data = new FormData();

      data.append('username', formData.username);
      data.append('email',formData.email);

      if (selectedImage) {
        data.append('profile_image', selectedImage);
      }

      const response = await updateProfile(data, accessToken);

      console.log("PROFILE UPDATED:", response.data);

      dispatch(
        loginSuccess({
          access: accessToken,
          refresh: refreshToken,
          user: response.data,
        })
      );

      setMessage("Profile updated successfully!");
      setSelectedImage(null)
    } catch (error) {
      console.log("PROFILE UPDATE ERROR:", error);
      console.log("ERROR RESPONSE:", error.response?.data);

      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">
      <div className="mx-auto max-w-2xl">

        <Card className="w-full">
          <h1 className="text-3xl font-bold text-white text-center">
            My Profile
          </h1>

          <p className="mt-2 text-center text-slate-300">
            Manage your account information
          </p>

          <div className="mt-6 flex flex-col items-center gap-4">

            {preview ? (
              <img
                src={preview}
                alt="Profile"
                className="h-28 w-28 rounded-full object-cover border-4 border-indigo-500"
              />
            ) : (
              <div className="h-28 w-28 rounded-full bg-slate-800 border-4 border-indigo-500 flex items-center justify-center text-slate-400">
                No Image
              </div>
            )}

            <label className="cursor-pointer rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
              Choose Profile Image

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

          </div>

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
              {loading ? "Saving..." : "Save Changes"}
            </Button>

          </form>

          {message && (
            <p className="mt-5 text-center text-emerald-400">
              {message}
            </p>
          )}

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-5 w-full text-slate-400 hover:text-white"
          >
            ← Back to Dashboard
          </button>

        </Card>

      </div>
    </div>
  );
};

export default Profile;