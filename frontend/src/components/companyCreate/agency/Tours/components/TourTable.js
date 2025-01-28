import React from 'react';

const TourTable = ({ tours, onEdit, onDelete }) => {
  if (!tours.length) {
    return (
      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        Henüz tur oluşturulmamış.
      </div>
    );
  }

  const formatTime = (time) => {
    const hour = time.hour.toString().padStart(2, '0');
    const minute = time.minute.toString().padStart(2, '0');
    return `${hour}:${minute}`;
  };

  const formatTimes = (times) => {
    if (!Array.isArray(times)) {
      // Handle legacy data with single time
      return formatTime(times);
    }
    return times.map(time => (
      `${formatTime(time)} (${time.region} - ${time.area})`
    )).join(', ');
  };

  const formatDays = (days) => {
    const dayMap = {
      monday: 'Pzt',
      tuesday: 'Sal',
      wednesday: 'Çar',
      thursday: 'Per',
      friday: 'Cum',
      saturday: 'Cmt',
      sunday: 'Paz'
    };
    return days.map(day => dayMap[day]).join(', ');
  };

  const formatPrice = (price) => {
    return price ? `${price} €` : '-';
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Tur Adı</th>
            <th>Operatör</th>
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
                <div className="d-flex flex-column gap-1">
                  {(tour.pickupTimes || [tour.pickupTime]).map((time, i) => (
                    <div key={i} className="badge bg-light text-dark">
                      {formatTime(time)} 
                      {time.region && time.area && (
                        <span className="ms-1 text-muted">
                          ({time.region} - {time.area})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </td>
              <td>
                <div className="d-flex flex-column">
                  <small className="text-muted">Adult:</small>
                  <div>{formatPrice(tour.adultPrice)}</div>
                  <small className="text-muted mt-1">Child:</small>
                  <div>{formatPrice(tour.childPrice)}</div>
                </div>
              </td>
              <td>
                <div className="badge bg-light text-dark">
                  {formatDays(tour.selectedDays)}
                </div>
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
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEdit(tour)}
                    title="Düzenle"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(tour)}
                    title="Sil"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TourTable; 