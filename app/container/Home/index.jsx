import LeftImage from "@/app/component/LeftImage";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

function HomeContainer() {
  return (
    <div className={`flex w-[100%] h-[100%] justify-between`}>
      Home
      <div className="flex gap-4">
        <Link href="/signin">
          <Button variant="contained">Sign In</Button>
        </Link>
        <Link href="/signup">
          <Button variant="contained">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomeContainer;
