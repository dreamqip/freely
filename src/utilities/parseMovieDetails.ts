import type { IMovie } from '@/types/movie';
import { minutesToHoursAndMinutes } from './minutesToHoursAndMinutes';
import { getNumberWithCommas } from './getNumberWithCommas';
import { getLanguageFullName } from './getLanguageFullName';

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
