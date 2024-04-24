import { useState, useEffect } from 'react';
import axios from 'axios';

const usePrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/'); // Ajusta la ruta según tu API
        setPrograms(response.data.Carreras);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError('Error al obtener los programas');
      }
    };

    fetchPrograms();
  }, []); // Se ejecuta solo una vez al montar el componente

  const getProgramsByType = (type) => {
    return programs.filter((program) => program.type === type);
  };

  return { programs, loading, error, getProgramsByType };
};

export default usePrograms;
