import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * GET /api/dashboard
 * Protected route - verify user session
 * Headers: { Authorization: "Bearer <token>" }
 */
router.get('/dashboard', requireAuth, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
    },
  });
});

/**
 * GET /api/profile
 * Get user profile information
 * Headers: { Authorization: "Bearer <token>" }
 */
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error('Profile error:', err);
    return res.status(500).json({ error: 'Server error fetching profile' });
  }
});

export default router;
