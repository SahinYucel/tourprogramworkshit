import React from 'react';
import StatusCell from './table/StatusCell';
import BolgeCell from './table/BolgeCell';
import TimeCell from './table/TimeCell';
import PriceCell from './table/PriceCell';
import DaysCell from './table/DaysCell';
import ActionButtons from './table/ActionButtons';

const TourTable = ({ tours, onEdit, onDelete, bolgeler, onCopy, onStatusChange }) => {
  if (!tours.length) {
    return (
      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        Henüz tur oluşturulmamış.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Durum</th>
            <th>Tur Adı</th>
            <th>Operatör</th>
            <th>Bölgeler</th>
            <th>Alınış Saatleri ve Konumları</th>
            <th>Fiyatlar</th>
            <th>Günler</th>
            <th>Opsiyonlar</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour, index) => (
            <tr key={index}>
              <td>
                <StatusCell 
                  isActive={tour.isActive}
                  onChange={() => onStatusChange(tour)}
                  index={index}
                />
              </td>
              <td>{tour.tourName}</td>
              <td>
                {tour.operator}
                {tour.operatorId && (
                  <div>
                    <small className="text-muted">AlphanumericId: {tour.operatorId}</small>
                  </div>
                )}
              </td>
              <td>
                <BolgeCell bolgeIds={tour.bolgeId} bolgeler={bolgeler} />
              </td>
              <td>
                <TimeCell times={tour.pickupTimes || [tour.pickupTime]} />
              </td>
              <td>
                <PriceCell 
                  adultPrice={tour.adultPrice}
                  childPrice={tour.childPrice}
                />
              </td>
              <td>
                <DaysCell selectedDays={tour.selectedDays} />
              </td>
              <td>
                <div style={{ maxWidth: '200px' }}>
                  {tour.options.map((opt, i) => (
                    <div key={i} className="badge bg-info text-white me-1 mb-1">
                      {opt.name}: {opt.price}€
                    </div>
                  ))}
                </div>
              </td>
              <td>
                <ActionButtons
                  onEdit={() => onEdit(tour)}
                  onDelete={() => onDelete(tour)}
                  onCopy={() => onCopy(tour)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourTable; 