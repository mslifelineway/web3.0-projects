import React from "react";
import { Layout } from "../components";

const Landing = () => {
  return (
    <Layout>
      <div
        className="landing__page"
        style={{
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          width: "100%",
        }}
      >
        Welcome to moralis authentication app! ✌😊
      </div>
    </Layout>
  );
};

export default Landing;
