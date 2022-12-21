import type { InferGetServerSidePropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import Details from '@/components/ActorPage/Details';
import dynamic from 'next/dynamic';
import {
  getActorById,
  getRunningQueriesThunk,
  useGetActorByIdQuery,
} from '@/services/themoviedb';
import { wrapper } from '@/store';
import { NextSeo, NextSeoProps } from 'next-seo';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

const ActorMovies = dynamic(
  () => import('@/components/ActorPage/ActorMovies'),
  { suspense: true }
);

const ProfileImageList = dynamic(
  () => import('@/components/ActorPage/ProfileImageList'),
  { suspense: true }
);

const ActorPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const router = useRouter();
  const { data } = useGetActorByIdQuery(id, {
    skip: router.isFallback,
  });

  const seoOptions: NextSeoProps = {
    title: data?.name,
    description: data?.biography,
    openGraph: {
      title: data?.name,
      description: data?.biography,
      images: [
        {
          url: `https://image.tmdb.org/t/p/original${data?.profile_path}`,
          width: 1280,
          height: 720,
          alt: data?.name,
        },
      ],
    },
  };

  return (
    <div>
      <NextSeo {...seoOptions} />
      {data ? (
        <>
          <Details person={data} />
          <Suspense fallback={<Spinner />}>
            <ActorMovies movies={data.combined_credits.cast} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <ProfileImageList images={data.images.profiles} />
          </Suspense>
        </>
      ) : null}
    </div>
  );
};

export default ActorPage;

export const getServerSideProps = wrapper.getServerSideProps(
  ({ dispatch }) =>
    async (context) => {
      const { id } = context.query;
      const parsedId = parseInt(id as string, 10);

      dispatch(getActorById.initiate(parsedId));

      await Promise.all(dispatch(getRunningQueriesThunk()));

      return {
        props: {
          id: parsedId,
        },
      };
    }
);
