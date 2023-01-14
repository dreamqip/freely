import type { ITvShow } from '@/types/series';
import { minutesToMinutes } from '@/utilities/minutesToHoursAndMinutes';
import { getLanguageFullName } from '@/utilities/getLanguageFullName';
import { getSeriesSeasonsLength } from '@/utilities/getSeriesSeasons';

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
