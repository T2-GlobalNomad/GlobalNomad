"use client";

import { useState } from "react";
import Dropdown from "@/components/Dropdown";
// import styles from "./LandingPage.module.css";

export default function Home() {
  const [selectedSort, setSelectedSort] = useState("최신순");

  return (
    <>
      <p>Landing(main)</p>
      <Dropdown
        options={["최신순", "낮은가격순", "높은가격순"]}
        selected={selectedSort}
        onChange={setSelectedSort}
      />
    </>
  );
}
