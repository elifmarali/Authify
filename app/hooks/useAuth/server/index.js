import { verifyJWTToken } from "../../../../libs/auth"; 
import { cookies } from "next/headers";

export const getAuthFromServer = async () => {
  const cookieList = cookies();
  const { value: token } = cookieList.get("token") ?? { value: null };
  
  if (!token) return null;

  try {
    const verifiedToken = await verifyJWTToken(token);
    return verifiedToken;
  } catch (error) {
    console.error("JWT Token doğrulama hatası:", error);
    return null;
  }
};
