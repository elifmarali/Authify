import LeftImage from "../../component/LeftImage";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import React from "react";
import Logo from "../../../public/logo.png";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import LoginForm from "../../component/LoginForm";

function Signin() {
  return (
    <div className="flex h-[100%] !p-4">
      <LeftImage />
      <div className="w-[50%] flex flex-col items-center justify-between">
        <Link href="/" style={{ padding: "8px", width: "26%", height: "10%" }}>
          <Image src={Logo} alt="Authify logo" className="rounded-3xl" />
        </Link>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "70%" }}
        >
          <Grid item size={12} sx={{ textAlign: "center" }}>
            <Typography variant="h5" fontWeight={500}>
              Tekrar hoşgeldiniz
            </Typography>
            <Typography variant="p" fontWeight={500} fontSize={12}>
              Hesabınıza erişmek için e-postanızı ve şifrenizi girin
            </Typography>
          </Grid>
          <Grid item size={12} paddingTop={3}>
            <LoginForm />
          </Grid>
        </Grid>
        <Box>
          <Typography
            variant="body1"
            fontSize={14}
            className="transition-all ease-linear duration-300"
          >
            Bir hesabın yok mu?
            <Link
              href="/signup"
              className="text-[#293fe3] text-[16px] inline-block transition-transform duration-300 ease-in-out hover:scale-110 hover:underline"
              style={{ fontSize: "16px", marginLeft: "3px" }}
            >
              Kayıt Ol
            </Link>
          </Typography>
        </Box>
      </div>
    </div>
  );
}

export default Signin;
