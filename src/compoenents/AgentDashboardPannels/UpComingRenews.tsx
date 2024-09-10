import React from 'react';
import '../../assets/styles/newAssignments.css';

const UpComingRenews: React.FC = () => {
  const estates = [
    { id: 1, title: 'Some Estate', date: '10 July 2022', description: 'Wisata Alam Mangrove PIK Ramai Pengunjung Selama Libur Lebaran', imageUrl: '/images/estate1.jpg' },
    { id: 2, title: 'HellBodde Estate', date: '10 July 2022', description: 'Wisata Alam Mangrove PIK Ramai Pengunjung Selama Libur Lebaran', imageUrl: '/images/estate2.jpg' },
    { id: 3, title: 'Dunkeld Estate', date: '10 July 2022', description: 'Wisata Alam Mangrove PIK Ramai Pengunjung Selama Libur Lebaran', imageUrl: '/images/estate3.jpg' },
  ];

  return (
    <div className="section">
      <h2>Up Coming Renew</h2>
      <div className="cards-container">
        {estates.map(estate => (
          <div className="estate-card" key={estate.id}>
            <img src={estate.imageUrl} alt={estate.title} className="estate-image" />
            <div className="estate-info">
              <p className="date">{estate.date}</p>
              <h3>{estate.title}</h3>
              <p>{estate.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpComingRenews;
