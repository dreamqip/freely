import type { FC } from 'react';
import VideoCard from '../VideoCard';
import { useAppSelector } from '@/hooks/redux';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import dynamic from 'next/dynamic';

const Empty = dynamic(() => import('@/components/Empty'));

const Videos: FC = () => {
  const { videos } = useAppSelector((state) => state.movie);
  const filteredVideos = videos?.results.filter(
    (video) => video.site === 'YouTube'
  );

  if (filteredVideos && filteredVideos.length === 0)
    return <Empty message='No videos found' />;

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
      {filteredVideos?.map((video) => {
        return (
          <VideoCard
            key={video.id}
            id={video.key}
            name={video.name}
            type={video.type}
          />
        );
      })}
    </div>
  );
};

export default Videos;
