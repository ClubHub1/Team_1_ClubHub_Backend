// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html
import { feathers } from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import { koa, rest, bodyParser, errorHandler, parseAuthentication, cors, serveStatic } from '@feathersjs/koa'
import socketio from '@feathersjs/socketio'
import fs from 'fs'
import path from 'path'
import Router from '@koa/router'

import { configurationValidator } from './configuration'
import type { Application } from './declarations'
import { logError } from './hooks/log-error'
import { postgresql } from './postgresql'
import { authentication } from './authentication'
import { services } from './services/index'
import { channels } from './channels'

const multer = require('@koa/multer');
const { v4: uuidv4 } = require('uuid');

const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, uploadDir);
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800') // 50MB default
  }
});



const app: Application = koa(feathers())

// Load our app configuration (see config/ folder)
app.configure(configuration(configurationValidator))

// Set up Koa middleware
app.use(cors())
app.use(serveStatic(app.get('public')))

app.use(async (ctx, next) => {
  if (ctx.path.startsWith('/uploads/')) {
    const fileName = ctx.path.replace(/^\/uploads\//, '')
    const filePath = path.join(uploadDir, fileName)

    if (fs.existsSync(filePath)) {
      ctx.type = path.extname(filePath)
      ctx.body = fs.createReadStream(filePath)
      return
    }
  }

  await next()
})

app.use(errorHandler())
app.use(parseAuthentication())
app.use(bodyParser())

// Set up file upload router
const uploadRouter = new Router();

uploadRouter.post('/upload', upload.single('file'), async (ctx) => {
  try {
    if (!ctx.file) {
      ctx.status = 400;
      ctx.body = { error: 'No file uploaded' };
      return;
    }

    const fileInfo = {
      filename: ctx.file.filename,
      originalName: ctx.file.originalname,
      size: ctx.file.size,
      mimeType: ctx.file.mimetype,
      path: `/uploads/${ctx.file.filename}`
    };

    ctx.status = 200;
    ctx.body = fileInfo;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: (error as Error).message };
  }
});

app.use(uploadRouter.routes());

// Configure services and transports
app.configure(rest())
app.configure(
  socketio({
    cors: {
      origin: app.get('origins')
    }
  })
)
app.configure(postgresql)
app.configure(authentication)
app.configure(services)
app.configure(channels)

// Register hooks that run on all service methods
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
})
// Register application setup and teardown hooks here
app.hooks({
  setup: [],
  teardown: []
})

export { app }
