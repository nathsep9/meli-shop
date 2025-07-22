const path = require('path');

let server;
try {
  server = require('../dist/server.js');
  console.log('Successfully loaded bundled server');
} catch (error) {
  console.error('Failed to load bundled server:', error);
  throw error;
}

module.exports = (req, res) => {
  return server.default(req, res);
};
