import React from 'react';

const PriceInputs = ({ adultPrice, childPrice, onChange }) => {
  return (
    <div className="mb-3">
      <label className="form-label">
        <i className="bi bi-currency-euro me-2"></i>Fiyatlar
      </label>
      <div className="row g-2">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">Adult</span>
            <input
              type="number"
              className="form-control"
              name="adultPrice"
              value={adultPrice}
              onChange={onChange}
              placeholder="Adult fiyat"
            />
            <span className="input-group-text">€</span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-info text-white">Child</span>
            <input
              type="number"
              className="form-control"
              name="childPrice"
              value={childPrice}
              onChange={onChange}
              placeholder="Child fiyat"
            />
            <span className="input-group-text">€</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceInputs; 