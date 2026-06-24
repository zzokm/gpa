const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const root = path.join(__dirname, '..')
const standaloneDir = path.join(root, '.next', 'standalone')
const serverEntry = path.join(standaloneDir, 'server.js')

if (!fs.existsSync(serverEntry)) {
  console.error('Missing .next/standalone/server.js — run npm run build first.')
  process.exit(1)
}

const copyIfExists = (from, to) => {
  if (fs.existsSync(from)) {
    fs.mkdirSync(path.dirname(to), { recursive: true })
    fs.cpSync(from, to, { recursive: true })
  }
}

copyIfExists(path.join(root, '.next', 'static'), path.join(standaloneDir, '.next', 'static'))
copyIfExists(path.join(root, 'public'), path.join(standaloneDir, 'public'))

const child = spawn(process.execPath, [serverEntry], {
  cwd: standaloneDir,
  stdio: 'inherit',
  env: {
    ...process.env,
    PORT: process.env.PORT || '3000',
    HOSTNAME: process.env.HOSTNAME || '127.0.0.1',
  },
})

child.on('exit', (code) => process.exit(code ?? 0))
