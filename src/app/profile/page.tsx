"use client";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import router, { useRouter } from "next/navigation";



function ProfilePage() {
  const router = useRouter();
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

  return (
    <div>
        <h1>Profile Page</h1>
        <hr/>
        
        <button
          className="p-2 border px-4 hover:bg-gray-300 hover:text-black font-semibold mt-10 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={logout}
        >
          Log Out
        </button>
    </div>
  )
}

export default ProfilePage;
