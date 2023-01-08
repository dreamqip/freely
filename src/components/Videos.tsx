import { type FC, useMemo } from 'react';
import { useAppSelector } from '@/hooks/redux';
import dynamic from 'next/dynamic';

const VideoCard = dynamic(() => import('@/components/VideoCard'));

const Empty = dynamic(() => import('@/components/Empty'));

const Videos: FC = () => {
  const { movie, series } = useAppSelector((state) => state);

  const filteredVideos = useMemo(() => {
    const condition =
      (movie.videos && movie.videos.results.length === 0) ||
      (series.videos && series.videos.results.length === 0);
    if (condition) return null;

    return (
      movie.videos?.results.filter((video) => video.site === 'YouTube') ||
      series.videos?.results.filter((video) => video.site === 'YouTube')
    );
  }, [movie.videos, series.videos]);

  return (
    <div className='py-4 md:py-10 relative'>
      {filteredVideos ? (
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4'>
          {filteredVideos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.key}
              name={video.name}
              type={video.type}
            />
          ))}
        </div>
      ) : (
        <Empty message='No videos found' />
      )}
    </div>
  );
};

export default Videos;
