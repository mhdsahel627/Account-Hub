import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold">
          Welcome, {user?.username} 👋
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome to your Account Hub dashboard.
        </p>

        <div className="mt-8 p-6 rounded-2xl bg-slate-900 border border-slate-800">
          <h2 className="text-2xl font-semibold">
            Profile
          </h2>

          <p className="mt-4 text-slate-300">
            Username: {user?.username}
          </p>

          <p className="mt-2 text-slate-300">
            Email: {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 px-5 py-3 rounded-xl bg-red-500 hover:bg-red-600 font-semibold"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Dashboard;