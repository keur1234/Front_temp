"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useImageContext  } from '@/components/useImageContext'

export default function Analysis_Image() {
  const { image } = useImageContext();

  return (
    <main className="flex flex-col justify-between items-center mt-20 w-5/6">
      <h1 className="font-bold text-4xl text-center pb-16">ANALYSIS IMAGE</h1>
      <div className="flex w-full h-max max-h-fit">
        {image && <img 
          src={URL.createObjectURL(image)} 
          width={500}
          height={500}
          alt="Uploaded Image" 
        />}
        <div className="text-3xl ml-12 bg-white w-full rounded-[28px] drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]">
          <div className='p-8 rounded-tl-[28px] rounded-tr-[28px] bg-[#D9D9D9]'>
            <p>1 of 4</p>
          </div>
          <div className='p-12 h-full flex flex-col justify-between'>
            <div>
              <p className='mb-8'>Confirm antibiotic name</p>
              <select className="border border-white border-b-stone-500 outline-none " name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </div>
            {/* <p>This is correct</p> */}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end mb-8 ">
        <Link href={`/Measure_Dose`}>
          <button className="font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] text-3xl py-6 px-32 rounded-full bg-[#CDCDCD]">
            NEXT
          </button>
        </Link>
      </div>
    </main>
  )
  }
  