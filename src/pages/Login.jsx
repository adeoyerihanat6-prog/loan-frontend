import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    Password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://project-toff.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      toast.success("Login successful");

      navigate("/dashboard");

    } catch (err) {
      console.log(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">

      <h1 className="text-white text-5xl hover:text-gray-400">Welcome Back ✨</h1>
      <p className="mb-20 text-white">where financial confidence begins...</p>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-4 bg-white/10 rounded-xl border border-white/20"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, Password: e.target.value })}
            className="w-full p-4 bg-white/10 rounded-xl border border-black/20"
          />

          <button className="w-full bg-white text-black py-3 rounded-xl font-bold">
            {loading ? "Loading..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-4 text-sm text-gray-300">
          No account? <Link to="/register" className="text-white underline">Register</Link>
        </p>

      </div>
    </div>
  );
}