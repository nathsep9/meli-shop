const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build process...');

try {
  console.log('🧹 Cleaning dist directory...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Step 2: Build client
  console.log('📦 Building client...');
  execSync('npx webpack --config webpack.client.js --mode production', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });

  // Step 3: Build server
  console.log('🖥️ Building server...');
  execSync('npx webpack --config webpack.server.js --mode production', { 
    stdio: 'inherit',
    cwd: process.cwd()
  });

  // Step 4: Copy public assets to both locations
  console.log('📁 Copying public assets...');
  const publicSrc = path.join(process.cwd(), 'public');
  const publicDest = path.join(process.cwd(), 'dist', 'public');
  const publicRoot = path.join(process.cwd(), 'public');
  
  if (fs.existsSync(publicSrc)) {
    // Copy to dist/public for the app
    fs.mkdirSync(path.dirname(publicDest), { recursive: true });
    fs.cpSync(publicSrc, publicDest, { recursive: true });
    
    // Ensure public folder exists at root for Vercel static serving
    if (!fs.existsSync(publicRoot)) {
      fs.mkdirSync(publicRoot, { recursive: true });
    }
  }

  // Step 5: Verify build outputs
  console.log('✅ Verifying build outputs...');
  const serverFile = path.join(process.cwd(), 'dist', 'server.js');
  const publicDir = path.join(process.cwd(), 'dist', 'public');
  
  if (!fs.existsSync(serverFile)) {
    throw new Error('❌ Server build failed: server.js not found');
  }
  
  if (!fs.existsSync(publicDir)) {
    throw new Error('❌ Client build failed: public directory not found');
  }

  const publicFiles = fs.readdirSync(publicDir);
  const hasBundle = publicFiles.some(file => file.startsWith('bundle.') && file.endsWith('.js'));
  const hasStyles = publicFiles.some(file => file.startsWith('styles.') && file.endsWith('.css'));
  
  if (!hasBundle) {
    console.warn('⚠️ Warning: No bundle.js file found in public directory');
  }
  
  if (!hasStyles) {
    console.warn('⚠️ Warning: No styles.css file found in public directory');
  }

  console.log('🎉 Build completed successfully!');
  console.log('📊 Build summary:');
  console.log(`   - Server: ${fs.existsSync(serverFile) ? '✅' : '❌'}`);
  console.log(`   - Client bundle: ${hasBundle ? '✅' : '❌'}`);
  console.log(`   - Styles: ${hasStyles ? '✅' : '❌'}`);
  console.log(`   - Public assets: ${fs.existsSync(publicDir) ? '✅' : '❌'}`);

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
