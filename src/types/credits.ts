import type { IMovieCast, ITvShowCast} from "@/types/cast";
import type { IMovieCrew, ITvShowCrew} from "@/types/crew";

export interface IMovieCredits {
  id: number;
  cast: IMovieCast[];
  crew: IMovieCrew[];
}

export interface ITvShowCredits {
  id: number;
  cast: ITvShowCast[];
  crew: ITvShowCrew[];
}
