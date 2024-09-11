// scripts/call-localhost.js
const http = require('http');

const callLocalhost = () => {
  http.get('http://localhost:3000', (res) => {
    console.log('Server response:', res.statusCode);
  }).on('error', (err) => {
    console.error('Error calling localhost:', err.message);
  });
};

// Delay the call to allow the dev server to start
setTimeout(callLocalhost, 1000); // Adjust the timeout based on how long your dev server takes to start

