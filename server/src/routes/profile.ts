import express from 'express';
const router = express.Router();

import { createProfile } from '../controllers/profile.js';

router.post('/createProfile', createProfile);

export default router;