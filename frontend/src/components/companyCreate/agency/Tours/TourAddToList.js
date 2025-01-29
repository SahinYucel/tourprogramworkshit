import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { saveTourData } from '../../../../services/api';
import TourList from './components/tourList_sub/TourList';
import RegionList from './components/tourList_sub/RegionList';
import RegionAreaList from './components/tourList_sub/RegionAreaList';

const TourAddToList = () => {
  // Tour states
  const [tourName, setTourName] = useState('');
  const [tours, setTours] = useState(() => {
    const savedTours = localStorage.getItem('tourList');
    return savedTours ? JSON.parse(savedTours) : [];
  });
  const [counter, setCounter] = useState(() => {
    const savedCounter = localStorage.getItem('tourCounter');
    return savedCounter ? parseInt(savedCounter) : 1;
  });

  // Bolgelendirme states
  const [bolgelendir, setBolgelendir] = useState('');
  const [bolgeler, setBolgeler] = useState(() => {
    const savedBolgeler = localStorage.getItem('bolgeList');
    return savedBolgeler ? JSON.parse(savedBolgeler) : [];
  });
  const [bolgeCounter, setBolgeCounter] = useState(() => {
    const savedCounter = localStorage.getItem('bolgeCounter');
    return savedCounter ? parseInt(savedCounter) : 1;
  });

  // Region and Area states
  const [regionName, setRegionName] = useState('');
  const [regions, setRegions] = useState(() => {
    const savedRegions = localStorage.getItem('regionList');
    const parsedRegions = savedRegions ? JSON.parse(savedRegions) : [];
    return parsedRegions.map(region => ({
      ...region,
      areas: region.areas || []
    }));
  });
  const [regionCounter, setRegionCounter] = useState(() => {
    const savedCounter = localStorage.getItem('regionCounter');
    return savedCounter ? parseInt(savedCounter) : 1;
  });

  // Area states
  const [areaName, setAreaName] = useState('');
  const [selectedRegionId, setSelectedRegionId] = useState(null);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRegionCollapsed, setIsRegionCollapsed] = useState(false);
  const [isAreaCollapsed, setIsAreaCollapsed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tourList', JSON.stringify(tours));
    localStorage.setItem('tourCounter', counter.toString());
    localStorage.setItem('bolgeList', JSON.stringify(bolgeler));
    localStorage.setItem('bolgeCounter', bolgeCounter.toString());
    localStorage.setItem('regionList', JSON.stringify(regions));
    localStorage.setItem('regionCounter', regionCounter.toString());
  }, [tours, counter, bolgeler, bolgeCounter, regions, regionCounter]);

  // Tour handlers
  const handleTourSubmit = useCallback((e) => {
    e.preventDefault();
    if (!tourName.trim()) return;

    const newTour = {
      id: counter,
      name: tourName.trim()
    };

    setTours(prev => [...prev, newTour]);
    setCounter(prev => prev + 1);
    setTourName('');
  }, [tourName, counter]);

  // Bolgelendirme handlers
  const handleBolgelendirSubmit = useCallback((e) => {
    e.preventDefault();
    if (!bolgelendir.trim()) return;

    const newBolge = {
      id: bolgeCounter,
      name: bolgelendir.trim()
    };

    setBolgeler(prev => [...prev, newBolge]);
    setBolgeCounter(prev => prev + 1);
    setBolgelendir('');
  }, [bolgelendir, bolgeCounter]);

  const handleDelete = useCallback((id, type, regionId) => {
    if (window.confirm(`Bu ${type}yi silmek istediğinizden emin misiniz?`)) {
      switch(type) {
        case 'tur':
          setTours(prev => prev.filter(item => item.id !== id));
          break;
        case 'bölge':
          setBolgeler(prev => prev.filter(item => item.id !== id));
          break;
        case 'region':
          setRegions(prev => prev.filter(item => item.id !== id));
          break;
        case 'alan':
          setRegions(prev => prev.map(region => 
            region.id === regionId
              ? { ...region, areas: region.areas.filter(area => area.id !== id) }
              : region
          ));
          break;
      }
    }
  }, []);

  const handleSaveToDatabase = async () => {
    try {
      setIsSaving(true);
      const agencyUser = JSON.parse(localStorage.getItem('agencyUser'));
      
      if (!agencyUser?.companyId) {
        alert('Şirket bilgisi bulunamadı. Lütfen tekrar giriş yapın.');
        return;
      }

      const data = {
        tours,
        bolgeler,
        regions
      };

      await saveTourData(agencyUser.companyId, data);
      alert('Veriler başarıyla kaydedildi!');
    } catch (error) {
      console.error('Kaydetme hatası:', error);
      alert('Veriler kaydedilirken bir hata oluştu: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Region handlers
  const handleRegionSubmit = useCallback((e) => {
    e.preventDefault();
    if (!regionName.trim()) return;

    const newRegion = {
      id: regionCounter,
      name: regionName.trim(),
      areas: []
    };

    setRegions(prev => [...prev, newRegion]);
    setRegionCounter(prev => prev + 1);
    setRegionName('');
  }, [regionName, regionCounter]);

  // Area handlers
  const handleAreaSubmit = useCallback((e) => {
    e.preventDefault();
    if (!areaName.trim() || !selectedRegionId) return;

    const newArea = {
      id: Date.now(),
      name: areaName.trim()
    };

    setRegions(prev => prev.map(region => 
      region.id === selectedRegionId
        ? { ...region, areas: [...region.areas, newArea] }
        : region
    ));
    setAreaName('');
  }, [areaName, selectedRegionId]);

  // Update handlers
  const handleTourUpdate = useCallback((id, newName) => {
    setTours(prev => prev.map(tour => 
      tour.id === id ? { ...tour, name: newName } : tour
    ));
  }, []);

  const handleBolgeUpdate = useCallback((id, newName) => {
    setBolgeler(prev => prev.map(bolge => 
      bolge.id === id ? { ...bolge, name: newName } : bolge
    ));
  }, []);

  const handleRegionUpdate = useCallback((id, newName) => {
          setRegions(prev => prev.map(region => 
      region.id === id ? { ...region, name: newName } : region
          ));
  }, []);

  const handleAreaUpdate = useCallback((regionId, areaId, newName) => {
    setRegions(prev => prev.map(region => 
      region.id === regionId ? {
        ...region,
        areas: region.areas.map(area => 
          area.id === areaId ? { ...area, name: newName } : area
        )
      } : region
    ));
  }, []);

  return (
    <div className="container mt-4">
      <TourList 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        tourName={tourName}
        setTourName={setTourName}
        handleTourSubmit={handleTourSubmit}
        tours={tours}
        handleDelete={handleDelete}
        onUpdate={handleTourUpdate}
      />

      <RegionList 
        isRegionCollapsed={isRegionCollapsed}
        setIsRegionCollapsed={setIsRegionCollapsed}
        bolgelendir={bolgelendir}
        setBolgelendir={setBolgelendir}
        handleBolgelendirSubmit={handleBolgelendirSubmit}
        bolgeler={bolgeler}
        handleDelete={handleDelete}
        onUpdate={handleBolgeUpdate}
      />

      <RegionAreaList 
        isAreaCollapsed={isAreaCollapsed}
        setIsAreaCollapsed={setIsAreaCollapsed}
        regionName={regionName}
        setRegionName={setRegionName}
        handleRegionSubmit={handleRegionSubmit}
        areaName={areaName}
        setAreaName={setAreaName}
        selectedRegionId={selectedRegionId}
        setSelectedRegionId={setSelectedRegionId}
        handleAreaSubmit={handleAreaSubmit}
        regions={regions}
        onRegionUpdate={handleRegionUpdate}
        onAreaUpdate={handleAreaUpdate}
        handleDelete={handleDelete}
      />

      {/* Save to Database Button */}
      <div className="d-grid gap-2 mb-4">
        <button 
          className="btn btn-success btn-lg"
          onClick={handleSaveToDatabase}
          disabled={isSaving || (tours.length === 0 && bolgeler.length === 0 && regions.length === 0)}
        >
          {isSaving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Kaydediliyor...
            </>
          ) : (
            <>
              <i className="bi bi-cloud-upload me-2"></i>
              Veri Tabanına Kaydet
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TourAddToList; 