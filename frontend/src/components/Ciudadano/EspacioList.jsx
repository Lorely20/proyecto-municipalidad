import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import EspacioCard from './EspacioCard';
import './EspacioList.css';

const EspacioList = () => {
  const [espacios, setEspacios] = useState([]);

  useEffect(() => {
    const fetchEspacios = async () => {
      const resp = await api.get('/espacios');
      setEspacios(resp.data);
    };
    fetchEspacios();
  }, []);

  return (
    <div className="espacio-list-container">
      <h1 className="espacio-list-title">Espacios Disponibles</h1>
      <div className="espacio-card-grid">
        {espacios.map(espacio => (
          <EspacioCard key={espacio._id} espacio={espacio} />
        ))}
      </div>
    </div>
  );
};

export default EspacioList;