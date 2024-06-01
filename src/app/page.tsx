"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from './components/LoadingSpinner';
import HospitalTable from './components/HospitalTable';
import { HospitalData } from '../types/hospitalData';

const HomePage = () => {
  const [data, setData] = useState<HospitalData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/fetchData');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const hospitals = Array.from(new Set(data.map(item => item.hospital)));

  const filteredData = selectedHospital
    ? data.filter(item => item.hospital === selectedHospital)
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">TransVergelijk</h1>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="flex justify-center mb-4">
            {hospitals.map((hospital, index) => (
              <button
                key={index}
                className={`btn ${selectedHospital === hospital ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedHospital(hospital)}
              >
                {hospital}
              </button>
            ))}
          </div>
          {selectedHospital && <HospitalTable data={filteredData} />}
        </>
      )}
    </div>
  );
};

export default HomePage;
