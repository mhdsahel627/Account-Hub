import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const firstLetter =
    user?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen overflow-hidden bg-[#060817] text-white">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-6 lg:px-8">

        {/* NAVBAR */}
        <nav className="flex items-center justify-between border-b border-white/10 pb-5">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold shadow-lg shadow-indigo-600/20">
              ◈
            </div>

            <div>
              <h1 className="font-bold tracking-wide">
                ACCOUNT HUB
              </h1>

              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                Personal Control Center
              </p>
            </div>

          </div>

          {/* Right */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => navigate("/dashboard/profile")}
              className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-all duration-300 hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-white sm:block"
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/20"
            >
              Logout
            </button>

          </div>

        </nav>


        {/* HERO */}
        <section className="py-14">

          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="mb-4 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                <span className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400">
                  Account Active
                </span>
              </div>

              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {user?.username}
                </span>{" "}
                👋
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                Your personal space for managing your account,
                information and security — all in one place.
              </p>

            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 overflow-hidden rounded-3xl shadow-2xl shadow-indigo-600/20 ring-4 ring-white/5">
                {user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt={user.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold">
                    {firstLetter}
                  </div>
                )}
              </div>
            </div>

          </div>

        </section>


        {/* PROFILE OVERVIEW */}
        <section className="mb-8">

          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-500 hover:border-indigo-500/30">

            {/* Card glow */}
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl transition-all duration-500 group-hover:bg-indigo-500/20" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-xl font-bold text-indigo-300 ring-1 ring-white/10">
                  {firstLetter}
                </div>

                <div>
                  <p className="text-xl font-semibold">
                    {user?.username}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {user?.email}
                  </p>

                  <div className="mt-2 flex items-center gap-2">

                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                    <span className="text-xs text-emerald-400">
                      Account Active
                    </span>

                  </div>
                </div>

              </div>


              <button
                onClick={() => navigate("/dashboard/profile")}
                className="group/btn flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-600/40"
              >
                View Profile

                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                  →
                </span>
              </button>

            </div>

          </div>

        </section>


        {/* SECTION TITLE */}
        <div className="mb-5">

          <h3 className="text-xl font-semibold">
            Your Account
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Everything you need to manage your Account Hub.
          </p>

        </div>


        {/* FEATURE CARDS */}
        <section className="grid gap-4 md:grid-cols-3">

          {/* Profile */}
          <div
            onClick={() => navigate("/dashboard/profile")}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-white/[0.06]"
          >

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-400 transition-transform duration-300 group-hover:scale-110">
              👤
            </div>

            <h4 className="text-lg font-semibold">
              Profile
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage your personal information, email and profile picture.
            </p>

            <div className="mt-5 text-sm font-medium text-indigo-400">
              Manage Profile →
            </div>

          </div>


          {/* Security */}
          <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.06]">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-xl text-purple-400 transition-transform duration-300 group-hover:scale-110">
              🔐
            </div>

            <div className="flex items-start justify-between gap-3">

              <h4 className="text-lg font-semibold">
                Security
              </h4>

              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-500">
                Soon
              </span>

            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage your password and keep your account protected.
            </p>

            <div className="mt-5 text-sm font-medium text-slate-600">
              Coming Soon
            </div>

          </div>


          {/* Activity */}
          <div className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-white/[0.06]">

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-400 transition-transform duration-300 group-hover:scale-110">
              ⚡
            </div>

            <div className="flex items-start justify-between gap-3">

              <h4 className="text-lg font-semibold">
                Activity
              </h4>

              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-slate-500">
                Soon
              </span>

            </div>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Keep track of important activity happening on your account.
            </p>

            <div className="mt-5 text-sm font-medium text-slate-600">
              Coming Soon
            </div>

          </div>

        </section>


        {/* BOTTOM INFO */}
        <section className="mt-8 rounded-2xl border border-indigo-500/10 bg-gradient-to-r from-indigo-500/[0.06] to-purple-500/[0.06] p-6">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="font-medium text-slate-200">
                Your account, your control.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Account Hub keeps your personal information organized
                and accessible in one secure place.
              </p>

            </div>

            <div className="text-2xl opacity-50">
              ◈
            </div>

          </div>

        </section>


        {/* FOOTER */}
        <footer className="py-8 text-center">

          <p className="text-xs text-slate-600">
            ◈ Account Hub
          </p>

          <p className="mt-1 text-[11px] text-slate-700">
            Your account. Your information. Your control.
          </p>

        </footer>

      </div>
    </div>
  );
};

export default Dashboard;