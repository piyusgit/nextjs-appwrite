"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
export default function ResetPassword() {
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const handleReset = async () => {
    // implement reset password logic here
    try {
      setLoading(true);
      setError("");
      setMsg("");
      const response = await axios.post("/api/users/resetpassword", {
        passwordData,
        token,
      });
      console.log("Password reset", response.data);
      //   toast.success(response.data.message);
      setMsg(response.data.message);
    } catch (error: any) {
      console.log(error.response.data);
      const errorMessage = error.response?.data?.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/* Success or Error Messages */}
      {msg && <div className="text-2xl text-green-500 mb-4">{msg}</div>}
      {error && <div className="text-2xl text-red-500 mb-4">{error}</div>}

      {/* Heading */}
      <h1 className="text-3xl text-center mb-6">
        {loading ? "Processing..." : "Reset Password"}
      </h1>

      {/* Form */}
      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 text-lg">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your new password"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) =>
              setPasswordData({ ...passwordData, password: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-1 text-lg">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your new password"
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>

        <button
          className={`p-2 border rounded-lg text-black ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 border-orange-300 hover:bg-orange-600"
          }`}
          onClick={handleReset}
          disabled={loading}
        >
          {loading ? "Please Wait..." : "Reset Password"}
        </button>
        <hr />
        {msg && (
          <div className="text-2xl text-blue-500 mb-4 ">
            <Link className="text-center" href="/login">
              Go to Login Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
