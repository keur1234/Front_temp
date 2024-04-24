"use client"
import { useInputData } from '@/components/useInputData';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export default function Result() {
  const { astId, bacteria, name, testData } = useInputData();
  const date = new Date();
  // Get the current date in the format "YYYY-MM-DD"

  const day = date.getDate(); // Extract the day
  const monthName = date.toLocaleString('default', { month: 'long' }); // Full month name
  const year = date.getFullYear(); // Extract the year
  const router = useRouter  ();

  const ApiSendData = async () => {
    try {
      const response = await axios.post('https://clear-zone.duckdns.org:5000/api/add_data', {
        astId: astId,
        bacteria: bacteria,
        name: name,
        newDataPoint: testData
      });
      if (response){
        router.push('/')
      } else {
        console.error('fail to send data');
      }
    } catch (error) {
        console.error('Error Add data:', error.message);
    }
  };

  return (
    <main className="flex flex-col mt-20 w-5/6">
      <div className="flex flex-col w-full">
        <p className="text-2xl md:text-4xl font-bold">Result</p>
        <p className="md:text-xl text-[#545454]">The result info of the test</p>
      </div>

      <div className="bg-white w-full rounded-[28px] drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] mt-8 ">
        <div className='text-xl md:text-2xl p-4 md:p-9 h-full flex flex-col justify-between'>
          <p className='mb-3 md:mb-6 text-2xl md:text-3xl font-bold'>Testing information</p>
          <div className="flex flex-col md:flex-row mb-1 md:mb-2">
            <label className="font-bold">AST ID :&nbsp;</label>
            <label> {astId}</label>
          </div>
          <div className="flex flex-col md:flex-row mb-1 md:mb-2">
            <label className="font-bold">Date of antibiogram :&nbsp;</label>
            <label>{`${day} ${monthName} ${year}`}</label>
          </div>
          <div className="flex flex-col md:flex-row mb-1 md:mb-2">
            <label className="font-bold">Bacteria :&nbsp;</label>
            <label> {bacteria}</label>
          </div>
          <div className="flex flex-col md:flex-row mb-1 md:mb-2">
            <label className="font-bold">Performed by :&nbsp;</label>
            <label>{name}</label>
          </div>
          {/* <p>This is correct</p> */}
        </div>
      </div>

      <div className="bg-white w-full rounded-[28px] drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] mt-8">
        <div className='text-xl md:text-2xl p-4 md:p-9 h-full flex flex-col justify-between'>
          <p className='mb-3 md:mb-6 text-2xl md:text-3xl font-bold'>Antibiotics tested</p>

            {testData.map((data, index) => {
              return <div key={index} className="mb-4 md:mb-2 flex flex-col md:flex-row w-4/5 justify-between">
                  <label className="font-bold">{ data[0]}</label>
                  <label>
                    {data[0] !== "Antimicrobial or Bacteria not found" && (
                      <label>{data[1]}</label>
                    )}
                    <label>&nbsp;&nbsp;({data[2]}mm)</label>
                  </label>
                </div>
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
        <button 
          className="text-xl md:text-3xl py-3 md:py-5 px-16 md:px-24 font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] rounded-full bg-[#CDCDCD] mx-2"
          type="button" onClick={() => ApiSendData()}
        >
          SAVE
        </button>
      </div>

    </main>
  )
}