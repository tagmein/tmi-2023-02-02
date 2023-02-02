#!/bin/env -S node --watch --trace-warnings

/**
 * Tag Me In Server
 *
 * Instructions:
 *
 * 1) Install NodeJS version 18 or later from https://nodejs.org
 * 2) In terminal, grant executable with: chmod +x ./tmi.js
 * 3) Run with: ./tmi.js
 *
 * Configuration environment variables
 *
 * BASE - name of the base directory
 *  default 'contents'
 *
 * KEYFILE - name of the file containing valid client keys
 *  default 'KEYS'
 *
 * PORT - integer between 1 and 65535 to lisen on
 *  default '3000'
 *
 * How to run with environment variables:
 *  PORT=4040 BASE=mydirname ./tmi.js
 */

const MAX_REQUEST_BODY_SIZE = 1024 * 64 // 64kb

const [http, fs, path, qs] = 'http fs path querystring'
 .split(' ').map(require)

const privateDirectory = '.private'

setImmediate(function () {
 console.log(`=== Tag Me In === ${__dirname}`)
 const port = PORT.normalize(process.env.PORT, 3000)
 const baseDirectory = process.env.BASE ?? 'contents'
 const basePath = path.join(__dirname, baseDirectory)
 const keyFile = process.env.KEYFILE ?? 'KEYS'

 if (DIRECTORY.is(basePath)) {
  console.log(`Found content directory ${basePath}`)
 }
 else {
  DIRECTORY.create(basePath)
  console.log(`Created content directory ${basePath}`)
 }

 const privateBasePath = path.join(basePath, privateDirectory)

 if (DIRECTORY.is(privateBasePath)) {
  console.log(`Found private directory ${privateBasePath}`)
 }
 else {
  DIRECTORY.create(privateBasePath)
  console.log(`Created private directory ${privateBasePath}`)
 }

 async function ensurePrivateDirectory(atPath, requestHeaders) {
  const clientKey = requestHeaders['x-client-key']
  const myDirectory = `${privateDirectory}/${clientKey}`
  const myDirectoryPath = path.join(basePath, myDirectory)
  if (clientKey?.length === 40 && atPath.startsWith(myDirectory)) {
   if (!DIRECTORY.is(myDirectoryPath)) {
    DIRECTORY.create(myDirectoryPath)
    console.log(`Created private directory for client ${myDirectoryPath}`)
   }
  }
  return clientKey
 }

 async function list(atPath, requestHeaders) {
  const clientKey = await ensurePrivateDirectory(atPath, requestHeaders)
  if (atPath === privateDirectory) {
   return {
    files: [],
    folders: [ clientKey ],
    isFile: false
   }
  }
  const sourcePath = path.join(basePath, atPath)
  if (DIRECTORY.is(sourcePath)) {
   const items = DIRECTORY.list(sourcePath)
   return {
    files: items.filter(node => NODE.type(node) === 'file').map(node => node.name),
    folders: items.filter(node => NODE.type(node) === 'directory').map(node => node.name),
    isFile: false
   }
  }
  else {
   return {
    isFile: true,
    contents: FILE.read(sourcePath)
   }
  }
 }

 async function createFile(requestBody, requestHeaders) {
  const clientKey = await ensurePrivateDirectory(requestBody.path, requestHeaders)
  const filePath = path.join(basePath, requestBody.path)
  if (FILE.is(filePath)) {
   return { statusCode: 400, content: `file "${filePath}" exists` }
  }
  if (DIRECTORY.is(filePath)) {
   return { statusCode: 400, content: `folder "${filePath}" exists` }
  }
  FILE.write(filePath, '')
  return { statusCode: 201 }
 }

 async function createFolder(requestBody, requestHeaders) {
  const clientKey = await ensurePrivateDirectory(requestBody.path, requestHeaders)
  const folderPath = path.join(basePath, requestBody.path)
  if (FILE.is(folderPath)) {
   return { statusCode: 400, content: `file "${folderPath}" exists` }
  }
  if (!DIRECTORY.is(folderPath)) {
   DIRECTORY.create(folderPath)
  }
  return { statusCode: 201 }
 }

 async function saveFile(requestBody, requestHeaders) {
  const clientKey = await ensurePrivateDirectory(requestBody.path, requestHeaders)
  const filePath = path.join(basePath, requestBody.path)
  if (DIRECTORY.is(filePath)) {
   return { statusCode: 400, content: `folder "${filePath}" exists` }
  }
  FILE.write(filePath, requestBody.content)
  return { statusCode: 201 }
 }

 async function validateClientKey(requestHeaders) {
  const clientKey = requestHeaders['x-client-key']
  if (clientKey.length !== 40) {
   return false
  }
  const validClientKeys = FILE.read(path.join(__dirname, keyFile))
   .split('\n')
  if (validClientKeys.includes(clientKey)) {
   console.log('valid client key presented')
   return true
  }
  console.log('invalid client key presented')
  return false
 }

 async function reply(requestMethod, requestPath, requestParams, requestBody, requestHeaders) {
  if (requestMethod === 'GET' && requestPath === '/list') {
   return {
    statusCode: 200,
    contentType: 'text/plain; charset=utf-8',
    content: JSON.stringify(await list(requestParams.path, requestHeaders))
   }
  }
  else if (requestMethod === 'GET' && requestPath.startsWith('/source/')) {
   const sourcePath = path.join(basePath, requestPath.substring('/source/'.length))
   if (FILE.is(sourcePath)) {
    return {
     statusCode: 200,
     contentType: 'text/plain; charset=utf-8',
     content: FILE.read(sourcePath) // @todo make async
    }
   }
  }
  else if (requestMethod === 'POST') {
   if (!await validateClientKey(requestHeaders)) {
    return { statusCode: 401, content: 'unauthorized' }
   }
   if (requestBody?.path?.includes('..')) {
    return { statusCode: 400, content: "invalid parameter 'path'" }
   }
   switch (requestPath) {
    case '/create-file':
     return createFile(requestBody, requestHeaders)
    case '/create-folder':
     return createFolder(requestBody, requestHeaders)
    case '/save-file':
     return saveFile(requestBody, requestHeaders)
   }
  }
  else if (requestMethod === 'GET' && requestPath in STATIC) {
   return {
    headers: [
     ['Cache-Control', 'max-age=86400']
    ],
    ...STATIC[requestPath]
   }
  }
  return {
   statusCode: 404,
   contentType: 'text/plain; charset=utf-8',
   content: `Not found: ${requestPath}`
  }
 }

 const server = http.createServer(async function (request, response) {
  try {
   const { method: requestMethod } = request
   const [requestPath, requestParamString] = request.url.split('?')
   const requestParams = qs.parse(requestParamString ?? '')
   console.log(requestMethod, requestPath, JSON.stringify(requestParams))
   const requestBody = await REQUEST.body(request)
   const {
    statusCode = 200,
    contentType = 'text/plain; charset=utf-8',
    content,
    headers = []
   } = await reply(requestMethod, requestPath, requestParams, requestBody, request.headers)
   response.statusCode = statusCode
   response.setHeader('Content-Type', contentType)
   for (const [k, v] of headers) {
    response.setHeader(k, v)
   }
   response.end(content ?? '')
  }
  catch (e) {
   console.error(e)
   response.statusCode = e.statusCode ?? 500
   response.setHeader('Content-Type', 'text/plain; charset=utf-8')
   response.end(e.message)
  }
 })

 server.listen(port, 'localhost', function () {
  console.log(`Tag Me In server listening on http://localhost:${port}`)
 })
})

