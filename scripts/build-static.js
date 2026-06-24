process.env.STATIC_EXPORT = 'true'
require('child_process').execSync('npx next build', { stdio: 'inherit', env: process.env })
