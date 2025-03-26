"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import styles from "./styles.module.scss";
import useAuth from "../../hooks/useAuth/client";
import Cookies from "universal-cookie";
function Header() {
  // client
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    console.log("auth : ", auth);
  }, [auth]);

  // server
  /* const auth = await getAuthFromServer();
  console.log("auth : ", auth);*/

  const signOut = async () => {
    try {
      await fetch("/api/signout", { method: "POST" });

      // Cookies içindeki token'ı hemen temizle
      const cookies = new Cookies();
      cookies.remove("token", { path: "/" });

      // Yetki bilgisini sıfırla
      setAuth(null);
    } catch (err) {
      console.log("[SignOut] error:", err.message);
    }
  };

  return (
    <div
      className={`flex w-full h-full max-h-[4rem] !px-4 !py-2 justify-between ${styles.bgHeader}`}
    >
      <Link href="/">
        <Image
          src={Logo}
          alt="Authify logo"
          className="rounded-xl"
          style={{ width: "20%", height: "20%" }}
        />
      </Link>
      <div className="flex gap-4 max-h-[40px]">
        {auth === null ? (
          <>
            <Button color="inherit" sx={{ ":hover": { color: "#CF5247" } }}>
              <Link href="/signin">Giriş Yap</Link>
            </Button>
            <Button color="inherit" sx={{ ":hover": { color: "#E30B5C" } }}>
              <Link href="/signup">Kayıt Ol</Link>
            </Button>
          </>
        ) : (
          <>
            <Button color="error" onClick={() => signOut()}>
              Çıkış Yap
            </Button>
            {auth.role === "admin" && (
              <Button color="secondary">
                <Link href="/panel">Panel</Link>
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
