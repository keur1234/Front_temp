"use client"

import { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const useImageContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [image, setImageDataUrl] = useState(null);

  const setImageData = (url) => {
    setImageDataUrl(url);
  };

  return (
    <ImageContext.Provider value={{ image, setImageData }}>
      {children}
      
    </ImageContext.Provider>
  );
};