import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://project-toff.onrender.com/api/users/me", {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setUser(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 text-white">

      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <button
          onClick={() => navigate("/")}
          className="bg-white text-black px-5 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>

      <p className="mb-6 text-gray-300">
        Welcome <span className="text-white font-semibold">{user?.Fullname}</span>
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div onClick={() => navigate("/loans")}
          className="bg-white/10 p-6 rounded-3xl border border-white/20 cursor-pointer hover:scale-105 transition">
          Loans
        </div>

        {user?.role === "admin" && (
          <>
            <div onClick={() => navigate("/admin")}
              className="bg-white/10 p-6 rounded-3xl border border-white/20 cursor-pointer">
              Admin Panel
            </div>

            <div onClick={() => navigate("/repayment")}
              className="bg-white/10 p-6 rounded-3xl border border-white/20 cursor-pointer">
              Repayments
            </div>
          </>
        )}

      </div>
    </div>
  );
}