"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; 
import { useImageContext } from '@/components/useImageContext'
import DrawCircle from "@/components/draw_circle"

export default function Measure_Dose() {
  const { image } = useImageContext();
  const [imageUrl, setImageUrl] = useState(null); // Initialize imageUrl as null

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  const [circleRadius, setCircleRadius] = useState(67.9); 

  const handleSliderChange = (value) => {
    setCircleRadius(value);
  };

  return (
    <main className="flex flex-col justify-between items-center mt-20 w-5/6">
      <h1 className="font-bold text-4xl text-center pb-16">ANALYSIS IMAGE</h1>
      
      <div className="flex w-full h-max max-h-fit">
        
        {imageUrl && <DrawCircle image={imageUrl} circleRadius={circleRadius}/>}
        
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

      <div className="flex w-full justify-end mb-8 ">
        <button className="font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] text-3xl py-6 px-32 rounded-full bg-[#CDCDCD]">NEXT</button>
      </div>
    </main>
  )
}
