import React, { useState } from 'react'
import CompanySettingsModal from './CompanySettingsModal'

const CompanyTable = ({ companies, editingId, onEdit, onSave, onDelete, onInputChange, onSettingsSave }) => {
  const [selectedCompany, setSelectedCompany] = useState(null)

  const handleSettingsClick = (company) => {
    setSelectedCompany(company)
  }

  const handleCloseModal = () => {
    setSelectedCompany(null)
  }

  const handleSaveSettings = (settings) => {
    onSettingsSave(selectedCompany.id, settings)
    setSelectedCompany(null)
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>AlphanumericId</th>
                <th>Şirket İsmi</th>
                <th>Telefon</th>
                <th>Durum</th>
                <th>İşlemler</th>
                <th>Ayarlar</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => (
                <tr key={company.id}>
                  <td>
                    <span className="badge bg-secondary">{company.alphanumericId}</span>
                  </td>
                  <td>
                    {editingId === company.id ? (
                      <input
                        type="text"
                        className="form-control"
                        name="companyName"
                        value={company.companyName}
                        onChange={(e) => onInputChange(e, company.id)}
                      />
                    ) : company.companyName}
                  </td>
                  <td>
                    {editingId === company.id ? (
                      <div className="input-group">
                        <span className="input-group-text">+90</span>
                        <input
                          type="tel"
                          className="form-control"
                          name="phoneNumber"
                          value={company.phoneNumber.replace('+90 ', '')}
                          onChange={(e) => onInputChange(e, company.id)}
                          maxLength="12"
                        />
                      </div>
                    ) : company.phoneNumber}
                  </td>
                  <td>
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name="status"
                        checked={company.status}
                        onChange={(e) => onInputChange({ target: { name: 'status', value: e.target.checked }}, company.id)}
                      />
                    </div>
                  </td>
                  <td>
                    {editingId === company.id ? (
                      <button 
                        className="btn btn-sm btn-success me-2"
                        onClick={() => onSave(company.id)}
                      >
                        Kaydet
                      </button>
                    ) : (
                      <button 
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => onEdit(company.id)}
                      >
                        Düzenle
                      </button>
                    )}
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(company.id)}
                    >
                      Sil
                    </button>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-light"
                      onClick={() => handleSettingsClick(company)}
                    >
                      <i className="bi bi-gear-fill text-secondary"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCompany && (
        <CompanySettingsModal
          company={selectedCompany}
          onClose={handleCloseModal}
          onSave={handleSaveSettings}
        />
      )}
    </>
  )
}

export default CompanyTable 