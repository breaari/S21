import { useState, useEffect } from 'react';
import axios from 'axios';

const usePrograms = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
       
        const response = await axios.get('/'); 
        setPrograms(response.data.Carreras);
        
      } catch (error) {
       
      }
    };

    fetchPrograms();
  }, []); 

  const getProgramsByType = (type) => {
    return programs.filter((program) => program.type === type);
  };

  return { getProgramsByType };
};

export default usePrograms;
