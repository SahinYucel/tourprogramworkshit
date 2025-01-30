import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TourList = ({ 
  isCollapsed, 
  setIsCollapsed, 
  tourName, 
  setTourName, 
  handleTourSubmit, 
  tours, 
  handleDelete,
  onUpdate
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (tour) => {
    setEditingId(tour.id);
    setEditValue(tour.name);
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
        onClick={() => setIsCollapsed(prev => !prev)}
      >
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Tur Adı Listesi</h4>
          <i className={`bi ${isCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'}`}></i>
        </div>
      </div>
      <div className={`card-body ${isCollapsed ? 'd-none' : ''}`}>
        <form onSubmit={handleTourSubmit} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control text-uppercase"
              placeholder="Tur adı giriniz"
              value={tourName}
              onChange={(e) => setTourName(e.target.value.toUpperCase())}
            />
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-plus-lg me-2"></i>Ekle
            </button>
          </div>
        </form>

        {tours.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tur Adı</th>
                  <th scope="col">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {tours.map(tour => (
                  <tr key={tour.id}>
                    <th scope="row">{tour.id}</th>
                    <td>
                      {editingId === tour.id ? (
                        <input
                          type="text"
                          className="form-control text-uppercase"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value.toUpperCase())}
                        />
                      ) : tour.name}
                    </td>
                    <td>
                      {editingId === tour.id ? (
                        <>
                          <button 
                            className="btn btn-sm btn-success me-2"
                            onClick={() => handleSave(tour.id)}
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
                            onClick={() => handleEdit(tour)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(tour.id, 'tur')}
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

export default TourList; 