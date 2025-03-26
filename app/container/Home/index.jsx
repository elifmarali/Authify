import React from "react";
import Banner from "../../component/Banner";
import Grid from "@mui/material/Grid2";
import HomeMain from "../HomeMain";

function HomeContainer() {
  return (
    <Grid className="h-full">
      <Banner />
      <HomeMain />
    </Grid>
  );
}

export default HomeContainer;
