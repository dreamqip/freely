import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import type { IMovies } from '@/types/movie';
import { getPopularMovies } from '@/services/themoviedb';
import { SWRConfig } from 'swr';
import { NextSeo } from 'next-seo';
import MoviesList from '@/pages/movies/MoviesList';
import dynamic from 'next/dynamic';

const BackTop = dynamic(() => import('@/components/BackTop'));

const Movies: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  fallback,
}) => {
  return (
    <>
      <NextSeo
        title='Popular Movies'
        description='Check out the most popular movies'
      />
      <div>
        <h1 className='m-0 text-center text-6xl dark:text-white'>Movies</h1>
        <SWRConfig value={{ fallback }}>
          <MoviesList />
        </SWRConfig>
        <BackTop />
      </div>
    </>
  );
};

export default Movies;

export const getStaticProps: GetStaticProps<{
  fallback: {
    [key: string]: IMovies;
  };
}> = async () => {
  const popularMovies = await getPopularMovies(1, {});

  return {
    props: {
      fallback: {
        [`${process.env.BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&page=1`]:
          popularMovies,
      },
    },
    revalidate: 60 * 60 * 24,
  };
};
