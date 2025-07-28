import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/meetings');
    }, 4000);
  }, [navigate]);

  return  <div className="welcome-card"> <h1>Commençons la journée ensemble ! </h1></div>
}