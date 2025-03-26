import React from "react";
import Banner from "../../component/Banner";
import Grid from "@mui/material/Grid2";
import HomeMain from "../HomeMain";
import Header from "../../component/Header";

function HomeContainer() {
  return (
    <Grid className="h-full">
      <Header />
      <Banner />
      <HomeMain />
    </Grid>
  );
}

export default HomeContainer;
