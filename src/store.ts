import { combineReducers, configureStore } from '@reduxjs/toolkit';
import movieReducer from '@/features/movie/movieSlice';
import searchReducer from '@/features/search/searchSlice';
import seriesReducer from '@/features/series/seriesSlice';
import popularSeriesReducer from '@/features/series/popularSlice';

export const rootReducer = combineReducers({
  movie: movieReducer,
  search: searchReducer,
  series: seriesReducer,
  popularSeries: popularSeriesReducer,
});

export const createStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
