// src/pages/Dashboard.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("run", Date.now());
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      // console.log("Token saved:", token);
      // Clear token from URL without reloading
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}

export default Dashboard;
