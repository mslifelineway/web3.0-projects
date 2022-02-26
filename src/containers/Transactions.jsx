import React from "react";
import { Layout } from "../components";
import "../styles/transactions.css";

const Transactions = () => {
  return (
    <Layout>
      <div
        className="transactions"
        style={{
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          width: "100%",
        }}
      >
        All the transactions 💳💲🤑💸💰🧧👛 will show up here...! ✌😊
      </div>
    </Layout>
  );
};

export default Transactions;
