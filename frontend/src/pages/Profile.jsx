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
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Get fresh profile using access token
  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return;

      try {
        const response = await getProfile(accessToken);

        const profile = response.data;

        setFormData({
          username: profile.username || "",
          email: profile.email || "",
        });

        setPreview(profile.profile_image || "");

        // Keep tokens, update user
        dispatch(
          loginSuccess({
            access: accessToken,
            refresh: refreshToken,
            user: profile,
          })
        );
      } catch (error) {
        console.log("PROFILE ERROR:", error.response?.data);
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, [accessToken, refreshToken, dispatch]);

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
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      setMessage("Session expired. Please login again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const data = new FormData();

      data.append("username", formData.username);
      data.append("email", formData.email);

      if (selectedImage) {
        data.append("profile_image", selectedImage);
      }

      const response = await updateProfile(data, accessToken);

      console.log("PROFILE UPDATED:", response.data);

      // Update Redux while preserving tokens
      dispatch(
        loginSuccess({
          access: accessToken,
          refresh: refreshToken,
          user: response.data,
        })
      );

      setFormData({
        username: response.data.username || "",
        email: response.data.email || "",
      });

      setPreview(response.data.profile_image || "");
      setSelectedImage(null);

      setMessage("Profile updated successfully!");
    } catch (error) {
      console.log("PROFILE UPDATE ERROR:", error);
      console.log("ERROR RESPONSE:", error.response?.data);

      setMessage(
        error.response?.data?.detail ||
        "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="mt-4 text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-5 text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-4xl font-bold tracking-tight">
            Your Profile
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your Account Hub identity and personal information.
          </p>
        </div>
        {/* Security */}
        <div className="border-t border-white/10 bg-black/10 p-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-lg font-semibold">
                Security
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Keep your account secure by regularly updating your password.
              </p>
            </div>

            <button
              onClick={() => navigate("/change-password")}
              className="rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-5 py-3 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
            >
              🔐 Change Password
            </button>

          </div>

        </div>

        <Card className="overflow-hidden border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 backdrop-blur-xl">

          {/* Profile Hero */}
          <div className="border-b border-white/10 p-8">

            <div className="flex flex-col items-center gap-6 sm:flex-row">

              {/* Profile image */}
              <div className="relative">

                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="h-32 w-32 rounded-3xl object-cover ring-4 ring-indigo-500/30 shadow-2xl"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-5xl font-bold shadow-2xl">
                    {formData.username?.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Online indicator */}
                <span className="absolute bottom-2 right-2 h-5 w-5 rounded-full border-4 border-slate-950 bg-emerald-400" />
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold">
                  {formData.username || "User"}
                </h2>

                <p className="mt-1 text-slate-400">
                  {formData.email}
                </p>

                <p className="mt-3 inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                  Account Hub Member
                </p>
              </div>

            </div>

            {/* Image upload */}
            <label className="mt-7 inline-flex cursor-pointer items-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold transition hover:bg-white/10">
              📷 Change Profile Picture

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {selectedImage && (
              <p className="mt-2 text-xs text-indigo-300">
                New image selected — save changes to apply it.
              </p>
            )}
          </div>

          {/* Form */}
          <div className="p-8">

            <div className="mb-6">
              <h3 className="text-xl font-semibold">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Update the information associated with your account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

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
                {loading ? "Saving Changes..." : "Save Changes"}
              </Button>

            </form>

            {message && (
              <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-center text-sm text-emerald-300">
                ✓ {message}
              </div>
            )}

          </div>

          {/* Account information */}
          <div className="border-t border-white/10 bg-black/10 p-8">

            <h3 className="text-lg font-semibold">
              Account Information
            </h3>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Account ID
                </p>
                <p className="mt-1 font-medium text-slate-200">
                  #{user?.id}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Account Type
                </p>
                <p className="mt-1 font-medium text-slate-200">
                  {user?.is_staff ? "Administrator" : "Standard User"}
                </p>
              </div>

            </div>

          </div>

        </Card>
      </div>
    </div>
  );
};

export default Profile;