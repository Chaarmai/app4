import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard"; import RecentReports from "./pages/RecentReports";
import HistoricalData from "./pages/HistoricalData"; import Alerts from "./pages/Alerts";
export default function App() {
  return (
    <Router>
      <div className="flex h-screen text-white bg-[#0f172a]">
        <aside className="w-64 bg-[#1e293b] flex flex-col p-4 space-y-4">
          <h1 className="text-2xl font-bold mb-6">StormTrack AI</h1>
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/recent" className="hover:text-blue-400">Recent Reports</Link>
          <Link to="/historical" className="hover:text-blue-400">Historical Data</Link>
          <Link to="/alerts" className="hover:text-blue-400">Alerts</Link>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recent" element={<RecentReports />} />
            <Route path="/historical" element={<HistoricalData />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}