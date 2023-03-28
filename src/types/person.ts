import type { IActorCast} from "@/types/cast";
import type { IActorCrew} from "@/types/crew";
import type { IProfile} from "@/types/images";

export interface IPerson {
  birthday: string | null;
  known_for_department: string;
  deathday: null | string;
  id: number;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string | null;
  profile_path: string | null;
  adult: boolean;
  imdb_id: string;
  homepage: null | string;
  combined_credits: CombinedCredits;
  images: {
    profiles: IProfile[];
  };
}

interface CombinedCredits {
  cast: IActorCast[];
  crew: IActorCrew[];
}

export interface ISearchPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for: IActorCast[];
  known_for_department: string;
  media_type: string;
  name: string;
  popularity: number;
  profile_path: string | null;
}
