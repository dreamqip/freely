import useSWR from 'swr';
import type { IMovie, IMovies } from '@/types/movie';
import type { ITvShow, ITvShows } from '@/types/series';
import type { IPerson } from '@/types/person';
import type { ISearch } from '@/types/search';

export const imageBaseUrlOriginal = 'https://image.tmdb.org/t/p/original';
export const imageBaseUrlHd = 'https://image.tmdb.org/t/p/w1280';
export const imageBaseUrlW400 = 'https://image.tmdb.org/t/p/w400';

class TMDBApi {
  private static _instance: TMDBApi;
  private readonly apiKey = process.env.API_KEY;
  private readonly publicApiKey = process.env.NEXT_PUBLIC_API_KEY;
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  public get instance(): TMDBApi {
    if (!TMDBApi._instance) {
      TMDBApi._instance = new TMDBApi();
    }
    return TMDBApi._instance;
  }

  private fetcher = async (url: string, options: RequestInit) => {
    const response = await fetch(url, options);

    return await response.json();
  };

  public getMovieById = async (
    id: number,
    fetchOpt: RequestInit
  ): Promise<IMovie | undefined> => {
    const response = await fetch(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&append_to_response=keywords,videos,images,recommendations,similar,reviews,credits&include_image_language=en,null`,
      fetchOpt
    );

    if (!response.ok) {
      return undefined;
    }

    return await response.json();
  };

  public getSeriesById = async (
    id: number,
    fetchOpt: RequestInit
  ): Promise<ITvShow | undefined> => {
    const response = await fetch(
      `${this.baseUrl}/tv/${id}?api_key=${this.apiKey}&append_to_response=keywords,videos,images,recommendations,similar,reviews,credits&include_image_language=en,null`,
      fetchOpt
    );

    if (!response.ok) {
      return undefined;
    }

    return await response.json();
  };

  public getPersonById = async (
    id: number,
    fetchOpt: RequestInit
  ): Promise<IPerson | undefined> => {
    const response = await fetch(
      `${this.baseUrl}/person/${id}?api_key=${this.apiKey}&append_to_response=images,combined_credits`,
      fetchOpt
    );

    if (!response.ok) {
      return undefined;
    }

    return await response.json();
  };

  public multiSearchQuery = (query: string, page = 1) => {
    const { data, isLoading, error } = useSWR<ISearch>(
      query
        ? `${this.baseUrl}/search/multi?api_key=${this.publicApiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
        : null,
      this.fetcher,
      { keepPreviousData: true, revalidateOnFocus: false }
    );

    return {
      data,
      isLoading,
      error,
    };
  };

  public getTopRatedMovies = async (
    page = 1,
    fetchOpt: RequestInit
  ): Promise<IMovies> => {
    const response = await fetch(
      `${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&page=${page}`,
      fetchOpt
    );
    return await response.json();
  };

  public getPopularSeries = async (
    page = 1,
    fetchOpt: RequestInit
  ): Promise<ITvShows> => {
    const response = await fetch(
      `${this.baseUrl}/tv/popular?api_key=${this.apiKey}&page=${page}`,
      fetchOpt
    );
    return await response.json();
  };

  public getPopularSeriesClient = (page = 1) => {
    const { data, isLoading, error } = useSWR<ITvShows>(
      `${this.baseUrl}/tv/popular?api_key=${this.publicApiKey}&page=${page}`,
      this.fetcher
    );

    return {
      series: data,
      isLoading,
      error,
    };
  };

  public getTopRatedSeries = async (
    page = 1,
    fetchOpt: RequestInit
  ): Promise<ITvShows> => {
    const response = await fetch(
      `${this.baseUrl}/tv/top_rated?api_key=${this.apiKey}&page=${page}`,
      fetchOpt
    );

    return await response.json();
  };

  public getPopularMovies = async (
    page = 1,
    fetchOpt: RequestInit
  ): Promise<IMovies> => {
    const response = await fetch(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`,
      fetchOpt
    );

    return await response.json();
  };

  public getPopularMoviesClient = (page = 1) => {
    const { data, isLoading, error } = useSWR<IMovies>(
      `${this.baseUrl}/movie/popular?api_key=${this.publicApiKey}&page=${page}`,
      this.fetcher
    );

    return {
      data,
      isLoading,
      error,
    };
  };

  public getTrendingMovies = async (
    page = 1,
    fetchOpt: RequestInit
  ): Promise<IMovies> => {
    const response = await fetch(
      `${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}&page=${page}`,
      fetchOpt
    );

    return await response.json();
  };

  public getTrendingSeries = async (
    fetchOpt: RequestInit
  ): Promise<ITvShows> => {
    const response = await fetch(
      `${this.baseUrl}/trending/tv/week?api_key=${this.apiKey}`,
      fetchOpt
    );

    return await response.json();
  };

  public getNowPlayingMovies = async (
    page = 1,
    fetchOpt: RequestInit
  ): Promise<IMovies> => {
    const response = await fetch(
      `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&page=${page}`,
      fetchOpt
    );

    return await response.json();
  };
}

const TMDBInstance = new TMDBApi().instance;

export const {
  getMovieById,
  getTopRatedMovies,
  getSeriesById,
  getPopularSeries,
  getPersonById,
  getTopRatedSeries,
  getPopularMovies,
  getTrendingMovies,
  getTrendingSeries,
  getNowPlayingMovies,
  multiSearchQuery,
  getPopularMoviesClient,
  getPopularSeriesClient,
} = TMDBInstance;
