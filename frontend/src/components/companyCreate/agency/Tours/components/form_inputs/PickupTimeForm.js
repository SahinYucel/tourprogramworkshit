import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TimeInput from '../TimeInput';
import {
  togglePickupTimeList,
  selectPickupTimeListVisibility
} from '../../../../../../store/slices/pickupTimeSlice';

const PickupTimeForm = ({ 
  pickupTimes, 
  savedRegions, 
  savedAreas, 
  onTimeChange, 
  onAddTime, 
  onRemoveTime 
}) => {
  const dispatch = useDispatch();
  const showList = useSelector(selectPickupTimeListVisibility);
  const [regionFilter, setRegionFilter] = useState('');
  const [areaFilter, setAreaFilter] = useState('');

  // Her pickup time için seçili bölgeye ait alanları bul
  const getAreasForRegion = (regionName) => {
    const region = savedRegions.find(r => r.name === regionName);
    return region?.areas || [];
  };

  // Filtrelenmiş pickup time'ları getir
  const getFilteredPickupTimes = () => {
    return pickupTimes.slice(0, -1).map((time, originalIndex) => ({
      ...time,
      originalIndex
    })).filter(time => {
      const matchRegion = time.region?.toLowerCase().includes(regionFilter.toLowerCase());
      const matchArea = time.area?.toLowerCase().includes(areaFilter.toLowerCase());
      
      if (regionFilter && areaFilter) {
        return matchRegion && matchArea;
      } else if (regionFilter) {
        return matchRegion;
      } else if (areaFilter) {
        return matchArea;
      }
      return true;
    });
  };

  const clearFilters = () => {
    setRegionFilter('');
    setAreaFilter('');
  };

  // Son eklenen pickup time'ı göster
  const renderLastPickupTime = () => {
    if (!pickupTimes.length) return null;
    const lastTime = pickupTimes[pickupTimes.length - 1];
    const lastIndex = pickupTimes.length - 1;

    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="row align-items-end">
            <div className="col-md-4">
              <TimeInput
                id={`pickupTime-${lastIndex}`}
                value={lastTime}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const field = name.split('.')[1];
                  onTimeChange(lastIndex, field, value);
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
                value={lastTime.region}
                onChange={(e) => {
                  onTimeChange(lastIndex, 'region', e.target.value);
                  onTimeChange(lastIndex, 'area', '');
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
                value={lastTime.area}
                onChange={(e) => onTimeChange(lastIndex, 'area', e.target.value)}
                disabled={!lastTime.region}
              >
                <option value="">Alan seçiniz</option>
                {getAreasForRegion(lastTime.region).map(area => (
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
                  onClick={() => onRemoveTime(lastIndex)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mb-3">
      <label className="form-label d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <i className="bi bi-clock me-2"></i>
          Alınış Saatleri ve Konumları
          {(regionFilter || areaFilter) && (
            <small className="text-muted ms-2">
              ({getFilteredPickupTimes().length} sonuç)
            </small>
          )}
        </div>
        <div className="d-flex gap-2">
          <button
            type="button"
            className={`btn btn-sm ${showList ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => dispatch(togglePickupTimeList())}
            title={showList ? 'Listeyi gizle' : 'Listeyi göster'}
          >
            <i className="bi bi-list"></i>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={onAddTime}
          >
            <i className="bi bi-plus-lg me-1"></i>
            Saat Ekle & Bölge Ekle
          </button>
        </div>
      </label>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group input-group-sm">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Eklenen bölgelerde ara..."
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            />
            {regionFilter && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setRegionFilter('')}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group input-group-sm">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Eklenen alanlarda ara..."
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
            />
            {areaFilter && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setAreaFilter('')}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {renderLastPickupTime()}

      {showList && (
        <>
          {!pickupTimes.length ? (
            <div className="alert alert-info">
              <i className="bi bi-info-circle me-2"></i>
              Henüz tur oluşturulmamış.
            </div>
          ) : (
            getFilteredPickupTimes().map((time) => (
              <div key={time.originalIndex} className="card mb-3">
                <div className="card-body">
                  <div className="row align-items-end">
                    <div className="col-md-4">
                      <TimeInput
                        id={`pickupTime-${time.originalIndex}`}
                        value={time}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          const field = name.split('.')[1];
                          onTimeChange(time.originalIndex, field, value);
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
                          onTimeChange(time.originalIndex, 'region', e.target.value);
                          onTimeChange(time.originalIndex, 'area', '');
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
                        onChange={(e) => onTimeChange(time.originalIndex, 'area', e.target.value)}
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
                          onClick={() => onRemoveTime(time.originalIndex)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default PickupTimeForm; 