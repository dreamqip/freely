import type { IMovie } from './movie';

export interface IMovies {
  page: number;
  results: IMovie[];
  total_results: number;
  total_pages: number;
}
