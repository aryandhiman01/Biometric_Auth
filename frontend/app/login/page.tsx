"use client";

import { useState } from "react";
import axios from "axios";
import { startAuthentication } from "@simplewebauthn/browser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      // 1️⃣ Get login options from backend
      const { data: options } = await axios.post(
        "http://localhost:5000/api/auth/login-options",
        { email }
      );

      // 2️⃣ Start authentication (fingerprint / PIN / face)
      const authResp = await startAuthentication(options);

      // 3️⃣ Verify on backend
      const verify = await axios.post(
        "http://localhost:5000/api/auth/verify-login",
        {
          email,
          response: authResp,
        }
      );

      if (verify.data.success) {
        alert("✅ Login Success");
      } else {
        alert("❌ Login Failed");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Login Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "15px" }}>🔐 Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "none",
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Loading..." : "👉 Login with Passkey"}
        </button>
      </div>
    </div>
  );
}