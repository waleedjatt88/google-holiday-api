import express from 'express';

import { getGoogleHolidays } from '../controllers/holidayController.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const router = express.Router();


router.get('/', getGoogleHolidays);

export default router;
