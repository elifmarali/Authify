import LeftSection from "../../component/LeftSection";
import React from "react";
import styles from "./styles.module.scss";

function HomeMain() {
  return (
    <div className={`!w-[40%] rounded-3xl bg-white h-[36rem] !p-6 !m-10 opacity-95 ${styles.homeMain}`}>
      <LeftSection />
    </div>
  );
}

export default HomeMain;
