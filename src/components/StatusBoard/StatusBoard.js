import React from 'react';
import './StatusBoard.css';

export default function StatusBoard({ stats }) {
  return (
    <div className="status-board">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="stat-row">
          <span className="stat-label">{key}</span>
          <div className="stat-bar">
            <div className="stat-fill" style={{ width: `${value}%` }}></div>
          </div>
          <span className="stat-value">{value}</span>
        </div>
      ))}
    </div>
  );
}
