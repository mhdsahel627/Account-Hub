import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

import { loginUser, getProfile } from "../features/auth/authAPI";
import { loginSuccess } from "../features/auth/authSlice";

const Login = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.is_staff) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);

      const access = response.data.access;
      const refresh = response.data.refresh;

      const profileResponse = await getProfile(access);
      console.log(response)

      dispatch(
        loginSuccess({
          access,
          refresh,
          user: profileResponse.data,
        })
      );
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      setError(
        error.response?.data?.detail ||
        "Invalid username or password."
      );
      toast.error(
        error.response?.data?.detail ||
        "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center px-4">

        <Card className="w-full max-w-md border border-white/10 bg-slate-900/70 shadow-2xl shadow-indigo-950/40 backdrop-blur-xl">

          {/* Logo */}
          <div className="mb-8 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-black shadow-xl shadow-indigo-600/30">
              AH
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight">
              Account Hub
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Your account. Your space. Your control.
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
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button type="submit">
              {loading ? "Signing in..." : "Sign In →"}
            </Button>

          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs text-slate-500">OR</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <p className="text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Create one
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-slate-600">
            Account Hub · Secure account management
          </p>

        </Card>

      </div>
    </div>
  );
};

export default Login;