import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 import
import API from "../api";

function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 🔹 setup

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await API.get("/agents");
      setAgents(res.data);
    } catch (err) {
      setError("Failed to load agents");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/agents", form);
      setForm({ name: "", email: "", mobile: "", password: "" });
      fetchAgents();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating agent");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Agents</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          ← Back to Dashboard
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Mobile"
          className="border p-2 rounded"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent._id}>
              <td className="p-2 border">{agent.name}</td>
              <td className="p-2 border">{agent.email}</td>
              <td className="p-2 border">{agent.mobile}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Agents;
