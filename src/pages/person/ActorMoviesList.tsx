import type { FC } from 'react';
import ActorMovieCard from './ActorMovieCard';
import { SwiperSlide } from 'swiper/react';
import type { IActorCast } from '@/types/cast';
import Swiper from '@/components/Swiper';
import dynamic from 'next/dynamic';
import {sortActorMoviesByPopularity} from "@/utilities/helpers";

const Empty = dynamic(() => import('@/components/Empty'));

interface MoviesListProps {
  movies: IActorCast[];
  title: string;
}

const ActorMoviesList: FC<MoviesListProps> = ({ movies, title }) => {
  const sortedMovies = [...movies].sort(sortActorMoviesByPopularity);

  return (
    <div className='py-10'>
      <h2 className='mb-4 text-center text-3xl font-semibold dark:text-white md:text-4xl'>
        {title}
      </h2>
      <Swiper>
        {sortedMovies && sortedMovies.length > 0 ? (
          sortedMovies.map((movie) => {
            return (
              <SwiperSlide key={movie.credit_id}>
                <ActorMovieCard show={movie} />
              </SwiperSlide>
            );
          })
        ) : (
          <Empty message='No shows found' />
        )}
      </Swiper>
    </div>
  );
};

export default ActorMoviesList;
