import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import type { IPerson } from '@/types/person';
import { getPersonById } from '@/services/themoviedb';
import { NextSeo, type NextSeoProps } from 'next-seo';
import Details from '@/pages/person/Details';
import dynamic from 'next/dynamic';

const ActorMoviesList = dynamic(() => import('@/pages/person/ActorMoviesList'));

const ProfileImageList = dynamic(
  () => import('@/pages/person/ProfileImageList'),
  {
    ssr: false,
  }
);

const PersonPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ person, id }) => {
  const seoOptions: NextSeoProps = {
    title: person?.name,
    description: person?.biography,
    canonical: `https://freely.vercel.app/person/${id}`,
    openGraph: {
      title: person?.name,
      description: person?.biography,
      images: [
        {
          url: `https://image.tmdb.org/t/p/original${person?.profile_path}`,
          width: 1280,
          height: 720,
          alt: person?.name,
        },
      ],
    },
  };

  return (
    <div>
      <NextSeo {...seoOptions} />
      <Details person={person} />
      <ActorMoviesList
        movies={person.combined_credits.cast}
        title='Known for'
      />
      <ProfileImageList images={person.images.profiles} />
    </div>
  );
};

export default PersonPage;

export const getServerSideProps: GetServerSideProps<{
  person: IPerson;
  id: number;
}> = async ({ params, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200'
  );
  const id = Number(params?.id);

  const person = await getPersonById(id, {});

  if (!person) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      person,
      id: id,
    },
  };
};
