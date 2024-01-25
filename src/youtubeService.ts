import axios from 'axios';
import { VideoModel } from './videoModel';

const SEARCH_QUERY = 'football';
const PUBLISHED_AFTER = '2024-01-01T00:00:00Z';
const API_KEYS = ["key1", "key2", "key3"]; // Replace with your YouTube API keys

let currentApiKeyIndex = 0;

async function fetchVideosWithApiKey(apiKey: string): Promise<void> {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${SEARCH_QUERY}&order=date&maxResults=50&publishedAfter=${PUBLISHED_AFTER}`
    );

    // Save videos to the database
    for (const item of response.data.items) {
      const videoExists = await VideoModel.exists({ title: item.snippet.title });
      if (!videoExists) {
        const video = new VideoModel({
          title: item.snippet.title,
          description: item.snippet.description || 'NO DESCRIPTION',
          publishingDatetime: new Date(item.snippet.publishTime),
          thumbnails: [item.snippet.thumbnails.default.url], // Use the default thumbnail URL
        });

        await video.save();
      }
    }
  } catch (error: any) {
    console.error('Error fetching or saving videos:', error.message);
    throw error;
  }
}

export async function fetchLatestVideos(): Promise<void> {
  try {
    const apiKey = API_KEYS[currentApiKeyIndex];
    await fetchVideosWithApiKey(apiKey);
  } catch (error: any) {
    console.error('Error fetching or saving videos:', error.message);
    throw error;
  } finally {
    currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS.length;
  }
}
