import React from 'react';
import '../../assets/styles/newAssignments.css';

interface EstateCardProps {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
}

const EstateCard: React.FC<EstateCardProps> = ({ title, date, description, imageUrl }) => {
  return (
    <div className="estate-card">
      <img src={imageUrl} alt={title} className="estate-image" />
      <div className="estate-info">
        <p className="date">{date}</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const NewAssignments: React.FC = () => {
  const estates = [
    { id: 1, title: 'Some Estate', date: '10 July 2022', description: 'Wisata Alam Mangrove PIK Ramai Pengunjung Selama Libur Lebaran', imageUrl: '../../assets/img/estate1.jpeg' },
    { id: 2, title: 'HellBodde Estate', date: '10 July 2022', description: 'Wisata Alam Mangrove PIK Ramai Pengunjung Selama Libur Lebaran', imageUrl: '/images/estate2.jpg' },
    { id: 3, title: 'Dunkeld Estate', date: '10 July 2022', description: 'Wisata Alam Mangrove PIK Ramai Pengunjung Selama Libur Lebaran', imageUrl: '/images/estate3.jpg' },
  ];

  return (
    <div className="section">
      <h2>New Assignments</h2>
      <div className="cards-container">
        {estates.map(estate => (
          <EstateCard
            key={estate.id}
            title={estate.title}
            date={estate.date}
            description={estate.description}
            imageUrl={estate.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default NewAssignments;
