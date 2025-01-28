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

  return router;
}; 