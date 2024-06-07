"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
function page() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const onLogin = async () => {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-5 ">
      <h1 className=" p-5 text-3xl pb-20">Login</h1>
      <div className="p-1 ">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder=" Enter your email"
          className="p-2 mx-4 border  rounded-lg text-black mb-4 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="p-1 ">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder=" Enter your password"
          className="p-2 mx-4 border  rounded-lg text-black mb-4 focus:outline-none focus:border-gray-600"
        />
      </div>
      <div className="flex flex-col justify-center">
        <button
          className="p-2 border px-4 hover:bg-gray-300 hover:text-black font-semibold mt-10 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={onLogin}
        >
          Login
        </button><br />
        <Link href="/signup">Go to SignUp Page</Link>
      </div>
    </div>
  );
}

export default page;
