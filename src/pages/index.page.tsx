import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import type { IMovies } from '@/types/movies';
import type { ITvShows } from '@/types/series';
import dynamic from 'next/dynamic';
import Hero from '@/pages/Hero';
import Explore from '@/pages/Explore';
import Spinner from '@/components/Spinner';
import {
  getNowPlayingMovies,
  getTopRatedMovies,
  getTopRatedSeries,
  getTrendingSeries,
} from '@/services/themoviedb';

const Watch = dynamic(() => import('@/pages/Watch'));
const ShowCarousel = dynamic(
  () => import('@/components/ShowCarousel/ShowCarousel'),
  {
    loading: () => <Spinner />,
  }
);

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  trendingSeries,
  topRatedSeries,
  topRated,
  nowPlaying,
}) => {
  return (
    <>
      <Hero />
      <Explore />
      <Watch />
      <ShowCarousel title='Trending Series' series={trendingSeries} />
      <ShowCarousel title='Now In Theaters' series={nowPlaying} />
      <ShowCarousel title='Top Rated Series' series={topRatedSeries} />
      <ShowCarousel title='Top Rated Movies' series={topRated} />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<{
  topRated: IMovies;
  nowPlaying: IMovies;
  trendingSeries: ITvShows;
  topRatedSeries: ITvShows;
}> = async () => {
  const topRated = await getTopRatedMovies(1, {});
  const nowPlaying = await getNowPlayingMovies(1, {});
  const trendingSeries = await getTrendingSeries({});
  const topRatedSeries = await getTopRatedSeries(1, {});

  return {
    props: {
      topRated,
      nowPlaying,
      trendingSeries,
      topRatedSeries,
    },
    revalidate: 60 * 60 * 24,
  };
};

export const config = {
  runtime: 'experimental-edge',
};
