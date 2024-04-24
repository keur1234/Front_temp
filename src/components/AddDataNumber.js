"use client"
import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import { usePointContext } from './usePointContext';
// import { useImageContext  } from '@/components/useImageContext'

import DrawCircle from "@/components/draw_circle"

export default function AddDataNumber({ onNext, onBack, currentInde, dataLength }) {
  const { data, updateData, editData } = usePointContext();
  
  const [circleRadius, setCircleRadius] = useState(data[2]); 

  const handleSliderChange = (value) => {
    setCircleRadius(value);
  };

  const handleUpdateData = () => {
    updateData(circleRadius);
    onNext(); 
  };

  const handleEditData = () => {
    editData()
    onBack(); 
  };  
  console.log(data)
  return (
    <form className="flex flex-col justify-between items-center">
      <div className="flex flex-col w-full h-max max-h-fit lg:flex-row items-center ">

        <DrawCircle circleRadius={circleRadius} Xaxis={data[0]} Yaxis={data[1]}/>
        
        <div className="text-xl md:text-3xl bg-white w-full rounded-[28px] drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] mt-8 lg:ml-12 lg:mt-0 lg:h-[500px]">
          <div className='p-3 px-4 md:p-8 rounded-tl-[28px] rounded-tr-[28px] bg-[#D9D9D9]'>
            <p>{currentInde} of {dataLength}</p>
          </div>
          <div className='p-2 px-4 md:p-6 h-full flex flex-col '>
            <div className='mb-4 md:mb-8 flex flex-col md:flex-row'>
              <label>Confirm Inhibition Zone : </label>
              <label>{circleRadius}</label>
            </div>
            <Slider 
              min={40}  
              max={440} 
              step={0.01}
              value={circleRadius} 
              onChange={handleSliderChange}
            />
          <div className = 'flex-col flex items-start '>
        <div className = 'flex mt-6'>
          <input
            id="circleRadiusCheckbox"
            type="checkbox"
            checked={circleRadius === 76}
            onChange={(e) => setCircleRadius(e.target.checked ? 76 : 0)}
            className="h-6 w-6 mr-4"
          />
          <label htmlFor="circleRadiusCheckbox" className="text-lg md:text-2xl">
          This Pellet Have No Inhibition Zone
          </label>
        </div>

        <div className = 'flex mt-6'>
          <input
            id="circleRadiusCheckbox2"
            type="checkbox"
            checked={circleRadius === data[2]}
            onChange={(e) => setCircleRadius(e.target.checked ? data[2] : 0)}
            className="h-6 w-6 mr-4"
          />
          <label htmlFor="circleRadiusCheckbox2" className="text-lg md:text-2xl">
          Use Prediction
          </label>
        </div>

         
          </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end m-8 ">
        <button 
          className="text-xl md:text-3xl py-3 md:py-5 px-16 md:px-24 font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] rounded-full bg-[#CDCDCD] hover:bg-[#AAAAAA] mx-2"
          type="button" 
          onClick={() => handleEditData()}  
        >
          BACK
        </button>
        <button 
          className="text-xl md:text-3xl py-3 md:py-5 px-16 md:px-24 font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] rounded-full bg-[#CDCDCD] hover:bg-[#AAAAAA] active:bg-[#888888]"
          type="button" 
          onClick={() => handleUpdateData(circleRadius)}  
        >
          NEXT
        </button>
        
      </div>
    </form>
  );
};

