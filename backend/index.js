const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
require('dotenv').config();

const app = express();

// CORS ayarları - Production için
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      //'http://13.216.32.130',
      //'http://13.216.32.130:3000',
      //'http://13.216.32.130:5000'
      'http://localhost:3000'
    ];
    
    // origin undefined olabilir (örneğin Postman kullanırken)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Önbellek süresi (saniye)
}));

app.use(express.json());

// MySQL bağlantısı
const db = mysql.createConnection({
  host: 'localhost',
  user: 'sahin',
  password: 'root',
  database: 'tour_program',
  // Bağlantı kopma sorunları için ek ayarlar
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  connectTimeout: 10000, // 10 saniye
});

// Veritabanı bağlantısını kontrol et ve yeniden bağlanma mantığı ekle
function handleDisconnect(connection) {
  connection.on('error', function(err) {
    console.log('DB ERROR', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST' || 
       err.code === 'ECONNRESET' || 
       err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
      console.log('DB Connection lost, reconnecting...');
      handleDisconnect(mysql.createConnection(connection.config));
    } else {
      throw err;
    }
  });
}

handleDisconnect(db);

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    setTimeout(handleDisconnect, 2000); // 2 saniye sonra tekrar bağlanmayı dene
  } else {
    console.log('Connected to database');
  }
});

// Routes
const authRoutes = require('./routes/auth')(db);
const companyRoutes = require('./routes/company')(db);
const agencyRoutes = require('./routes/agency')(db);
const agencyAddCompanies = require('./routes/agencyAddCompanies')(db);
const backupRoutes = require('./routes/backup')(db);
const tourlist = require('./routes/tourlist')(db);

// Route middlewares
app.use('/auth', authRoutes);
app.use('/company', companyRoutes);
app.use('/agency', agencyRoutes);
app.use('/agencyAddCompanies', agencyAddCompanies);
app.use('/tourlist', tourlist);
app.use('/backup', backupRoutes);

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 