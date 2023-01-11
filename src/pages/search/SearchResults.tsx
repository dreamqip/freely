import type { MixedShow } from '@/types/search';
import type { FC } from 'react';
import { useAppSelector } from '@/hooks/redux';
import dynamic from 'next/dynamic';
import Spinner from '@/components/Spinner';

const Card = dynamic(() => import('@/components/ShowCarousel/ShowCard'));
const Empty = dynamic(() => import('@/components/Empty'));

interface Props {
  isLoading: boolean;
}

const SearchResults: FC<Props> = ({ isLoading }) => {
  const { results: data } = useAppSelector((state) => state.search);

  if (isLoading) return <Spinner spinnerSize={120} className='mt-10' />;

  return (
    <div className='mt-10'>
      {data && data.total_results > 0 ? (
        <div className='grid grid-cols-2 gap-6 md:grid-cols-5'>
          {data.results.map((show: MixedShow) => {
            return <Card key={show.id} show={show} />;
          })}
        </div>
      ) : (
        <Empty message='No results found' />
      )}
    </div>
  );
};

export default SearchResults;
