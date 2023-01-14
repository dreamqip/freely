import type { Images } from './images';
import type { IVideos } from './videos';
import type { IReviews } from '@/types/reviews';
import type { ITvShowCredits } from '@/types/credits';

export interface ITvShows {
  page: number;
  results: ITvShow[];
  total_results: number;
  total_pages: number;
}

export interface ITvShow {
  backdrop_path: string | null;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  status: string;
  type: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
  videos: IVideos;
  images: Images;
  keywords: {
    results: Keyword[];
  };
  reviews: IReviews;
  similar: ITvShowSimilar;
  recommendations: ITvShowRecommendations;
  credits: ITvShowCredits;
  // Only available when searching for a series
  media_type: string;
}

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: string;
  profile_path: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

interface Network {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface ITvShowSimilar {
  page: number;
  results: ITvShow[];
  total_results: number;
  total_pages: number;
}

export interface ITvShowRecommendations {
  page: number;
  results: ITvShow[];
  total_results: number;
  total_pages: number;
}
