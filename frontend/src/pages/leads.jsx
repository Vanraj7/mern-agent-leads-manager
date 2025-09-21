import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 import navigation
import API from "../api";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 🔹 setup navigation

  useEffect(() => {
    fetchLeads();
    fetchAgents();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (err) {
      setError("Failed to load leads");
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await API.get("/agents");
      setAgents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = selectedAgent
    ? leads.filter((lead) => lead.assignedTo?._id === selectedAgent)
    : leads;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">All Leads</h2>
        <button
          onClick={() => navigate("/dashboard")} // 🔹 go back
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          ← Back to Dashboard
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {/* Dropdown filter */}
      <div className="mb-4">
        <select
          className="border p-2 rounded"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
        >
          <option value="">-- Show All Agents --</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      {/* Leads Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">First Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Notes</th>
            <th className="p-2 border">Assigned Agent</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead._id}>
              <td className="p-2 border">{lead.firstName}</td>
              <td className="p-2 border">{lead.phone}</td>
              <td className="p-2 border">{lead.notes}</td>
              <td className="p-2 border">{lead.assignedTo?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leads;
