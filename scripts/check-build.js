// Script to check build output and verify JavaScript bundles exist
const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '..', '.cursor', 'debug.log');
const outDir = path.join(__dirname, '..', 'out');

function log(message, data = {}) {
  const logEntry = {
    sessionId: 'debug-session',
    runId: 'build-check',
    timestamp: Date.now(),
    location: 'check-build.js',
    message,
    data,
  };
  
  // Write to log file
  try {
    fs.appendFileSync(logPath, JSON.stringify(logEntry) + '\n');
  } catch (err) {
    console.error('Failed to write log:', err);
  }
  
  // Also send via HTTP
  fetch('http://127.0.0.1:7244/ingest/065dc0e5-590e-4b67-a73f-1f0d5aa899f9', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logEntry)
  }).catch(() => {});
}

log('Starting build check', { outDir });

// Check if out directory exists
if (!fs.existsSync(outDir)) {
  log('ERROR: out directory does not exist', { outDir });
  process.exit(1);
}

// Check for index.html
const indexHtml = path.join(outDir, 'index.html');
if (fs.existsSync(indexHtml)) {
  const htmlContent = fs.readFileSync(indexHtml, 'utf-8');
  log('Found index.html', { 
    size: htmlContent.length,
    hasScriptTags: htmlContent.includes('<script'),
    scriptTagCount: (htmlContent.match(/<script/g) || []).length,
    hasNextScripts: htmlContent.includes('_next'),
    basePathInHtml: htmlContent.match(/basePath|assetPrefix|_next\/static/g) || []
  });
  
  // Extract script src attributes
  const scriptMatches = htmlContent.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/g) || [];
  log('Script tags found', { 
    count: scriptMatches.length,
    scripts: scriptMatches.map(s => {
      const srcMatch = s.match(/src=["']([^"']+)["']/);
      return srcMatch ? srcMatch[1] : null;
    }).filter(Boolean)
  });
} else {
  log('ERROR: index.html not found', { outDir });
}

// Check for _next directory
const nextDir = path.join(outDir, '_next');
if (fs.existsSync(nextDir)) {
  log('Found _next directory', { path: nextDir });
  
  // Check for static directory
  const staticDir = path.join(nextDir, 'static');
  if (fs.existsSync(staticDir)) {
    const staticFiles = fs.readdirSync(staticDir, { recursive: true });
    log('Found _next/static directory', { 
      fileCount: staticFiles.length,
      sampleFiles: staticFiles.slice(0, 10)
    });
    
    // Check for JS files
    const jsFiles = staticFiles.filter(f => f.endsWith('.js'));
    log('JavaScript files in _next/static', { 
      count: jsFiles.length,
      sampleFiles: jsFiles.slice(0, 5)
    });
  } else {
    log('WARNING: _next/static directory not found');
  }
} else {
  log('ERROR: _next directory not found', { outDir });
}

log('Build check complete');
