import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const RegionList = ({
  isRegionCollapsed,
  setIsRegionCollapsed,
  bolgelendir,
  setBolgelendir,
  handleBolgelendirSubmit,
  bolgeler,
  handleDelete,
  onUpdate
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (bolge) => {
    setEditingId(bolge.id);
    setEditValue(bolge.name);
  };

  const handleSave = (id) => {
    if (!editValue.trim()) return;
    onUpdate(id, editValue.trim().toUpperCase());
    setEditingId(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="card mb-4">
      <div 
        className="card-header" 
        style={{ cursor: 'pointer' }} 
        onClick={() => setIsRegionCollapsed(prev => !prev)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Bölgelendirme</h4>
          <i className={`bi ${isRegionCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'}`}></i>
        </div>
      </div>
      <div className={`card-body ${isRegionCollapsed ? 'd-none' : ''}`}>
        <form onSubmit={handleBolgelendirSubmit} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control text-uppercase"
              placeholder="Bölge adı giriniz"
              value={bolgelendir}
              onChange={(e) => setBolgelendir(e.target.value.toUpperCase())}
            />
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-plus-lg me-2"></i>Ekle
            </button>
          </div>
        </form>

        {bolgeler.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Bölge Adı</th>
                  <th scope="col">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {bolgeler.map(bolge => (
                  <tr key={bolge.id}>
                    <th scope="row">{bolge.id}</th>
                    <td>
                      {editingId === bolge.id ? (
                        <input
                          type="text"
                          className="form-control text-uppercase"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value.toUpperCase())}
                        />
                      ) : bolge.name}
                    </td>
                    <td>
                      {editingId === bolge.id ? (
                        <>
                          <button 
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleSave(bolge.id)}
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
                            onClick={() => handleEdit(bolge)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(bolge.id, 'bölge')}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionList; 