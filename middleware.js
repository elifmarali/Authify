import { NextResponse } from "next/server";
import { verifyJWTToken } from "./libs/auth";

const AUTH_PAGES = ["/signin", "/signup"];

const ADMIN_PAGES = ["/panel"];

const isAuthPage = (pathname) => AUTH_PAGES.includes(pathname);

const isAdminPage = (pathname) => ADMIN_PAGES.includes(pathname);

export async function middleware(req) {
  const { nextUrl, cookies } = req;

  // Çerezden token al
  const token = cookies.get("token")?.value || null;

  // Token geçerli mi kontrol et
  const hasVerifiedToken = token ? await verifyJWTToken(token) : null;

  const isAuthPageRequested = isAuthPage(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (hasVerifiedToken) {
      // Kullanıcı giriş yapmışsa, ana sayfaya yönlendir
      return NextResponse.redirect(new URL("/", req.url));
    }
    // Eğer kullanıcı giriş yapmamışsa, giriş sayfasına devam etmesine izin ver
    return NextResponse.next();
  }

  if (!hasVerifiedToken) {
    // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);

    // Yeni yanıt oluştur ve çerezi sil
    const response = NextResponse.redirect(
      new URL(`/signin?${searchParams}`, req.url)
    );
    response.cookies.delete("token");
    return response;
  }

  const {role} = hasVerifiedToken;

  if (isAdminPage(nextUrl.pathname) && role !== "admin") {
    return NextResponse.redirect(new URL("/notAdminWarning", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/panel"],
};
