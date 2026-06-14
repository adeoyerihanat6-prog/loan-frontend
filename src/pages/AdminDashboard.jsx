import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchLoans = async () => {
    try {
      setLoading(true);

      const res = await fetch("https://project-toff.onrender.com/api/loans/getAllLoans", {
        credentials: "include",
      });

      const data = await res.json();

     
      setLoans(Array.isArray(data) ? data : data.loans || []);

    } catch (err) {
      console.log(err);
      toast.error("Failed to load loans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const approve = async (id) => {
    try {
      setActionLoading(id);

      const res = await fetch(
        `https://project-toff.onrender.com/api/loans/${id}/approve`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Approval failed");
        return;
      }

      toast.success("Loan approved successfully");
      fetchLoans();
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    } finally {
      setActionLoading(null);
    }
  };

  const reject = async (id) => {
    try {
      setActionLoading(id);

      const res = await fetch(
        `https://project-toff.onrender.com/api/loans/${id}/reject`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Rejection failed");
        return;
      }

      toast.error("Loan rejected");
      fetchLoans();
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 text-white">

      <h1 className="text-2xl mb-6 font-bold">Admin Panel</h1>

     
      {loading && <p className="text-gray-300">Loading loans...</p>}

      
      {!loading && loans.length === 0 && (
        <p className="text-gray-400">No loans found yet</p>
      )}

      <div className="space-y-4">

        {loans.map((loan) => (
          <div
            key={loan._id}
            className="bg-white/10 p-6 rounded-3xl border border-white/20 flex justify-between items-center hover:scale-[1.01] transition"
          >

            {/* LEFT SIDE */}
            <div>
              <p className="text-lg font-semibold">₦{loan.amount}</p>

              <p
                className={`text-sm mt-1 ${
                  loan.status === "approved"
                    ? "text-green-400"
                    : loan.status === "rejected"
                    ? "text-red-400"
                    : loan.status === "completed"
                    ? "text-blue-400"
                    : "text-yellow-300"
                }`}
              >
                {loan.status}
              </p>

              {/* extra realism */}
              <p className="text-xs text-gray-400 mt-1">
                Term: {loan.term} months | Interest: {loan.interestRate}%
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex gap-2">

              <button
                onClick={() => approve(loan._id)}
                disabled={actionLoading === loan._id}
                className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 disabled:opacity-50"
              >
                {actionLoading === loan._id ? "..." : "Approve"}
              </button>

              <button
                onClick={() => reject(loan._id)}
                disabled={actionLoading === loan._id}
                className="bg-red-500 px-4 py-2 rounded-xl hover:bg-red-600 disabled:opacity-50"
              >
                {actionLoading === loan._id ? "..." : "Reject"}
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}