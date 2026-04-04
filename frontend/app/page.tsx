"use client";

import { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState<string>("");

  const handleRegister = async () => {
    try {
      const { data: options } = await axios.post(
        "http://localhost:5000/api/auth/register-options",
        { email }
      );

      const attResp = await startRegistration({
        optionsJSON: options,
      });

      try {
        const attResp = await startRegistration({
          optionsJSON: options,
        });

        if (!attResp) return;

      // next call  
    } catch (err: any) {
      console.log("USER CANCELLED OR TIMEOUT", err);
      return; // yahin stop kar do
    }

      const verify = await axios.post(
            "http://localhost:5000/api/auth/verify-register",
            {
              email,
              response: attResp,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
    );

      if (verify.data.success) {
        alert("✅ Registered Successfully!");
      } else {
        alert("❌ Registration Failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>🔐 BioAuth Register</h1>

        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button}>
          👉 Register with Fingerprint
        </button>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    padding: "30px",
    borderRadius: "12px",
    background: "#1e293b",
    color: "white",
    width: "300px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "15px 0",
  },
  button: {
    padding: "10px",
    width: "100%",
    background: "#3b82f6",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};