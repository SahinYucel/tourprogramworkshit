import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const RegionAreaList = ({
  isAreaCollapsed,
  setIsAreaCollapsed,
  regionName,
  setRegionName,
  handleRegionSubmit,
  areaName,
  setAreaName,
  selectedRegionId,
  setSelectedRegionId,
  handleAreaSubmit,
  regions,
  onRegionUpdate,
  onAreaUpdate,
  handleDelete
}) => {
  const [editingRegionId, setEditingRegionId] = useState(null);
  const [editingAreaId, setEditingAreaId] = useState(null);
  const [editRegionValue, setEditRegionValue] = useState('');
  const [editAreaValue, setEditAreaValue] = useState('');

  const handleEdit = (type, id, name, regionId = null) => {
    if (type === 'region') {
      setEditingRegionId(id);
      setEditingAreaId(null);
      setEditRegionValue(name);
    } else {
      setEditingAreaId(id);
      setEditingRegionId(regionId);
      setEditAreaValue(name);
    }
  };

  const handleSave = (type, id, regionId = null) => {
    if (type === 'region') {
      if (!editRegionValue.trim()) return;
      onRegionUpdate(id, editRegionValue.trim().toUpperCase());
      setEditRegionValue('');
    } else {
      if (!editAreaValue.trim()) return;
      onAreaUpdate(regionId, id, editAreaValue.trim().toUpperCase());
      setEditAreaValue('');
    }
    setEditingRegionId(null);
    setEditingAreaId(null);
  };

  const handleCancel = () => {
    setEditingRegionId(null);
    setEditingAreaId(null);
    setEditRegionValue('');
    setEditAreaValue('');
  };

  return (
    <div className="card mb-4">
      <div 
        className="card-header" 
        style={{ cursor: 'pointer' }} 
        onClick={() => setIsAreaCollapsed(prev => !prev)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Bölgeler ve Alanlar</h4>
          <i className={`bi ${isAreaCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'}`}></i>
        </div>
      </div>
      <div className={`card-body ${isAreaCollapsed ? 'd-none' : ''}`}>
        {/* Region Form */}
        <form onSubmit={handleRegionSubmit} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control text-uppercase"
              placeholder="Bölge adı giriniz"
              value={regionName}
              onChange={(e) => setRegionName(e.target.value.toUpperCase())}
            />
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-plus-lg me-2"></i>Bölge Ekle
            </button>
          </div>
        </form>

        {/* Area Form */}
        <form onSubmit={handleAreaSubmit} className="mb-4">
          <div className="input-group">
            <select
              className="form-select"
              value={selectedRegionId || ''}
              onChange={(e) => setSelectedRegionId(Number(e.target.value))}
              style={{ maxWidth: '200px' }}
            >
              <option value="">Bölge seçiniz</option>
              {regions.map(region => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="form-control text-uppercase"
              placeholder="Alan adı giriniz"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value.toUpperCase())}
              disabled={!selectedRegionId}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!selectedRegionId}
            >
              <i className="bi bi-plus-lg me-2"></i>Alan Ekle
            </button>
          </div>
        </form>

        {/* Region and Area Table */}
        {regions.length > 0 && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">İsim</th>
                  <th scope="col">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {regions.map(region => (
                  <React.Fragment key={region.id}>
                    <tr className="table-light">
                      <th scope="row">{region.id}</th>
                      <td>
                        {editingRegionId === region.id ? (
                          <input
                            type="text"
                            className="form-control text-uppercase"
                            value={editRegionValue}
                            onChange={(e) => setEditRegionValue(e.target.value.toUpperCase())}
                          />
                        ) : region.name}
                      </td>
                      <td>
                        {editingRegionId === region.id ? (
                          <>
                            <button 
                              className="btn btn-sm btn-success me-2"
                              onClick={() => handleSave('region', region.id)}
                            >
                              <i className="bi bi-check-lg"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-secondary"
                              onClick={handleCancel}
                            >
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => handleEdit('region', region.id, region.name)}
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(region.id, 'region')}
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                    {(region.areas || []).map(area => (
                      <tr key={area.id} className="table-light" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
                        <th scope="row" style={{ paddingLeft: '2rem' }}>└ {area.id}</th>
                        <td style={{ paddingLeft: '2rem' }}>
                          {editingAreaId === area.id ? (
                            <input
                              type="text"
                              className="form-control text-uppercase"
                              value={editAreaValue}
                              onChange={(e) => setEditAreaValue(e.target.value.toUpperCase())}
                            />
                          ) : area.name}
                        </td>
                        <td>
                          {editingAreaId === area.id ? (
                            <>
                              <button 
                                className="btn btn-sm btn-success me-2"
                                onClick={() => handleSave('area', area.id, region.id)}
                              >
                                <i className="bi bi-check-lg"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-secondary"
                                onClick={handleCancel}
                              >
                                <i className="bi bi-x-lg"></i>
                              </button>
                            </>
                          ) : (
                            <>
                              <button 
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => handleEdit('area', area.id, area.name, region.id)}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(area.id, 'alan', region.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionAreaList; 