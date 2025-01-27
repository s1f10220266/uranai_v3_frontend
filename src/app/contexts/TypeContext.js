"use client";

import React, { createContext, useContext, useState } from "react";

// Contextの作成
const TypeContext = createContext();

export const TypeProvider = ({ children }) => {
  const [typeResult, setTypeResult] = useState(null);
  const [scenarioResult, setScenarioResult] = useState(null);
  const [typeExplain, setTypeExplain] = useState(null);
  const [inputJob, setInputJob] = useState(null);

  const saveTypeResult = (result) => {
    setTypeResult(result);
  };

  const saveTypeExplain = (explain) => {
    setTypeExplain(explain);
  }

  const saveScenarioResult = (result) => {
    setScenarioResult(result);
  };

  const saveInputJob = (input) => {
    setInputJob(input);
  }

  const resetTypeContext = () => {
    setTypeResult(null);
    setTypeExplain(null);
    setScenarioResult(null);
    setInputJob(null);
  }



  return (
    <TypeContext.Provider value={{ typeResult, saveTypeResult, scenarioResult, saveScenarioResult, typeExplain, saveTypeExplain, inputJob, saveInputJob, resetTypeContext }}>
      {children}
    </TypeContext.Provider>
  );
};

export const useType = () => {
  const context = useContext(TypeContext);
  if (!context) {
    throw new Error("useType must be used within a TypeProvider");
  }
  return context;
};
