"use client"
import { createContext, useContext, useState } from 'react';

const InputData = createContext();

export const InputProvider = ({ children }) => {
  const [astId, setAstId] = useState("");
  const [bacteria, setBacteria] = useState();
  const [name, setName] = useState("");
  const [newDataPoint, setNewDataPoint] = useState([]);
  const [testData, setTestData] = useState([]);

  return (
    <InputData.Provider value={{ astId, setAstId, bacteria, setBacteria, name, setName, newDataPoint, setNewDataPoint, testData, setTestData }}>
      {children}
    </InputData.Provider>
  );
};

export const useInputData = () => useContext(InputData);
