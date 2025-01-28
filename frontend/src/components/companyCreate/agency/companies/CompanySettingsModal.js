import React, { useState } from 'react'
import { NumberInput, PaxInput } from './SettingFormComponents'

const CompanySettingsModal = ({ company, onClose, onSave }) => {
  const [settings, setSettings] = useState({
    earnings: company.earnings || '',
    promotionRate: company.promotionRate || '',
    revenue: company.revenue || '',
    pax: {
      adult: company.pax?.adult || '',
      child: company.pax?.child || '',
      free: company.pax?.free || ''
    }
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('pax.')) {
      const paxField = name.split('.')[1]
      setSettings(prev => ({
        ...prev,
        pax: {
          ...prev.pax,
          [paxField]: value
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(settings)
  }

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-gear-fill me-2"></i>
              {company.companyName} - Şirket Ayarları
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row mb-3">
                <NumberInput
                    label="Şirket Ciro €"
                  name="revenue"
                  value={settings.revenue}
                  onChange={handleChange}
                  placeholder="0.00 £"
                  step="0.01"
                />
                <NumberInput
                  label="Şirket Hak Edişi Oranı"
                  name="promotionRate"
                  value={settings.promotionRate}
                  onChange={handleChange}
                  placeholder="0 %  "
                  min="0"
                  max="100"
                  suffix="%"
                />
              </div>
              
              <div className="row mb-3">
                  <NumberInput
                    label="Şirket Hak Edişi"
                    name="earnings"
                    value={settings.earnings}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                  />
                   <div className="col-md-6">
                  <label className="form-label">Para Birimi</label>
                  <select 
                    className="form-select w-100"
                    name="currency"
                    value={settings.currency}
                    onChange={handleChange}
                  >
                    <option selected value="EUR">€ (EUR)</option>
                    <option value="USD">$ (USD)</option>
                    <option value="TRY">₺ (TRY)</option>
                  </select>
                </div>
              </div>

             

              <div className="row">
                
                <PaxInput
                  label="Pax Yetişkin"
                  name="pax.adult"
                  value={settings.pax.adult}
                  onChange={handleChange}
                />
                <PaxInput
                  label="Pax Yetişkin "
                  name="pax.child"
                  value={settings.pax.child}
                  onChange={handleChange}
                />
                <PaxInput
                  readOnly = 'readOnly'
                  label="Free"
                  name="pax.free"
                  value={settings.pax.free}
                  onChange={handleChange}
                />
              </div>
    
            </div>
          <div className='row'>
            <div className='col-md-6 p-4'>
               <h6 className="mb-3">Toplam PAX</h6>  
               <div className='row'>
                <ul className='list-unstyled d-flex justify-content-between'>
                  <li>Yetişkin: </li>
                  <li>Çocuk: </li>
                  <li>Free: </li>
                </ul> 
               </div>
            </div>
          </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>İptal</button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-save me-2"></i>
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CompanySettingsModal 