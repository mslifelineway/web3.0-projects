import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing, Transactions } from "./containers";
import "./App.css";
import { PAGE_PATHS } from "./utils/constants";
import { Loader } from "./components";

function App() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
  }, [isPageLoading]);

  if (isPageLoading) {
    return (
      <div className="bg__main">
        <Loader />
      </div>
    );
  }
  return (
    <Router>
      <Routes>
        <Route exact path={PAGE_PATHS.ROOT} element={<Landing />} />
        <Route path={PAGE_PATHS.TRANSACTIONS} element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;
