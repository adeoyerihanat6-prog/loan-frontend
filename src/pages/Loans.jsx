import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    amount: "",
    interestRate: "",
    term: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("http://localhost:4000/api/users/me", {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) setUser(data);
    };

    fetchUser();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/loans/getAllLoans", {
        credentials: "include",
      });

      const data = await res.json();

      const list = Array.isArray(data) ? data : [];

      const filtered =
        user?.role === "admin"
          ? list
          : list.filter((l) => l.borrower?._id === user?.id);

      setLoans(filtered);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchLoans();
  }, [user]);

  const createLoan = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/loans/createLoan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Loan created");
      setForm({ amount: "", interestRate: "", term: "" });
      fetchLoans();

    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 text-white">

      <h1 className="text-2xl mb-6">My Loans</h1>

      <form onSubmit={createLoan} className="grid md:grid-cols-3 gap-3 mb-8">

        <input
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="p-3 rounded-xl bg-white/10 border border-white/20"
        />

        <input
          placeholder="Interest Rate"
          value={form.interestRate}
          onChange={(e) => setForm({ ...form, interestRate: e.target.value })}
          className="p-3 rounded-xl bg-white/10 border border-white/20"
        />

        <input
          placeholder="Term"
          value={form.term}
          onChange={(e) => setForm({ ...form, term: e.target.value })}
          className="p-3 rounded-xl bg-white/10 border border-white/20"
        />

        <button className="md:col-span-3 bg-white text-black py-3 rounded-xl font-bold">
          Apply Loan
        </button>

      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        loans.map((loan) => (
          <div key={loan._id} className="bg-white/10 p-5 rounded-2xl border border-white/20 mb-3">
            <p>Amount: ₦{loan.amount}</p>
            <p>Status: {loan.status}</p>
          </div>
        ))
      )}
    </div>
  );
}