"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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
    if (user.email.length>0 && user.password.length>0 && user.username.length>0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  },[user]);
  const [loading, setLoading] = React.useState(false);
  const onSignUp = async () => {
    try{
setLoading(true);
const response =await axios.post("/api/users/signup", user)
console.log("sign up success",response.data);
router.push("/login");
}
    catch(error: any){
console.log(error)
console.log("signup failed",error.message);
toast.error(error.message);
}
    finally
 {
  setLoading(false);

 }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-5 ">
      <h1 className=" p-5 text-3xl pb-20">Sign up</h1>
      <div className="p-1 ">
        <label htmlFor="username">username</label>
        <input
          type="username"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder=" Enter your username"
          className="p-2 mx-4 border  rounded-lg text-black mb-4 focus:outline-none focus:border-gray-600"
        />
      </div>
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
          onClick={onSignUp}
        >
{buttonDisabled ? "No signup" : "signup"}        </button> <br />
        <Link href="/login">Go to Login Page</Link>

      </div>
    </div>
  );
}

export default page;
