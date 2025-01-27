"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {
        token,
      });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Verify Email</div>
      <h2 className="text-2xl mt-4">
        {token ? `Token: ${token}` : "No token found"}
      </h2>
      {verified && (
        <div className="text-2xl text-green-500">
          Your email has been verified
        </div>
      )}
      {error && (
        <div className="text-2xl text-red-500">
          Something went wrong. Please try again
        </div>
      )}
      <Link className="text-blue-500 mt-4" href="/login">
        Go to login
      </Link>
    </div>
  );
}
