import { getTokenFromData } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"

import {Connect} from "@/dbconfig/dbconfig";
import { connect } from "tls";
Connect();

export aysnc function GET(request: NextRequest) {
    try{
        const userId = await getDataFromToken(request);
         const user = await User.findOne({_id: userId});
         

select("-password") ;        })
    }
    catch(error: any){
        return NextResponse.json({ error: error.message }, {status: 500});
    }
}
