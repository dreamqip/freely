import type { ITvShows } from '@/types/series';
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { getPopularSeries } from '@/services/themoviedb';
import { SWRConfig } from 'swr';
import SeriesList from '@/pages/series/SeriesList';
import dynamic from 'next/dynamic';

const BackTop = dynamic(() => import('@/components/BackTop'));

const Series: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  fallback,
}) => {
  return (
    <div>
      <h1 className='m-0 text-center text-6xl dark:text-white'>Series</h1>
      <SWRConfig value={{ fallback }}>
        <SeriesList />
      </SWRConfig>
      <BackTop />
    </div>
  );
};

export default Series;

export const getStaticProps: GetStaticProps<{
  fallback: {
    [key: string]: ITvShows;
  };
}> = async () => {
  const popularSeries = await getPopularSeries(1, {});

  return {
    props: {
      fallback: {
        [`${process.env.BASE_URL}/tv/popular?api_key=${process.env.API_KEY}&page=1`]:
          popularSeries,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};
