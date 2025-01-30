import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TimeInput from '../TimeInput';
import {
  togglePickupTimeList,
  selectPickupTimeListVisibility
} from '../../../../../../store/slices/pickupTimeSlice';

const TIME_PERIODS = [
  { value: '1', label: '1. PERIYOT' },
  { value: '2', label: '2. PERIYOT' },
  { value: '3', label: '3. PERIYOT' },
  { value: '4', label: '4. PERIYOT' },
  { value: '5', label: '5. PERIYOT' },
  { value: '6', label: '6. PERIYOT' },
  { value: '7', label: '7. PERIYOT' },
  { value: '8', label: '8. PERIYOT' },
  { value: '9', label: '9. PERIYOT' },
  { value: '10', label: '10. PERIYOT' }
];

const STATUS_FILTERS = [
  { value: 'all', label: 'HEPSI' },
  { value: 'active', label: 'AKTIF' },
  { value: 'passive', label: 'PASIF' }
];

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
  const [statusFilter, setStatusFilter] = useState('all');

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
      const matchStatus = statusFilter === 'all' ? true : 
        statusFilter === 'active' ? time.isActive !== false :
        time.isActive === false;
      
      if (regionFilter && areaFilter) {
        return matchRegion && matchArea && matchStatus;
      } else if (regionFilter) {
        return matchRegion && matchStatus;
      } else if (areaFilter) {
        return matchArea && matchStatus;
      }
      return matchStatus;
    });
  };

  const clearFilters = () => {
    setRegionFilter('');
    setAreaFilter('');
    setStatusFilter('all');
  };

  // Bölgeye göre gruplandırılmış pickup time'ları getir
  const getGroupedPickupTimes = () => {
    const filteredTimes = getFilteredPickupTimes();
    const grouped = {};
    
    filteredTimes.forEach(time => {
      if (!time.region) {
        if (!grouped['Bölge Seçilmemiş']) {
          grouped['Bölge Seçilmemiş'] = [];
        }
        grouped['Bölge Seçilmemiş'].push(time);
      } else {
        if (!grouped[time.region]) {
          grouped[time.region] = [];
        }
        grouped[time.region].push(time);
      }
    });

    return grouped;
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
            <div className="col-md-3">
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
            <div className="col-md-2">
              <label className="form-label">
                <i className="bi bi-clock-history me-2"></i>
                Periyot
              </label>
              <select
                className="form-select"
                value={lastTime.period || 'sabah'}
                onChange={(e) => onTimeChange(lastIndex, 'period', e.target.value)}
              >
                {TIME_PERIODS.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
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
            <div className="col-md-1">
              <div className="d-flex flex-column align-items-end gap-2">
                {pickupTimes.length > 1 && (
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={onAddTime}
                    >
                      <i className="bi bi-plus-lg"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onRemoveTime(lastIndex)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                )}
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={lastTime.isActive !== false}
                    onChange={(e) => onTimeChange(lastIndex, 'isActive', e.target.checked)}
                  />
                </div>
              </div>
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
          {(regionFilter || areaFilter || statusFilter !== 'all') && (
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
        <div className="col-md-4">
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
        <div className="col-md-4">
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
        <div className="col-md-4">
          <div className="input-group input-group-sm">
            <span className="input-group-text">
              <i className="bi bi-funnel"></i>
            </span>
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {STATUS_FILTERS.map(filter => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
            {statusFilter !== 'all' && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setStatusFilter('all')}
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
            Object.entries(getGroupedPickupTimes()).map(([region, times]) => (
              <div key={region} className="card mb-3">
                <div className="card-header bg-light">
                  <h6 className="mb-0">
                    <i className="bi bi-geo-alt me-2"></i>
                    {region}
                    <small className="text-muted ms-2">({times.length} kayıt)</small>
                  </h6>
                </div>
                <div className="card-body">
                  {times.map((time) => (
                    <div key={time.originalIndex} className="card mb-2">
                      <div className="card-body py-2">
                        <div className="row align-items-end">
                          <div className="col-md-3">
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
                          <div className="col-md-2">
                            <label className="form-label">
                              <i className="bi bi-clock-history me-2"></i>
                              Periyot
                            </label>
                            <select
                              className="form-select"
                              value={time.period || 'sabah'}
                              onChange={(e) => onTimeChange(time.originalIndex, 'period', e.target.value)}
                            >
                              {TIME_PERIODS.map(period => (
                                <option key={period.value} value={period.value}>
                                  {period.label}
                                </option>
                              ))}
                            </select>
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
                          <div className="col-md-1">
                            <div className="d-flex flex-column align-items-end gap-2">
                              {pickupTimes.length > 1 && (
                                <div className="d-flex gap-2">
                                  <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => onRemoveTime(time.originalIndex)}
                                  >
                                    <i className="bi bi-trash"></i>
                                  </button>
                                </div>
                              )}
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={time.isActive !== false}
                                  onChange={(e) => onTimeChange(time.originalIndex, 'isActive', e.target.checked)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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