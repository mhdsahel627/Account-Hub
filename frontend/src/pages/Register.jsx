import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";

import { registerUser } from "../features/auth/authAPI";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
    setMessage("");
    setError("");

    try {
      const response = await registerUser(formData);

      console.log("REGISTER SUCCESS:", response.data);

      setMessage("Account created successfully!");
      toast.success("Account created successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.log("REGISTER ERROR:", error);
      console.log("ERROR RESPONSE:", error.response?.data);

      setError("Unable to create account. Please check your details.");
      toast.error(
        error.response?.data?.detail ||
        "Registration failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background glow */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">

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
              One place for everything about your account.
            </p>

          </div>


          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />

            <Input
              type="email"
              name="email"
              placeholder="Your email address"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                {message}
              </div>
            )}

            <Button type="submit">
              {loading ? "Creating account..." : "Create Account →"}
            </Button>

          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs text-slate-500">ALREADY A MEMBER?</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-slate-600">
            Account Hub · Simple · Secure · Personal
          </p>

        </Card>

      </div>
    </div>
  );
};

export default Register;