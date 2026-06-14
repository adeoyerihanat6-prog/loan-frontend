import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    Fullname: "",
    email: "",
    Password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://project-toff.onrender.com/api/users/createUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        setLoading(false);
        return;
      }
      console.log("USER FROM STORAGE:", localStorage.getItem("user"));
      console.log("PARSED USER:", JSON.parse(localStorage.getItem("user") || "{}"));
      
      const user = data.user || data.data || data;

      if (!user) {
        toast.error("Invalid server response");
        setLoading(false);
        return;
      }

      toast.success("Account created");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4 flex-col">

      <h1 className="text-white text-5xl hover:text-gray-400">
        Welcome to Rihvelle Finance
      </h1>

      <p className="mb-20 text-white">
        ....Secure loans. Simple repayments. Smarter financial growth
      </p>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-white">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">

          <input autoComplete="off"  placeholder="Full Name"  onChange={(e) =>
              setForm({ ...form, Fullname: e.target.value })}
            className="w-full p-4 bg-white/10 rounded-xl border border-white/20"/>

          <input autoComplete="off"  placeholder="Email"  onChange={(e) =>
              setForm({ ...form, email: e.target.value })}
            className="w-full p-4 bg-white/10 rounded-xl border border-white/20"/>

          <input autoComplete="new-password" type="password" placeholder="Password"
            onChange={(e) => setForm({ ...form, Password: e.target.value })}
            className="w-full p-4 bg-white/10 rounded-xl border border-white/20"/>


          <button disabled={loading}
            className="w-full bg-white text-black py-3 rounded-xl font-bold">
            {loading ? "Creating..." : "Register"}
          </button>
          <p className="text-center mt-4 text-sm text-gray-300">
            Already has an account? <Link to="/" className="text-white underline">Login</Link>
        </p>
        </form>
      </div>
    </div>
  );
}