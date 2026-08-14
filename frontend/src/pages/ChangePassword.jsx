import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

import { changePassword } from "../features/auth/authAPI";

const ChangePassword = () => {
  const navigate = useNavigate();

  const { accessToken } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (formData.new_password !== formData.confirm_password) {
      setError("New passwords do not match.");
      return;
    }

    if (formData.new_password.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await changePassword(
        {
          old_password: formData.old_password,
          new_password: formData.new_password,
        },
        accessToken
      );

      setMessage("Password changed successfully!");

      setFormData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });

    } catch (error) {
      console.log("CHANGE PASSWORD ERROR:", error);
      console.log("ERROR RESPONSE:", error.response?.data);

      setError(
        error.response?.data?.detail ||
        "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">
      <div className="mx-auto max-w-lg">

        <Card className="w-full">

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl shadow-xl shadow-indigo-600/20">
              🔐
            </div>

            <h1 className="mt-5 text-3xl font-bold text-white">
              Change Password
            </h1>

            <p className="mt-2 text-slate-400">
              Keep your Account Hub account secure.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <Input
              type="password"
              name="old_password"
              placeholder="Current Password"
              value={formData.old_password}
              onChange={handleChange}
            />

            <Input
              type="password"
              name="new_password"
              placeholder="New Password"
              value={formData.new_password}
              onChange={handleChange}
            />

            <Input
              type="password"
              name="confirm_password"
              placeholder="Confirm New Password"
              value={formData.confirm_password}
              onChange={handleChange}
            />

            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
                {error}
              </p>
            )}

            {message && (
              <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-sm text-emerald-400">
                {message}
              </p>
            )}

            <Button type="submit">
              {loading ? "Changing Password..." : "Change Password"}
            </Button>

          </form>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 w-full text-center text-slate-400 transition hover:text-white"
          >
            ← Back to Dashboard
          </button>

        </Card>

      </div>
    </div>
  );
};

export default ChangePassword;