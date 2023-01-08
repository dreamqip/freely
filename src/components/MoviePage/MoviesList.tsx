import type { FC } from 'react';
import type { IMovie } from '@/types/movie';
import { useEffect, useRef, useState } from 'react';
import ShowCard from '@/components/ShowCarousel/ShowCard';
import Spinner from '@/components/Spinner';
import { getPopularMoviesClient } from '@/services/themoviedb';
import { useObserver } from '@/hooks/useObserver';
import { useRouter } from 'next/router';

const MoviesList: FC = () => {
  const router = useRouter();
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [visible, setVisible] = useState<boolean>(true);
  const lastElement = useRef<HTMLDivElement | null>(null);

  const { data: movies, isLoading, error } = getPopularMoviesClient(page);

  useObserver(lastElement, page < totalPages, isLoading, () => {
    setPage((prev) => prev + 1);
  });

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setVisible(false);
    });
  }, [router]);

  useEffect(() => {
    if (!isLoading && movies && !error) {
      // make sure that there are no duplicates going into the state
      const filteredMovies = movies.results.filter(
        (movie) => !popularMovies.find((m) => m.id === movie.id)
      );
      setPopularMovies((prev) => [...prev, ...filteredMovies]);
      setTotalPages(movies.total_pages);
    }
  }, [error, isLoading, movies]);

  return (
    <>
      {popularMovies.length > 0 && (
        <div className='mt-6'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-7'>
            {popularMovies.map((show: IMovie) => {
              return <ShowCard key={show.id} show={show} />;
            })}
          </div>
        </div>
      )}
      {isLoading && <Spinner className='pt-10' spinnerSize={70} />}
      {visible && <div className='h-10' ref={lastElement}></div>}
    </>
  );
};

export default MoviesList;
