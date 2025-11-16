const express = require('express');
const cors = require('cors');

const app = express();

// Simple CORS test
app.use(cors({
  origin: true, // Allow all origins for testing
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 204
}));

app.get('/test', (req, res) => {
  console.log('Test endpoint hit');
  console.log('Origin:', req.headers.origin);
  res.json({ message: 'CORS test successful', origin: req.headers.origin });
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`CORS test server running on port ${PORT}`);
});