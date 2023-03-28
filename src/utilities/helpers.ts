import type { IActorCast } from '@/types/cast';
import type { IMovie } from '@/types/movie';
import type { IPerson } from '@/types/person';
import type { ITvShow, Season } from '@/types/series';

export const getSeriesSeasonsLength = (seasons: Season[]) => {
  return (
    seasons.filter(
      (season) => season.episode_count > 0 && season.name !== 'Specials'
    ).length || 0
  );
};

export const getNumberWithCommas = (number: number): string => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getLanguageFullName = (shortName: string): string => {
  switch (shortName) {
    case 'en':
      return 'English';
    case 'es':
      return 'Spanish';
    case 'fr':
      return 'French';
    case 'de':
      return 'German';
    case 'it':
      return 'Italian';
    case 'ja':
      return 'Japanese';
    case 'pt':
      return 'Portuguese';
    case 'ru':
      return 'Russian';
    case 'zh':
      return 'Chinese';
    default:
      return 'Unknown';
  }
};

export const getGender = (genderId: number): string => {
  switch (genderId) {
    case 1:
      return 'Female';
    case 2:
      return 'Male';
    default:
      return 'Unknown';
  }
};

export const minutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  return `${hours}h ${minutesLeft}m`;
};

export const minutesToMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  return hours > 0 ? `${hours}h ${minutesLeft}m` : `${minutesLeft}m`;
};

export const parseMovieDetails = (movie: IMovie) => {
  return [
    {
      label: 'Released',
      value: new Date(movie.release_date).toDateString(),
    },
    {
      label: 'Runtime',
      value: minutesToHoursAndMinutes(movie.runtime),
    },
    {
      label: 'Budget',
      value: movie.budget ? `$${getNumberWithCommas(movie.budget)}` : 'N/A',
    },
    {
      label: 'Revenue',
      value: movie.revenue ? `$${getNumberWithCommas(movie.revenue)}` : 'N/A',
    },
    {
      label: 'Genres',
      value: movie.genres.map((genre) => genre.name).join(', '),
    },
    {
      label: 'Status',
      value: movie.status,
    },
    {
      label: 'Language',
      value: getLanguageFullName(movie.original_language),
    },
    {
      label: 'Production',
      value: movie.production_companies
        .map((company) => company.name)
        .join(', '),
    },
  ];
};

export const parsePersonDetails = (person: IPerson) => {
  return [
    {
      label: 'Also knows as',
      value: person?.also_known_as.join(', ') || 'N/A',
    },
    {
      label: 'Birthday',
      value:
        (person?.birthday && new Date(person.birthday).toDateString()) ||
        'Unknown',
    },
    {
      label: 'Place of birth',
      value: person?.place_of_birth || 'Unknown',
    },
    {
      label: 'Deathday',
      value:
        (person?.deathday && new Date(person.deathday).toDateString()) ||
        'Unknown',
    },
    {
      label: 'Gender',
      value: (person?.gender && getGender(person.gender)) || 'Unknown',
    },
    {
      label: 'Biography',
      value: person?.biography || 'No biography available',
    },
  ];
};

export const parseSeriesDetails = (series: ITvShow) => {
  return [
    {
      label: 'Runtime',
      value:
        series.episode_run_time.length > 0
          ? minutesToMinutes(series.episode_run_time[0]) + ' per episode'
          : 'N/A',
    },
    {
      label: 'Creators',
      value:
        series.created_by.map((creator) => creator.name).join(', ') || 'N/A',
    },
    {
      label: 'Language',
      value: getLanguageFullName(series.original_language) || 'N/A',
    },
    {
      label: 'Status',
      value: series.status || 'N/A',
    },
    {
      label: 'Networks',
      value: series.networks.map((network) => network.name).join(', ') || 'N/A',
    },
    {
      label: 'First Air Date',
      value: series.first_air_date || 'N/A',
    },
    {
      label: 'Last Air Date',
      value: series.last_air_date || 'N/A',
    },
    {
      label: 'Number of Seasons',
      value: getSeriesSeasonsLength(series.seasons) || 'N/A',
    },
    {
      label: 'Number of Episodes',
      value: series.number_of_episodes,
    },
    {
      label: 'Homepage',
      value: series.homepage || 'N/A',
    },
  ];
};

export const sortActorMoviesByPopularity = (
  a: IActorCast,
  b: IActorCast
): number => {
  if (a.popularity < b.popularity) {
    return 1;
  }
  if (a.popularity > b.popularity) {
    return -1;
  }
  return 0;
};
