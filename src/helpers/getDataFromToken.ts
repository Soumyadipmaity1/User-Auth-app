import jwt from 'jsonwebtoken';
import { NextRequest } from "next/server";


export const getTokenFromData = (request: NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || "";
      jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    }
    catch(error: any){
    throw new Error(error.message);
    }
}