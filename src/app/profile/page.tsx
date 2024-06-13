"use client";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import router, { useRouter } from "next/navigation";
import { useState } from "react";



function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
const logout = async () => {

  try{
    await axios.get("/api/users/logout");
    toast.success("Logout successful");
    router.push("/login");
  }
  catch(error: any){
    console.log("logout failed", error.message);
    toast.error(error.message);
  }
}
const getUserDetails = async () => {
  const res = await axios.get("/api/users/me");
  console.log(res.data);
setData(res.data.data._id);
} 
  return (
    <div>
        <h1>Profile </h1>
        <hr/>
        <p>Profile page</p>
        <h2 className="rounded p-3 bg-orange-500">{data=="nothing" ? "Nothing" : <Link href={`/profile/${data}`}>
        {data}
        </Link>}</h2>

        
        <button
          className="p-2 border px-4 hover:bg-gray-300 hover:text-black font-semibold mt-10 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={logout}
        >
          Log Out
        </button>
        <button
          className="p-2 border px-4 hover:bg-gray-300 hover:text-black font-semibold mt-10 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={getUserDetails}
        >
Get user details        </button>
    </div>
  )
}

export default ProfilePage;
