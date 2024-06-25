import Connect from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


Connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);

       const user = await User.findOne({verifyToken: token, verifyTokenExpire: {$gt: Date.now()}})
    if(!user){
        return NextResponse.json({error: "Invalid or Expired Token"}, {status: 400});
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;
    await user.save();
    return NextResponse.json({
        message: "Email Verified Successfully",
        success: true
    });
}

    catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
    

}