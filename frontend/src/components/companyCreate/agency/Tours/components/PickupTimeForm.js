import React from 'react';
import TimeInput from './TimeInput';

const PickupTimeForm = ({ 
  pickupTimes, 
  savedRegions, 
  savedAreas, 
  onTimeChange, 
  onAddTime, 
  onRemoveTime 
}) => {
  // Her pickup time için seçili bölgeye ait alanları bul
  const getAreasForRegion = (regionName) => {
    const region = savedRegions.find(r => r.name === regionName);
    return region?.areas || [];
  };

  return (
    <div className="mb-3">
      <label className="form-label d-flex justify-content-between align-items-center">
        <span>
          <i className="bi bi-clock me-2"></i>
          Alınış Saatleri ve Konumları
        </span>
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={onAddTime}
        >
          <i className="bi bi-plus-lg me-1"></i>
          Saat Ekle & Bölge Ekle
        </button>
      </label>
      {pickupTimes.map((time, index) => (
        <div key={index} className="card mb-3">
          <div className="card-body">
            <div className="row align-items-end">
              <div className="col-md-4">
                <TimeInput
                  id={`pickupTime-${index}`}
                  value={time}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const field = name.split('.')[1];
                    onTimeChange(index, field, value);
                  }}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">
                  <i className="bi bi-geo me-2"></i>
                  Bölge
                </label>
                <select
                  className="form-select"
                  value={time.region}
                  onChange={(e) => {
                    onTimeChange(index, 'region', e.target.value);
                    // Bölge değiştiğinde alanı sıfırla
                    onTimeChange(index, 'area', '');
                  }}
                >
                  <option value="">Bölge seçiniz</option>
                  {savedRegions.map(region => (
                    <option key={region.id} value={region.name}>
                      {region.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">
                  <i className="bi bi-geo-alt me-2"></i>
                  Alan
                </label>
                <select
                  className="form-select"
                  value={time.area}
                  onChange={(e) => onTimeChange(index, 'area', e.target.value)}
                  disabled={!time.region}
                >
                  <option value="">Alan seçiniz</option>
                  {getAreasForRegion(time.region).map(area => (
                    <option key={area.id} value={area.name}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2">
                {pickupTimes.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-outline-danger w-100"
                    onClick={() => onRemoveTime(index)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PickupTimeForm; 