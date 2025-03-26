"use client";
import React from "react";
import BgImage from "../../../public/bg-img.jpg";
import Image from "next/image";
import Grid from "@mui/material/Grid2";
import { Typography } from "@mui/material";

function LeftImage() {
  return (
    <div style={{height:"100%",width:"50%"}}>
      <Image
        src={BgImage}
        className="rounded-md w-[100%] h-[100%]"
        alt="Colorfull gradient"
      />
      <Grid container direction="column">
        <Grid
          size={6}
          sx={{
            position: "absolute",
            top: "20px",
            padding: "20px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            width: "50%",
            gap: "20px",
          }}
        >
          <Typography variant="p" color="gray" className="inline-block">
            A WISE QUOTE
          </Typography>
          <span className="h-[1px] bg-[gray] block w-[30%]" />
        </Grid>
        <Grid
          size={6}
          sx={{ position: "absolute", bottom: "20px", padding: "20px",width:"50%",paddingBottom:"40px"}}
        >
          <Typography variant="h2" color="rgb(12, 20, 253)" fontWeight={700} paddingBottom={2}>
            Get 
            <br />
            Everything
            <br />
            You Want
          </Typography>
          <Typography variant="h6" color="rgb(129, 129, 129)">
            You can get everything you went if you work hard. <br />
            Trust the process and stick to the plan.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default LeftImage;
