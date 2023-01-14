import type { Season } from '@/types/series';

export const getSeriesSeasonsLength = (seasons: Season[]) => {
  return (
    seasons.filter(
      (season) => season.episode_count > 0 && season.name !== 'Specials'
    ).length || 0
  );
};
