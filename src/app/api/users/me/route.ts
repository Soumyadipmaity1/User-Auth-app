import { getTokenFromData } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"
import Connect from "@/dbconfig/dbconfig";
 Connect();

export async function GET(request: NextRequest) {
    try{
        const userId = await getTokenFromData(request);
         const user = await User.findOne({_id: userId}).
         select("-password ");
         return NextResponse.json({
            message: "User found",
            data: user
         });
         

    }
    catch(error: any){
        return NextResponse.json({ error: error.message }, {status: 400});
    }
}