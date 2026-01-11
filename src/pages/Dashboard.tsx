import { useEffect } from "react";
import { logout } from "../store/authSlice";
import { fetchUsers } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200">
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow">
              <span className="text-white text-lg font-semibold">SUM</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative group">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold cursor-pointer ring-2 ring-white shadow">
                A
              </div>
              <div className="absolute right-0 mt-2 opacity-0 group-hover:opacity-100 transition bg-white shadow-lg rounded-lg px-4 py-2 text-sm whitespace-nowrap">
                Admin Account
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => dispatch(logout())}
              className="rounded-lg px-4 py-2 font-medium text-white
                         bg-gradient-to-r from-red-500 to-rose-500
                         hover:from-red-600 hover:to-rose-600
                         active:scale-95 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-2xl bg-white p-6 shadow"
              >
                <div className="animate-pulse space-y-3">
                  <div className="h-12 w-12 rounded-full bg-gray-300" />
                  <div className="h-4 bg-gray-300 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center bg-red-50 border border-red-200 p-8 rounded-2xl text-center">
            <p className="text-red-600 font-semibold text-lg mb-2">⚠ {error}</p>
            <button
              onClick={() => dispatch(fetchUsers())}
              className="mt-3 px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && users.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <p className="text-4xl mb-3">👀</p>
            <p className="text-gray-500 text-lg">No users found</p>
          </div>
        )}

        {/* Users */}
        {!loading && !error && users.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user.id}
                className="group rounded-2xl bg-white/80 backdrop-blur p-6 shadow
                           hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg group-hover:text-indigo-600 transition">
                      {user.name}
                    </h2>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <p>📧 {user.email}</p>
                  <p>📞 {user.phone}</p>
                  <p>
                    🌐{" "}
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      className="text-indigo-600 hover:underline"
                    >
                      {user.website}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* shimmer */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
