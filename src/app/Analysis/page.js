"use client"
import { useState, useEffect } from 'react';
import { PointProvider } from '@/components/usePointContext';
import AddDataName from '@/components/AddDataName';
import AddDataNumber from '@/components/AddDataNumber';

import axios from 'axios';

export default function Analysis() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showNameInput, setShowNameInput] = useState(true);
    const [dataSet, setDataSet] = useState([]);

    const fetchDataFromApi = async () => {
        try {
            const response = await axios.get('https://clear-zone.duckdns.org:5000/api/med_info');
            const responseData = response.data
            if (responseData) {
                setDataSet(responseData);
            } else {
                console.error('No data received from API');
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    useEffect(() => {
        fetchDataFromApi()
    }, []);

    const handleNext = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setShowNameInput(true); // กลับไปแสดงชื่อหลังจากกด Next
    };

    const handleBack = () => {
        setShowNameInput(true); // กลับไปแสดงชื่อหลังจากกด Next
    };

    const handleShowNumberInput = () => {
        setShowNameInput(false); // แสดงตัวเลขแทนชื่อ
    };
    
    return (
        <main className=" mt-20 w-5/6">
            <h1 className="text-2xl md:text-4xl pb-8 md:pb-16 font-bold text-center ">ANALYSIS IMAGE</h1>
            <PointProvider pointData={dataSet} index={currentIndex}>
                {showNameInput ? (
                    <AddDataName onShowNumberInput={handleShowNumberInput} currentInde={currentIndex + 1} dataLength={dataSet.length}/>
                ) : (
                    <AddDataNumber onNext={handleNext} onBack={handleBack} currentInde={currentIndex + 1} dataLength={dataSet.length}/>
                )}
            </PointProvider>
        </main>
        
    )
}

