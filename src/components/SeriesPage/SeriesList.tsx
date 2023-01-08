import { type FC, useEffect, useRef, useState } from 'react';
import type { ITvShow } from '@/types/series';
import { useRouter } from 'next/router';
import { useObserver } from '@/hooks/useObserver';
import { getPopularSeriesClient } from '@/services/themoviedb';
import Spinner from '@/components/Spinner';
import ShowCard from '@/components/ShowCarousel/ShowCard';

const SeriesList: FC = () => {
  const router = useRouter();
  const [popularSeries, setPopularSeries] = useState<ITvShow[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const lastElement = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  const { series, isLoading, error } = getPopularSeriesClient(page);

  useObserver(lastElement, page < totalPages, isLoading, () => {
    setPage((prev) => prev + 1);
  });

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setVisible(false);
    });
  }, [router]);

  useEffect(() => {
    if (!isLoading && series && !error) {
      // make sure that there are no duplicates going into the store
      const filteredSeries = series.results.filter((show) => {
        return !popularSeries.some((s) => s.id === show.id);
      });
      setPopularSeries((prev) => [...prev, ...filteredSeries]);
      setTotalPages(series.total_pages);
    }
  }, [error, isLoading, series]);

  return (
    <>
      {popularSeries.length > 0 && (
        <div className='mt-6'>
          <div className='grid grid-cols-2 gap-6 md:grid-cols-7'>
            {popularSeries.map((show: ITvShow) => {
              return <ShowCard key={show.id} show={show} />;
            })}
          </div>
        </div>
      )}
      {visible && <div className='h-10' ref={lastElement}></div>}
      {isLoading && <Spinner />}
    </>
  );
};

export default SeriesList;
