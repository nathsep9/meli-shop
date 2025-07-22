const path = require('path');

process.chdir(path.join(__dirname, '..'));

function loadRealApp() {
  try {
    const { App } = require('./dist/app.js');
    console.log('✅ Successfully loaded real App component');
    console.log('App component type:', typeof App);
    return App;
  } catch (error) {
    console.log('❌ Could not load bundled App:', error.message);
    return null;
  }
}

console.log('Testing App component loading...');
const App = loadRealApp();

if (App) {
  console.log('🎉 App component is available for SSR!');
} else {
  console.log('⚠️ App component not available, will use fallback');
}
