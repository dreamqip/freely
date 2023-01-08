import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { NextPageWithTheme } from '@/types/app';
import type { IKeyword, IMovie } from '@/types/movie';
import { getMovieById } from '@/services/themoviedb';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import {
  setCredits,
  setImages,
  setRecommendations,
  setReviews,
  setSimilar,
  setVideos,
} from '@/features/movie/movieSlice';
import { NextSeo, type NextSeoProps } from 'next-seo';
import Spinner from '@/components/Spinner';
import Hero from '@/components/MoviePage/Hero';
import dynamic from 'next/dynamic';
import Storyline from '@/components/Storyline';

const Tabs = dynamic(() => import('@/components/Tabs'), {
  ssr: false,
});

const OverviewTab = dynamic(() => import('@/components/MoviePage/Overview'), {
  loading: () => <Spinner className='h-screen' />,
});
const ImagesTab = dynamic(() => import('@/components/Images'), {
  loading: () => <Spinner className='h-screen' />,
});
const VideosTab = dynamic(() => import('@/components/Videos'), {
  loading: () => <Spinner className='h-screen' />,
});

const MoviePage: NextPageWithTheme<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ movie, id }) => {
  const dispatch = useAppDispatch();

  const seoOptions: NextSeoProps = {
    title: `${movie.title} | Freely`,
    description: movie?.overview,
    canonical: `https://freely.vercel.app/movies/${id}`,
    openGraph: {
      title: movie?.title,
      description: movie?.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`,
          width: 1280,
          height: 720,
          alt: movie?.title,
        },
      ],
    },
    additionalMetaTags: [
      {
        property: 'keywords',
        content:
          movie?.keywords.keywords
            .map((keyword: IKeyword) => keyword.name)
            .join(', ') || '',
      },
    ],
  };

  useEffect(() => {
    if (movie) {
      dispatch(setReviews(movie.reviews));
      dispatch(setImages(movie.images));
      dispatch(setVideos(movie.videos));
      dispatch(setSimilar(movie.similar));
      dispatch(setRecommendations(movie.recommendations));
      dispatch(setCredits(movie.credits));
    }
  }, [dispatch, id, movie]);

  return (
    <article className='flex flex-col'>
      <NextSeo {...seoOptions} />
      <Hero movie={movie} />
      <Storyline series={movie} />
      <Tabs
        tabs={[
          {
            name: 'Overview',
            component: <OverviewTab />,
          },
          {
            name: 'Images',
            component: <ImagesTab />,
          },
          {
            name: 'Videos',
            component: <VideosTab />,
          },
        ]}
      />
    </article>
  );
};

MoviePage.theme = 'dark';

export default MoviePage;

export const getServerSideProps: GetServerSideProps<{
  movie: IMovie;
  id: number;
}> = async ({ params, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200'
  );
  const id = Number(params?.id);

  const movie = await getMovieById(id, {});

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
      id,
    },
  };
};
