import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../components/Card";
import { getUsers, deleteUser } from "../features/auth/authAPI";
import { logout } from "../features/auth/authSlice";

const AdminDashboard = () => {
  const { accessToken, user } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await getUsers(accessToken, search, page);

        setUsers(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
      } catch (error) {
        console.log("USERS ERROR:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [accessToken, search, page]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id, accessToken);

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== id)
      );
    } catch (error) {
      console.log("DELETE ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#060817] text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      {/* Main */}
      <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-10">

        {/* HEADER */}
        <header className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400">
                System Online
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Admin
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Dashboard
              </span>
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage users and monitor your platform.
            </p>
          </div>

          <div className="flex items-center gap-3">

            {/* Admin profile */}
            <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-xl sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold">
                {user?.username?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {user?.username || "Admin"}
                </p>

                <p className="text-xs text-slate-500">
                  Administrator
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300"
            >
              Logout
            </button>

          </div>
        </header>


        {/* STATS */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Total Users */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.06]">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  Total Users
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {loading ? "..." : users.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-400 transition-transform duration-300 group-hover:scale-110">
                👥
              </div>

            </div>

            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
            </div>

          </div>


          {/* Current Page */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.06]">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  Current Page
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {page}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-xl text-purple-400 transition-transform duration-300 group-hover:scale-110">
                ◫
              </div>

            </div>

            <p className="mt-4 text-xs text-slate-500">
              Browse users using pagination
            </p>

          </div>


          {/* Access */}
          <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.06]">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-slate-400">
                  Access Level
                </p>

                <p className="mt-2 text-3xl font-bold">
                  Admin
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                ✓
              </div>

            </div>

            <p className="mt-4 text-xs text-emerald-400">
              Full management access
            </p>

          </div>

        </div>


        {/* USERS CARD */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-xl">

          {/* Card Header */}
          <div className="border-b border-white/10 p-6">

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-xl font-semibold">
                  Users
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage registered accounts
                </p>
              </div>

              <button
                onClick={() => navigate("/admin/users/add")}
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-600/40"
              >
                <span className="text-lg transition-transform duration-300 group-hover:rotate-90">
                  +
                </span>

                Add User
              </button>

            </div>


            {/* Search */}
            <div className="relative mt-6">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-xl border border-white/10 bg-black/20 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 focus:border-indigo-500/50 focus:bg-black/30 focus:ring-2 focus:ring-indigo-500/10"
              />

            </div>

          </div>


          {/* User List */}
          <div className="p-4 sm:p-6">

            {loading ? (

              <div className="space-y-3">

                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-20 animate-pulse rounded-2xl bg-white/[0.04]"
                  />
                ))}

              </div>

            ) : users.length === 0 ? (

              <div className="py-16 text-center">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                  👤
                </div>

                <p className="font-medium">
                  No users found
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {users.map((user) => (

                  <div
                    key={user.id}
                    className="group flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-500/20 hover:bg-white/[0.05] sm:flex-row sm:items-center sm:justify-between"
                  >

                    {/* User info */}
                    <div className="flex items-center gap-4">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 font-semibold text-indigo-300 ring-1 ring-white/10">
                        {user.username?.charAt(0)?.toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-white">
                          {user.username}
                        </p>

                        <p className="mt-0.5 text-sm text-slate-500">
                          {user.email}
                        </p>
                      </div>

                    </div>


                    {/* Actions */}
                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          navigate(`/admin/users/${user.id}/edit`)
                        }
                        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-300"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="rounded-lg border border-red-500/10 bg-red-500/5 px-4 py-2 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>


          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-white/10 px-6 py-5">

            <button
              disabled={!previousPage}
              onClick={() => setPage(page - 1)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 transition-all duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Previous
            </button>

            <div className="rounded-lg bg-white/5 px-4 py-2 text-sm text-slate-300">
              Page <span className="font-semibold text-white">{page}</span>
            </div>

            <button
              disabled={!nextPage}
              onClick={() => setPage(page + 1)}
              className="rounded-xl bg-indigo-600/90 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/20 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next →
            </button>

          </div>

        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-600">
          Account Hub • Admin Control Center
        </p>

      </div>
    </div>
  );
};

export default AdminDashboard;