import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 import
import axios from "../api";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 🔹 setup

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert(`${res.data.message}\nInserted: ${res.data.inserted}, Skipped: ${res.data.skipped}`);
      navigate("/leads"); // 🔹 redirect to Leads

    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Upload Leads</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          ← Back to Dashboard
        </button>
      </div>

      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-200
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default Upload;
