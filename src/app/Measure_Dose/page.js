"use client"

import { useState } from 'react';
import Image from 'next/image'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import { useImageContext  } from '@/components/useImageContext'


import DrawCircle from "@/components/draw_circle"

export default function Measure_Dose() {
  const { image } = useImageContext();
  
  const [circleRadius, setCircleRadius] = useState(67.9); 

  const handleSliderChange = (value) => {
    setCircleRadius(value);
  };

  const imageUrl = URL.createObjectURL(image)
  
  return (
    <main className="flex flex-col justify-between items-center mt-20 w-5/6">
      <h1 className="font-bold text-4xl text-center pb-16">ANALYSIS IMAGE</h1>
      
      <div className="flex w-full h-max max-h-fit">
        
        <DrawCircle image={imageUrl} circleRadius={circleRadius}/>
        
        <div className="text-3xl ml-12 bg-white w-full rounded-[28px] drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]">
          <div className='p-8 rounded-tl-[28px] rounded-tr-[28px] bg-[#D9D9D9]'>
            <p>1 of 4</p>
          </div>
          <div className='p-12 h-full flex flex-col justify-between'>
            <div>
              <p className='mb-8'>Confirm Inhibition Zone : {circleRadius}</p>
              <Slider 
                min={40}  
                max={400} 
                step={0.01}
                value={circleRadius} 
                onChange={handleSliderChange}
              />
            </div>
          </div>
        </div>
      </div>

    
      {/* ([587.5,1302.5,67.9],
      [1263.5,1415.5,66.8],
      [791.5,643.5,67.9],
      [1447.5,793.5,69.0]) */}


      <div className="flex w-full justify-end mb-8 ">
        <button className="font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] text-3xl py-6 px-32 rounded-full bg-[#CDCDCD]">NEXT</button>
      </div>
    </main>
  )
  }
  