const DIRECTORY = {
 create(directoryPath) {
  fs.mkdirSync(directoryPath)
 },
 list(testPath) {
  if (testPath.endsWith(privateDirectory)) {
   return []
  }
  return fs.readdirSync(testPath, {
   withFileTypes: true,
  })
  .filter(x => x.name !== privateDirectory)
 },
 is(testPath) {
  return fs.existsSync(testPath) && fs.lstatSync(testPath).isDirectory()
 },
}

const FILE = {
 is(testPath) {
  return fs.existsSync(testPath) && fs.lstatSync(testPath).isFile()
 },
 read(testPath) {
  if (FILE.is(testPath)) {
   return fs.readFileSync(testPath, { encoding: 'utf8', flag: 'r' })
  }
  return ''
 },
 write(testPath, contents) {
  return fs.writeFileSync(testPath, contents, { encoding: 'utf8', flag: 'w' })
 },
}

const NODE = {
 type(nodePath) {
  if (nodePath.isFile()) {
   return 'file'
  } else if (nodePath.isDirectory()) {
   return 'directory'
  } else {
   return 'other'
  }
 },
}

const PORT = {
 normalize(source, fallbackPort) {
  const portInteger = parseInt(source, 10)
  return Number.isFinite(portInteger) && portInteger >= 1 && portInteger < 65536
   ? portInteger
   : fallbackPort
 },
}

