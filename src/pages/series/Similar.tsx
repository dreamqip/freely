import type { FC } from 'react';
import { useAppSelector } from '@/hooks/redux';
import ShowCarousel from '@/components//ShowCarousel/ShowCarousel';

const Similar: FC = () => {
  const { similar } = useAppSelector((state) => state.series);

  return (
    <>{similar ? <ShowCarousel series={similar} title={'Similar'} /> : null}</>
  );
};

export default Similar;
