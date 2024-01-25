import express from 'express';
import mongoose from 'mongoose';
import { videoController } from './videoController';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/youtubeVideos');

app.use('/videos', videoController);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
