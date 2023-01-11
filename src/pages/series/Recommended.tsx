import type { FC } from 'react';
import { useAppSelector } from '@/hooks/redux';
import ShowCarousel from '@/components/ShowCarousel/ShowCarousel';

const Recommended: FC = () => {
  const { recommendations } = useAppSelector((state) => state.series);

  return (
    <>
      {recommendations ? (
        <ShowCarousel series={recommendations} title={'Recommended'} />
      ) : null}
    </>
  );
};

export default Recommended;
