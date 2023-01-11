import type { FC } from 'react';
import { useAppSelector } from '@/hooks/redux';
import Cast from '@/pages/series/Cast';
import dynamic from 'next/dynamic';

const Similar = dynamic(() => import('@/pages/series/Similar'));
const Recommended = dynamic(() => import('@/pages/series/Recommended'));
const Reviews = dynamic(() => import('@/components/Reviews'));

const Overview: FC = () => {
  const { reviews } = useAppSelector((state) => state.series);

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
