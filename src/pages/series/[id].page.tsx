import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import type { ITvShow } from '@/types/series';
import type { NextPageWithTheme } from '@/types/app';
import { getSeriesById } from '@/services/themoviedb';
import Hero from '@/pages/series/Hero';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import {
  setSeriesCredits,
  setSeriesImages,
  setSeriesRecommendations,
  setSeriesReviews,
  setSeriesSimilar,
  setSeriesVideos,
} from '@/features/series/seriesSlice';
import { NextSeo, type NextSeoProps } from 'next-seo';
import Spinner from '@/components/Spinner';
import Storyline from '@/components/Storyline';

const Tabs = dynamic(() => import('@/components/Tabs'), {
  ssr: false,
});

const OverviewTab = dynamic(() => import('@/pages/series/Overview'), {
  loading: () => <Spinner className='h-screen' />,
});
const ImagesTab = dynamic(() => import('@/components/Images'), {
  loading: () => <Spinner className='h-screen' />,
});
const VideosTab = dynamic(() => import('@/components/Videos'), {
  loading: () => <Spinner className='h-screen' />,
});

const TvShow: NextPageWithTheme<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ series, id }) => {
  const dispatch = useAppDispatch();

  const seoOptions: NextSeoProps = {
    title: series?.name,
    description: series?.overview,
    canonical: `https://freely.vercel.app/series/${id}`,
    openGraph: {
      title: series?.name,
      description: series?.overview,
      images: [
        {
          url: `https://image.tmdb.org/t/p/w1280${series?.backdrop_path}`,
          width: 1280,
          height: 720,
          alt: series?.name,
        },
      ],
    },
    additionalMetaTags: [
      {
        property: 'keywords',
        content:
          series?.keywords.results.map((keyword) => keyword.name).join(', ') ||
          '',
      },
    ],
  };

  useEffect(() => {
    if (series) {
      dispatch(setSeriesReviews(series.reviews));
      dispatch(setSeriesImages(series.images));
      dispatch(setSeriesVideos(series.videos));
      dispatch(setSeriesSimilar(series.similar));
      dispatch(setSeriesRecommendations(series.recommendations));
      dispatch(setSeriesCredits(series.credits));
    }
  }, [dispatch, series]);

  return (
    <article className='relative top-14 md:top-20 pb-24'>
      <NextSeo {...seoOptions} />
      <Hero series={series} />
      <Storyline series={series} />
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

TvShow.theme = 'dark';

export default TvShow;

export const getServerSideProps: GetServerSideProps<{
  series: ITvShow;
  id: number;
}> = async ({ params, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200'
  );
  const id = Number(params?.id);

  const series = await getSeriesById(id, {});

  if (!series) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      series,
      id,
    },
  };
};
