import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Loans from "./pages/Loans";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Repayment from "./pages/Repayment";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/repayment" element={<Repayment/>} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">

      

      </div>