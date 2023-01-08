import type { FC } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
interface CardProps {
  id: string;
  type: string;
  name: string;
}

const VideoCard: FC<CardProps> = ({ id, type, name }) => {
  return (
    <div>
      <LiteYouTubeEmbed id={id} title={name} />
      <div className='mt-4 text-lg dark:text-white'>{name}</div>
      <div className='text-md text-gray-500'>{type}</div>
    </div>
  );
};

export default VideoCard;
