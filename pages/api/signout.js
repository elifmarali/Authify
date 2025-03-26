import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out" });

  response.cookies.set("token", "", {
    path: "/",
    maxAge: 0, // Çerezi hemen sil
  });

  return response;
}
