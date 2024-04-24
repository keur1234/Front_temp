"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ResultById({params}) {
  
  const router = useRouter  ();
  const [astId, setAstId] = useState(params)
  const [resultData, setResultData] = useState([])
  const [resultLogs, setResultLogs] = useState([])

  console.log("params",params)

  const fetchDataResultById = async () => {
    try {
        const response = await axios.post('https://clear-zone.duckdns.org:5000/api/get_data_by_astID', {
          astID: astId.slug
        });
        const responseData = response.data
        if (responseData) {
          setResultData(responseData);
          setResultLogs(responseData.logs);
        } else {
            console.error('No data received from API');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchDataResultById()
  }, []);

  console.log("resultData",resultData)

  return (
    <main className="flex flex-col mt-20 w-5/6">
      <div className="flex flex-col w-full">
        <p className="text-2xl md:text-4xl font-bold">Result of AST ID : {resultData.astID}</p>
        <p className="md:text-xl text-[#545454]">The result info of the test </p>
      </div>

      <div className="bg-white w-full rounded-[28px] drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] mt-8 ">
        <div className='text-xl md:text-2xl p-4 md:p-9 h-full flex flex-col justify-between'>
          <p className='mb-3 md:mb-6 text-2xl md:text-3xl font-bold'>Testing information</p>
          <div className="flex flex-col md:flex-row mb-1 md:mb-2">
            <label className="font-bold">AST ID :&nbsp;</label>
            <label> {resultData.astID}</label>
          </div>
          <div className="flex flex-col md:flex-row mb-1 md:mb-2">
            <label className="font-bold">Date of antibiogram :&nbsp;</label>
            <label> {resultData.date}</label>
          </div>
          <div className="flex flex-col md:flex-row mb-1 md:mb-2">
            <label className="font-bold">Bacteria :&nbsp;</label>
            <label> {resultData.bacteriasName}</label>
          </div>
          <div className="flex flex-col md:flex-row mb-1 md:mb-2">
            <label className="font-bold">Performed by :&nbsp;</label>
            <label>{resultData.userName}</label>
          </div>
        </div>
      </div>

      <div className="bg-white w-full rounded-[28px] drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] mt-8">
        <div className='text-xl md:text-2xl p-4 md:p-9 h-full flex flex-col justify-between'>
          <p className='mb-3 md:mb-6 text-2xl md:text-3xl font-bold'>Antibiotics tested</p>

      {resultLogs && resultLogs.map((data, index) => {
        return (
          <div key={index} className="mb-4 md:mb-2 flex flex-col md:flex-row w-4/5 justify-between">
            <label className="font-bold">{data[1]} :</label>
            <label>
              {data[1] !== "Antimicrobial or Bacteria not found" && (
                <label>{data[2]}</label>
              )}
              <label>&nbsp;&nbsp;({data[0]}mm)</label>
            </label>
          </div>
        );
      })}
        </div>
      </div>

      <div className="flex w-full justify-end m-8 ">
        <button 
          className="text-xl md:text-3xl py-3 md:py-5 px-16 md:px-24 font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] rounded-full bg-[#CDCDCD] mx-2"
          type="button" onClick={() => router.push('/')}
        >
          HOME
        </button>
      </div>

    </main>
  )
}