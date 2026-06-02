import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', requireAuth, (req, res) => {
  // minimal protected endpoint returns user info from token
  res.json({ user: req.user });
});

export default router;
