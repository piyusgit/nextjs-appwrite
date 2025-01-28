/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/user");
      console.log(response.data);
      setData(response.data.user._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="text-2xl mt-4 text-yellow-500">
        {data === "nothing" ? (
          "Kuch Nhi Hai!"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="p-2 mt-4 bg-green-600 border hover:bg-blue-700 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
      >
        Get User Details
      </button>
      <button
        onClick={handleLogout}
        className="p-2 mt-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
      >
        Logout
      </button>
    </div>
  );
}
