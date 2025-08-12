import express from 'express';
const router = express.Router();

import { upcomingContest } from '../controllers/contest.js';

router.get('/upcomingcontest', upcomingContest);

export default router;
