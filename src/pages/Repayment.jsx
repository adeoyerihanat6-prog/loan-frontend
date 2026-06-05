import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Repayment() {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    const res = await fetch("http://localhost:4000/api/loans/getAllLoans", {
      credentials: "include",
    });

    const data = await res.json();
    setLoans(data);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const pay = async (loanId, month) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/loans/${loanId}/pay/${month}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Payment successful");
      fetchLoans();
    } catch {
      toast.error("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-6 text-white">

      <h1 className="text-2xl mb-6">Repayments</h1>

      {loans.map((loan) => (
        <div key={loan._id} className="bg-white/10 p-5 rounded-2xl border border-white/20 mb-4">
          <p>Loan: ₦{loan.amount}</p>
          <p>Status: {loan.status}</p>

          {loan.repaymentPlan?.map((r) => (
            <div key={r.month} className="flex justify-between items-center mt-2">
              <p>
                Month {r.month} - ₦{r.amount} -{" "}
                {r.paid ? "Paid" : "Pending"}
              </p>

              {!r.paid && loan.status === "approved" && (
                <button onClick={() => pay(loan._id, r.month)} className="bg-green-500 px-3 py-1 rounded-xl">
                  Pay
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}