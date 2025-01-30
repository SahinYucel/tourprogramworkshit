const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Promise wrapper for database connection
  const promiseDb = db.promise();

  // Save tour data
  router.post('/save', async (req, res) => {
    const { companyId, tours, regions } = req.body;

    if (!companyId) {
      return res.status(400).json({ error: 'Company ID is required' });
    }

    try {
      await promiseDb.beginTransaction();

      // Delete existing data for the company
      await promiseDb.query('DELETE FROM tourlist WHERE company_id = ?', [companyId]);
      await promiseDb.query('DELETE FROM regionslist WHERE company_id = ?', [companyId]);

      // Insert tours
      if (tours && tours.length > 0) {
        const tourValues = tours.map(tour => [tour.name, companyId]);
        await promiseDb.query(
          'INSERT INTO tourlist (name, company_id) VALUES ?',
          [tourValues]
        );
      }

      // Insert regions and areas
      if (regions && regions.length > 0) {
        for (const region of regions) {
          // Insert region
          const [regionResult] = await promiseDb.query(
            'INSERT INTO regionslist (name, company_id) VALUES (?, ?)',
            [region.name, companyId]
          );

          // Insert areas for this region
          if (region.areas && region.areas.length > 0) {
            const areaValues = region.areas.map(area => [
              area.name,
              regionResult.insertId,
              companyId
            ]);
            
            await promiseDb.query(
              'INSERT INTO areaslist (name, region_id, company_id) VALUES ?',
              [areaValues]
            );
          }
        }
      }

      await promiseDb.commit();
      
      res.json({
        success: true,
        message: 'Tur verileri başarıyla kaydedildi'
      });
    } catch (error) {
      await promiseDb.rollback();
      console.error('İşlem hatası:', error);
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/:companyId', async (req, res) => {
    try {
      const { companyId } = req.params;
      
      // MySQL'den verileri getir
      const [tours] = await promiseDb.query(
        'SELECT id, name FROM tourlist WHERE company_id = ?',
        [companyId]
      );

      // Bölgeleri ve alanları getir
      const [regions] = await promiseDb.query(
        'SELECT r.id, r.name, a.id as area_id, a.name as area_name ' +
        'FROM regionslist r ' +
        'LEFT JOIN areaslist a ON r.id = a.region_id ' +
        'WHERE r.company_id = ?',
        [companyId]
      );

      // Bölgeleri ve alanları düzenle
      const formattedRegions = regions.reduce((acc, curr) => {
        const existingRegion = acc.find(r => r.id === curr.id);
        
        if (existingRegion) {
          if (curr.area_id) {
            existingRegion.areas.push({
              id: curr.area_id,
              name: curr.area_name
            });
          }
        } else {
          acc.push({
            id: curr.id,
            name: curr.name,
            areas: curr.area_id ? [{
              id: curr.area_id,
              name: curr.area_name
            }] : []
          });
        }
        
        return acc;
      }, []);

      res.json({
        tours: tours.map(t => ({ id: t.id, name: t.name })),
        regions: formattedRegions
      });
      
    } catch (error) {
      console.error('Veri getirme hatası:', error);
      res.status(500).json({ error: 'Veriler getirilemedi' });
    }
  });

  return router;
}; 