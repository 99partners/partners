const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data', 'db');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Start MongoDB
const mongod = spawn('mongod', ['--dbpath', dataDir], {
  stdio: 'inherit'
});

// Start the Node.js server
const server = spawn('node', ['app.js'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: '5050',
    MONGODB_URI: 'mongodb://127.0.0.1:27017/blogManagement',
    NODE_ENV: 'development'
  }
});

// Handle process termination
process.on('SIGINT', () => {
  mongod.kill();
  server.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  mongod.kill();
  server.kill();
  process.exit();
});

// Log any errors
mongod.on('error', (err) => {
  console.error('MongoDB Error:', err);
});

server.on('error', (err) => {
  console.error('Server Error:', err);
}); 