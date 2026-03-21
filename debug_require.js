const path = require('path');
const base = 'c:/Users/CAMILO/Documents/DOCUMENTOS_KAMILO/IUDGITAL_KAMILO/NODE_JS/backend/src';

try {
  console.log('--- Require Diagnostic Start ---');
  
  console.log('1. Testing db config...');
  require(path.join(base, 'config/db-connection-mongo'));
  
  console.log('2. Testing auth route...');
  require(path.join(base, 'routes/auth'));
  
  console.log('3. Testing genre route...');
  require(path.join(base, 'routes/genre'));
  
  console.log('4. Testing director route...');
  require(path.join(base, 'routes/director'));
  
  console.log('5. Testing studio route...');
  require(path.join(base, 'routes/studio'));
  
  console.log('6. Testing mediaType route...');
  require(path.join(base, 'routes/mediaType'));
  
  console.log('7. Testing media route...');
  require(path.join(base, 'routes/media'));
  
  console.log('--- All modules loaded successfully ---');
} catch (e) {
  console.error('!!! CRASH DETECTED !!!');
  console.error('Error message:', e.message);
  console.error('Stack trace:', e.stack);
  process.exit(1);
}
