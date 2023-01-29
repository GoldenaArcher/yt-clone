import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { YOUTUBE_API_URL } from '../../utils/constant';
import { parseData } from '../../utils';
import { HomePageVideos } from '../../Types';

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  'youtubeApp/homePageVideos',
  async (isNext: boolean, { getState }) => {
    const {
      youtubeApp: { nextPageToken: nextPageTokenFromState, videos },
    } = getState() as RootState;
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ''
      }`
    );

    let parsedData: HomePageVideos[] = [];

    const data = await parseData(items);

    if (data) {
      parsedData = data;
    }

    return { parsedData: [...videos, ...parsedData], nextPageToken };
  }
);
