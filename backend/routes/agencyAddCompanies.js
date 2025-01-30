const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {

  // Get providers for a company
  router.get('/providers/:companyId', async (req, res) => {
    const companyId = req.params.companyId;

    try {
      const sql = "SELECT * FROM agencyprovider WHERE company_id = ?";
      db.query(sql, [companyId], (err, results) => {
        if (err) {
          console.error('Providers getirme hatası:', err);
          res.status(500).json({ error: err.message });
          return;
        }
        res.json(results);
      });
    } catch (error) {
      console.error('Genel hata:', error);
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/providers', async (req, res) => {
    const { providers } = req.body;

    if (!providers || !Array.isArray(providers) || providers.length === 0) {
      res.status(400).json({ error: "Geçerli provider verisi bulunamadı" });
      return;
    }

    try {
      // Start a transaction
      db.beginTransaction(async (err) => {
        if (err) {
          console.error('Transaction başlatma hatası:', err);
          res.status(500).json({ error: err.message });
          return;
        }

        try {
          // Delete existing providers for the company
          const companyId = providers[0].companyId;
          const deleteSql = "DELETE FROM agencyprovider WHERE company_id = ?";
          await new Promise((resolve, reject) => {
            db.query(deleteSql, [companyId], (err) => {
              if (err) reject(err);
              else resolve();
            });
          });

          // Insert new providers
          const insertSql = "INSERT INTO agencyprovider (companyRef, company_name, phone_number, company_id, status) VALUES ?";
          const values = providers.map(provider => [
            provider.alphanumericId,
            provider.companyName,
            provider.phoneNumber,
            provider.companyId,
            provider.status
          ]);

          await new Promise((resolve, reject) => {
            db.query(insertSql, [values], (err) => {
              if (err) reject(err);
              else resolve();
            });
          });

          // Commit transaction
          db.commit((err) => {
            if (err) {
              console.error('Commit hatası:', err);
              db.rollback(() => {
                res.status(500).json({ error: err.message });
              });
              return;
            }
            res.json({ 
              success: true, 
              message: "Providers başarıyla kaydedildi" 
            });
          });
        } catch (error) {
          console.error('İşlem hatası:', error);
          db.rollback(() => {
            res.status(500).json({ error: error.message });
          });
        }
      });
    } catch (error) {
      console.error('Genel hata:', error);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};