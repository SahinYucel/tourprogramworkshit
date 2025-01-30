import React, { useState } from 'react';

export default function Guides() {
  const defaultLanguages = {
    almanca: false,
    rusca: false,
    ingilizce: false,
    fransizca: false,
    arapca: false,
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const emptyFormData = {
    name: '',
    surname: '',
    isActive: true,
    region: '',
    commission: '40',
    nickname: 'Guide',
    languages: defaultLanguages,
    otherLanguages: '',
    phone: '',
    code: generateCode(),
  };

  const [guides, setGuides] = useState([]);
  const [formData, setFormData] = useState(emptyFormData);
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLanguageChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [name]: checked,
      },
    }));
  };

  const handleSwitchChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      isActive: e.target.checked,
    }));
  };

  const formatLanguages = (languages, otherLanguages) => {
    const selectedLanguages = Object.entries(languages)
      .filter(([_, isSelected]) => isSelected)
      .map(([lang]) => {
        const capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
        return capitalizedLang;
      });
    
    if (otherLanguages) {
      selectedLanguages.push(otherLanguages);
    }
    
    return selectedLanguages.join(', ');
  };

  const handleEdit = (guide) => {
    setEditingId(guide.id);
    setFormData({
      ...guide,
      languages: guide.languages || defaultLanguages,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      ...emptyFormData,
      code: generateCode(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedGuide = {
      ...formData,
      id: editingId || Date.now(),
      languagesDisplay: formatLanguages(formData.languages, formData.otherLanguages),
      code: formData.code || generateCode(),
    };

    if (editingId) {
      setGuides(prev => prev.map(guide => guide.id === editingId ? formattedGuide : guide));
      setEditingId(null);
    } else {
      setGuides(prev => [...prev, formattedGuide]);
    }
    
    setFormData({
      ...emptyFormData,
      code: generateCode(),
    });
  };

  return (
    <div className="container-fluid p-4">
      <h5 className="mb-4">Rehber Yönetimi</h5>
      
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label">Ad</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label">Soyad</label>
                  <input
                    type="text"
                    className="form-control"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label">Nickname</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label">Telefon</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="05XX XXX XX XX"
                    required
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label">Rehber Kodu</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.code}
                    readOnly
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label">Bölge</label>
                  <input
                    type="text"
                    className="form-control"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label">Komisyon (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="commission"
                    value={formData.commission}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label className="form-label d-block">Durum</label>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={handleSwitchChange}
                      name="isActive"
                    />
                    <label className="form-check-label">
                      {formData.isActive ? 'Aktif' : 'Pasif'}
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label className="form-label">Bildiği Diller</label>
                  <div className="d-flex flex-wrap gap-3">
                    {Object.keys(defaultLanguages).map((lang) => (
                      <div className="form-check" key={lang}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name={lang}
                          checked={formData.languages[lang]}
                          onChange={handleLanguageChange}
                          id={`lang-${lang}`}
                        />
                        <label className="form-check-label" htmlFor={`lang-${lang}`}>
                          {lang.charAt(0).toUpperCase() + lang.slice(1)}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="form-control"
                      name="otherLanguages"
                      value={formData.otherLanguages}
                      onChange={handleInputChange}
                      placeholder="Diğer diller (virgülle ayırarak yazınız)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <button type="submit" className="btn btn-primary me-2">
                {editingId ? 'Güncelle' : 'Rehber Ekle'}
              </button>
              {editingId && (
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  İptal
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Rehber Kodu</th>
                  <th>Ad</th>
                  <th>Soyad</th>
                  <th>Nickname</th>
                  <th>Telefon</th>
                  <th>Bölge</th>
                  <th>Komisyon</th>
                  <th>Bildiği Diller</th>
                  <th>Durum</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {guides.map((guide) => (
                  <tr key={guide.id}>
                    <td>{guide.code}</td>
                    <td>{guide.name}</td>
                    <td>{guide.surname}</td>
                    <td>{guide.nickname}</td>
                    <td>{guide.phone}</td>
                    <td>{guide.region}</td>
                    <td>{guide.commission}%</td>
                    <td>{guide.languagesDisplay}</td>
                    <td>
                      <span className={`badge ${guide.isActive ? 'bg-success' : 'bg-danger'}`}>
                        {guide.isActive ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(guide)}
                      >
                        Düzenle
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setGuides((prev) => prev.filter((g) => g.id !== guide.id))}
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
