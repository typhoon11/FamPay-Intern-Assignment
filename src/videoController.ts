import express from 'express';
import { VideoModel } from './videoModel';
import { fetchLatestVideos } from './youtubeService';

const router = express.Router();

// Background task to fetch and store videos
setInterval(async () => {
  await fetchLatestVideos();
}, 10000); // 10 seconds interval

// API endpoint to get stored videos
router.get('/', async (req, res) => {
  try {
    const videos = await VideoModel.find()
      .sort({ publishingDatetime: 'desc' })

    res.json(videos);
  } catch (error: any) {
    console.error('Error fetching videos:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { router as videoController };
