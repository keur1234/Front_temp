"use client"
import { useState } from 'react';
import { useImageContext  } from '@/components/useImageContext'
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Import_Image() {
  const [image, setImage]  = useState();
  const [status, setStatus]  = useState('');
  const [loading, setLoading] = useState(false);
  const [processedImage, setProcessedImage] = React.useState(null);
  const { imageContext, setImageData } = useImageContext();
  const router = useRouter();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
        setStatus('')
        setLoading(true);
        setLoading('Analysing...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('https://clear-zone.duckdns.org:5000/api/process_image', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            setLoading(false);
            setStatus('Image upload Successfuly ');

            await new Promise(resolve => setTimeout(resolve, 1000));
            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);
            setProcessedImage(imgUrl);
            setImageData(imgUrl);
            router.push('/Analysis');
        } else {
          setStatus('Image upload failed: ' + response.message);
        }
    
        
    } catch (error) {
        setStatus('Image upload failed: ' + error.message);
        console.error('Error during image upload:', error);
    } finally {
    // Hide loading state
    setLoading(false);
}
  };

  return (
    
    <main className="flex flex-col justify-between items-center mt-20 w-5/6">
      <div className="flex flex-col w-3/4">
        <h1 className="text-2xl md:text-4xl pb-8 md:pb-16 font-bold text-center">UPLOAD DISC IMAGE</h1>
        
        <form className='flex flex-col items-center w-full px-4' action="">   
          <input 
            className='hidden'
            type="file" 
            accept="image/*"
            id="fileInput" 
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label 
            className='flex justify-center items-center bg-white p-2.5 rounded-lg outline-none w-full resize-none overflow-y-auto min-h-[500px] max-h-[900px]' 
            style={{ boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.5)'}} 
            htmlFor="fileInput" // Change "for" to "htmlFor"
          >
            {image && <img src={URL.createObjectURL(image)} alt="Uploaded Image" />}
          </label>
          <label  
            className='mt-4 md:mt-8 text-2xl md:text-4xl'
          >
            {loading}
            {status}
          </label>
          <label 
            className='text' 
            style={{ boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.5)'}} 

          >

          </label>

        </form>
      </div>

      <div className="flex w-full justify-end my-8 ">
        <button onClick={handleSubmit} className="text-xl md:text-3xl py-3 md:py-5 px-16 md:px-24  font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)] rounded-full bg-[#CDCDCD] hover:bg-[#AAAAAA] active:bg-[#888888]">
          NEXT
        </button>
      </div>
{/* 
      <div>
        {processedImage && <img src={processedImage} alt="Processed Image" />}
      </div> */}
    </main>
  )
}