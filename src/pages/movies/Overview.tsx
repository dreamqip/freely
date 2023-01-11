import type { FC } from 'react';
import { useAppSelector } from '@/hooks/redux';
import Cast from './Cast';
import dynamic from 'next/dynamic';

const Similar = dynamic(() => import('@/pages/movies/Similar'));
const Recommended = dynamic(() => import('@/pages/movies/Recommended'));
const Reviews = dynamic(() => import('@/components/Reviews'));

const Overview: FC = () => {
  const { reviews } = useAppSelector((state) => state.movie);

  return (
    <>
      <Cast />
      <Similar />
      <Recommended />
      {reviews && <Reviews reviews={reviews} />}
    </>
  );
};

export default Overview;
