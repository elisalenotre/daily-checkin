import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/meetings');
    }, 4000);
  }, [navigate]);

  return <h1 style={{textAlign: 'center', marginTop: '40px'}}>Commençons la journée ensemble !</h1>;
}