import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  ITvShow,
  ITvShowRecommendations,
  ITvShowSimilar,
} from '@/types/series';
import type { Images } from '@/types/images';
import type { IVideos } from '@/types/videos';
import type { ITvShowCredits } from '@/types/credits';

interface InitialState {
  id: number | null;
  series: ITvShow | null;
  images: Images | null;
  videos: IVideos | null;
  recommendations: ITvShowRecommendations | null;
  similar: ITvShowSimilar | null;
  credits: ITvShowCredits | null;
}

const initialState: InitialState = {
  id: null,
  series: null,
  images: null,
  videos: null,
  recommendations: null,
  similar: null,
  credits: null,
};

const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {
    setSeries: (state, action: PayloadAction<ITvShow>) => {
      state.series = action.payload;
    },
    setSeriesImages: (state, action: PayloadAction<Images>) => {
      state.images = action.payload;
    },
    setSeriesVideos: (state, action: PayloadAction<IVideos>) => {
      state.videos = action.payload;
    },
    setSeriesId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setSeriesRecommendations: (
      state,
      action: PayloadAction<ITvShowRecommendations>
    ) => {
      state.recommendations = action.payload;
    },
    setSeriesSimilar: (state, action: PayloadAction<ITvShowSimilar>) => {
      state.similar = action.payload;
    },
    setSeriesCredits: (state, action: PayloadAction<ITvShowCredits>) => {
      state.credits = action.payload;
    },
  },
});

export const {
  setSeries,
  setSeriesVideos,
  setSeriesImages,
  setSeriesId,
  setSeriesRecommendations,
  setSeriesSimilar,
  setSeriesCredits,
} = seriesSlice.actions;

export default seriesSlice.reducer;
