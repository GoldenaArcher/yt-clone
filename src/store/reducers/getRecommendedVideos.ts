import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { RecommendedVideos } from '../../Types';
import { YOUTUBE_API_URL } from '../../utils/constant';
import { parseRecommendedData } from '../../utils';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  'yotubeApp/getRecommendedVideos',
  async (videoId: string, { getState }) => {
    const {
      youtubeApp: { currentPlaying },
    } = getState() as RootState;

    if (currentPlaying) {
      const channelId = currentPlaying.channelInfo.id;
      const {
        data: { items },
      } = await axios.get(
        `${YOUTUBE_API_URL}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
      );

      let parsedData: RecommendedVideos[] = [];

      const fetchedData = await parseRecommendedData(items, videoId);

      if (fetchedData) parsedData = fetchedData;

      return { parsedData };
    }
    return { parsedData: [] };
  }
);
