import React from 'react';
import BolgeCell from './BolgeCell';
import TimeCell from './TimeCell';
import PriceCell from './PriceCell';
import DaysCell from './DaysCell';

const TourTableExpandedRow = ({ tour, bolgeler }) => {
  return (
    <tr>
      <td colSpan="5" className="p-0">
        <div 
          className="border-start border-5 border-primary mx-3 mb-3"
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: '0 8px 8px 0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <div className="p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100 border-0 bg-white">
                  <div className="card-body">
                    <h6 className="card-title d-flex align-items-center text-primary mb-3">
                      <i className="bi bi-geo-alt me-2"></i>
                      Bölgeler
                    </h6>
                    <BolgeCell bolgeIds={tour.bolgeId} bolgeler={bolgeler} />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 bg-white">
                  <div className="card-body">
                    <h6 className="card-title d-flex align-items-center text-primary mb-3">
                      <i className="bi bi-clock me-2"></i>
                      Alınış Saatleri ve Konumları
                    </h6>
                    <TimeCell times={tour.pickupTimes || [tour.pickupTime]} />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 bg-white">
                  <div className="card-body">
                    <h6 className="card-title d-flex align-items-center text-primary mb-3">
                      <i className="bi bi-currency-euro me-2"></i>
                      Fiyatlar
                    </h6>
                    <PriceCell 
                      adultPrice={tour.adultPrice}
                      childPrice={tour.childPrice}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100 border-0 bg-white">
                  <div className="card-body">
                    <h6 className="card-title d-flex align-items-center text-primary mb-3">
                      <i className="bi bi-calendar-week me-2"></i>
                      Günler
                    </h6>
                    <DaysCell selectedDays={tour.selectedDays} />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card border-0 bg-white">
                  <div className="card-body">
                    <h6 className="card-title d-flex align-items-center text-primary mb-3">
                      <i className="bi bi-list-check me-2"></i>
                      Opsiyonlar
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {tour.options.map((opt, i) => (
                        <div 
                          key={i} 
                          className="badge"
                          style={{
                            backgroundColor: '#e3f2fd',
                            color: '#1976d2',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '0.9rem'
                          }}
                        >
                          {opt.name}: {opt.price}€
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TourTableExpandedRow; 