const REQUEST = {
 async body(request) {
  return new Promise(function (resolve, reject) {
   let error = false
   const FORM_URLENCODED = 'application/x-www-form-urlencoded'
   if (request.headers['content-type'] === FORM_URLENCODED) {
    let body = ''
    request.on('data', function (chunk) {
     if (!error) {
      body += chunk.toString()
      if (body.length > MAX_REQUEST_BODY_SIZE) {
       error = true
       reject(new Error(`request body size cannot exceed ${MAX_REQUEST_BODY_SIZE} bytes`))
      }
     }
    })
    request.on('end', function () {
     if (!error) {
      resolve(qs.parse(body))
     }
    })
   } else {
    resolve({})
   }
  })
 },
}

const STATIC = {
 '/': {
  contentType: 'text/html; charset=utf-8',
  content: `<!doctype html>
<html class="tagmein">
<head>
 <title>Tag Me In</title>
 <meta charset="utf-8" />
 <meta name="viewport" content="width=device-width, initial-scale=1" />
 <link rel="stylesheet" type="text/css" href="/main.css" />
</head>
<body class="tagmein">
 <div id="main"><h2>Tag Me In</h2><p>Loading</p></div>
 <script src="/main.js"></script>
 <noscript>Error: JavaScript is disabled, which Tag Me In requires to run</noscript>
</body>`
 },
 '/main.css': {
  contentType: 'text/css; charset=utf-8',
  content: `html.tagmein, body.tagmein {
 height: 100vh;
 margin: 0;
 overflow: hidden;
}
h1, h2, h3, h4, h5, h6, p {
 margin: 20px 0;
}
h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child, p:first-child {
 margin-top: 0;
}
h1:last-child, h2:last-child, h3:last-child, h4:last-child, h5:last-child, h6:last-child, p:last-child {
 margin-bottom: 0;
}
a {
 color: inherit;
 text-decoration: none;
 border-bottom: 1px solid;
}
body, input, textarea, button, select {
 background-color: #000;
 border: none;
 color: #fff;
 font-size: 18px;
 font-family: 'DejaVu Sans Mono', 'IBM Plex Mono', 'Courier New', monospace;
 letter-spacing: 0.25px;
 line-height: 1.8;
}
*::selection {
 background-color: #fff;
 color: #000;
}
#main {
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 overflow: hidden;
 text-align: center;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
}
#main > iframe {
 background-color: transparent;
 border: none;
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 overflow: hidden;
}
`
 },
 '/main.js': {
  contentType: 'text/javascript; charset=utf-8',
  content: `// Tag Me In main.js
const WORKER_TIMEOUT = 15000//ms

async function runScript(source, payload) {
 const tmiClientSource = \`;(self ?? this ?? window).TMI = {
 clientKey: \${JSON.stringify(payload.clientKey)},
 async list(path) {
  const listResponse = await fetch(\\\`\${payload.origin}/list?path=\\\${encodeURIComponent(path.join('/'))}\\\`, {
   headers: {
    'X-Client-Key': TMI.clientKey
   }
  })
  return listResponse.json()
 },
 async createFile(path) {
  const body = 'path=' + encodeURIComponent(path.join('/'))
  const createResponse = await fetch(\\\`\${payload.origin}/create-file\\\`, {
   body,
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': body.length,
    'X-Client-Key': TMI.clientKey
   },
   method: 'POST'
  })
  if (createResponse.status !== 201) {
   throw new Error('Operation failed: ' + createResponse.status)
  }
 },
 async createFolder(path) {
  const body = 'path=' + encodeURIComponent(path.join('/'))
  const createResponse = await fetch(\\\`\${payload.origin}/create-folder\\\`, {
   body,
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': body.length,
    'X-Client-Key': TMI.clientKey
   },
   method: 'POST'
  })
  if (createResponse.status !== 201) {
   throw new Error('Operation failed: ' + createResponse.status)
  }
 },
 async saveFile(path, content) {
  const body = 'path=' + encodeURIComponent(path.join('/')) + '&content=' +
   encodeURIComponent(content)
  const saveResponse = await fetch(\\\`\${payload.origin}/save-file\\\`, {
   body,
   headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': body.length,
    'X-Client-Key': TMI.clientKey
   },
   method: 'POST'
  })
  if (saveResponse.status !== 201) {
   throw new Error('Operation failed: ' + saveResponse.status)
  }
 }
}\`
 const wrappedSource = \`\${tmiClientSource}
TMI.clientSource = \${JSON.stringify(tmiClientSource)}
self.onmessage = function ({ data }) {
 async function worker() {
  \${source}
 }
 worker().then(postMessage)
}\`
 const scriptBlob = new Blob([wrappedSource], {
  type: 'application/javascript'
 })
 const scriptBlobURL = URL.createObjectURL(scriptBlob)
 const scriptWorker = new Worker(scriptBlobURL)
 return new Promise((resolve, reject) => {
  const terminateTimeout = setTimeout(
   () => {
    scriptWorker.terminate()
    console.error('Error from worker, wrapped source:')
    console.error(wrappedSource)
    reject(new Error(\`worker script terminated after \${WORKER_TIMEOUT}ms\`))
   }, WORKER_TIMEOUT
  )
  scriptWorker.addEventListener('message', ({ data }) => {
   clearTimeout(terminateTimeout)
   resolve(data)
  })
  scriptWorker.addEventListener('error', error => {
   clearTimeout(terminateTimeout)
   console.error('Error from worker, wrapped source:')
   console.error(wrappedSource)
   reject(error)
  })
  scriptWorker.postMessage(payload)
 })
}

function navigate(toState) {
 window.location.hash = btoa(encodeURIComponent(JSON.stringify(toState)))
}

let lastState = {}

function route() {
 const { hash } = window.location
 try {
  lastState = hash.length >= 3
   ? JSON.parse(decodeURIComponent(atob(hash.substring(1))))
   : {}
  requestAnimationFrame(function () { render(lastState) })
 }
 catch(e) {
  console.error(e)
  navigate(lastState)
 }
}

window.addEventListener('hashchange', route)
route()

const mainFrame = document.getElementById('main')

const CLIENT_KEY_LENGTH = 40
const clientKeyStorage = 'client-key'

function randomClientKey() {
 return Array(CLIENT_KEY_LENGTH).fill(null).map(function () {
  return Math.floor(Math.random() * 1e6).toString(36)[0]
 }).join('')
}

if (localStorage.getItem(clientKeyStorage)?.length !== CLIENT_KEY_LENGTH) {
 localStorage.setItem(clientKeyStorage, randomClientKey())
}

const clientKey = localStorage.getItem(clientKeyStorage)

async function render(state) {
 // console.log('render', { state })
 const { source = 'home' } = state ?? {}
 try {
  const scriptResponse = await fetch(\`/source/\${source}\`)
  if (scriptResponse.ok) {
   const script = await scriptResponse.text()
   const output = await runScript(script, {
    state,
    source,
    clientKey,
    origin: location.origin
   })
   const outputFrame = document.createElement('iframe')
   mainFrame.innerHTML = ''
   mainFrame.appendChild(outputFrame)
   outputFrame.contentDocument.open()
   outputFrame.contentDocument.write(\`<head>
 <meta charset="utf-8" />
 <link rel="stylesheet" type="text/css" href="/main.css" />
</head>
<body>\${output}\</body>\`)
   outputFrame.contentDocument.close()
  }
  else {
   mainFrame.innerHTML = \`<h2>That didn't work</h2><p>Item '\${source}' \${scriptResponse.statusText}</p>\`
  }
 }
 catch (e) {
  mainFrame.innerHTML = \`<h2>That didn't work</h2><p>Item '\${source}' caused \${e.constructor.name}</p><pre>\${e.message}</pre>\`  
 }
}`
 }
}

