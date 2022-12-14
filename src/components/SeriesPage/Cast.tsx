import type { FC } from 'react';
import CastList from '../CastCarousel/CastList';
import { useAppSelector } from '@/hooks/redux';

const Cast: FC = () => {
  const { credits } = useAppSelector((state) => state.series);

  return (
    <div>{credits ? <CastList credits={credits} title={'Cast'} /> : null}</div>
  );
};

export default Cast;
