/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSend = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/users/forget", { email });
      toast.success(response.data.message || "Email sent successfully!");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to send the email. Try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {/* Heading */}
      <h1 className="text-3xl font-semibold text-center mb-4">
        {loading ? "Processing..." : "Forgot Password"}
      </h1>
      <h2 className="text-lg text-center mb-6">
        Enter your email to reset your password
      </h2>

      {/* Input for Email */}
      <div className="w-full max-w-md">
        <label
          htmlFor="email"
          className="block text-lg font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleEmailSend}
          disabled={loading}
          className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700 transition"
          }`}
        >
          {loading ? "Sending Email..." : "Send Email"}
        </button>
      </div>
    </div>
  );
}
