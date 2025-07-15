import express from 'express';
import {
  generateShortUrl,
  handleRedirect,
  showStats
} from '../controllers/url.controller.js';

const router = express.Router();

router.post('/shorturls', generateShortUrl);
router.get('/:code', handleRedirect);
router.get('/shorturls/:code', showStats);

export default router;
