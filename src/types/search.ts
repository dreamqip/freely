import type { IMovie} from "@/types/movie";
import type { ITvShow} from "@/types/series";

export interface ISearch {
  page: number;
  results: MixedShow[];
  total_results: number;
  total_pages: number;
}

type Either<T, U> = T | U;

export type MixedShow = Either<IMovie, ITvShow>;
