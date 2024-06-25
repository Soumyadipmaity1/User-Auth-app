"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

// import { Response } from 'next/server';
function page() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const [loading, setLoading] = React.useState(false);
  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log("sign up success", response.data);
      router.push("/login");
    }
    catch (error: any) {
      console.log(error)
      console.log("signup failed", error.message);
      toast.error(error.message);
    }
    finally {
      setLoading(false);

    }
  };
  return (
      <section className="flex flex-col items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center justify-center bg-[#181818] px-12 py-5 pb-10 form-shadow rounded-xl">
        <h1 className="p-5 font-bold text-orange-500 text-3xl pb-20">{loading ? "Processing" : "Sign Up"}</h1>
        <div className="p-1 flex items-center justify-center">
          <FaUser className="text-orange-500 mb-4 text-2xl" />
          <input
            type="text"
            value={user.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
            className="p-2 mx-4 border rounded-lg text-black mb-4 focus:outline-none focus:border-gray-600"
          />
        </div>
        <div className="p-1 flex items-center justify-center">
          <FaEnvelope className="text-orange-500 mb-4 text-2xl" />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            className="p-2 mx-4 border rounded-lg text-black mb-4 focus:outline-none focus:border-gray-600"
          />
        </div>
        <div className="p-1 flex items-center justify-center">
          <FaLock className="text-orange-500 mb-4 text-2xl" />
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            className="p-2 mx-4 border rounded-lg text-black mb-4 focus:outline-none focus:border-gray-600"
          />
        </div>
        <div className="flex flex-col justify-center">
          <button
            className={`p-2 border px-4 hover:bg-white hover:text-black font-semibold mt-10 border-white rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onSignUp}
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "No signup" : "Sign up"}
          </button>
          <br />
          <Link className="hover:underline p-1 rounded-md px-3" href="/login">Go to Login Page</Link>
        </div>
      </div>
      </section>
    );
}

export default page;
