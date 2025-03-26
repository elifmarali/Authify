import { jwtVerify } from "jose";

const getJwtSecretKey = ()=>{
    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

    if(!secretKey){
        throw new Error("JWT secret key is not avilable")
    }

    return new TextEncoder().encode(secretKey);
}

export async function verifyJWTToken(token) {        
    try{        
        const {payload}= await jwtVerify(token,getJwtSecretKey());
        return payload;        
    }catch(err){
        return null;
    }
}