import React from 'react';

const TourTableHeader = () => {
  return (
    <thead>
      <tr className="border-bottom">
        <th style={{ width: '40px', backgroundColor: 'transparent' }}></th>
        <th style={{ backgroundColor: 'transparent' }}>Durum</th>
        <th style={{ backgroundColor: 'transparent' }}>Tur Adı</th>
        <th style={{ backgroundColor: 'transparent' }}>Operatör</th>
        <th style={{ backgroundColor: 'transparent', width: '150px' }}>İşlemler</th>
      </tr>
    </thead>
  );
};

export default TourTableHeader; 