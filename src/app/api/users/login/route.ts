import Connect from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Add this line to import the 'jwt' module


Connect();

export async function POST(request: NextRequest) {
try{
    const reqBody = await request.json();
    const {email, password} = reqBody;

    //check if user exists
 const user = await User.findOne({email})
 if(!user){
    return NextResponse.json({error: "user doesnot exits"}, {status: 400})
 }
 console.log("user Exists");
 //check the password is correct

  const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return NextResponse.json({error: "Invalid password"}, {status: 400})
    }
    // create token data
    const tokenData ={
        id: user._id,
        email: user.email,
        username: user.username,
    
    }
    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

    const response = NextResponse.json({
        message: "Login successful",
        success: true,
        
    });
    response.cookies.set("token", token, {
        httpOnly:true,
    });
    return response;
} catch (error: any){
     return NextResponse.json({error: error.message}, {status: 500})
}
}