import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from server/.env if it exists
dotenv.config({ path: path.join(__dirname, 'server', '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local') });
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

// Import and mount routes from server/index.js
import { default as serverApp } from '../server/index.js';

// Copy middleware/routes from server
app.use('/', serverApp);

export default app;
