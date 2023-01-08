import { type FC, useState } from 'react';
import type { IProfile } from '@/types/images';
import { imageBaseUrlOriginal } from '@/services/themoviedb';
import dynamic from 'next/dynamic';
import { shimmer, toBase64 } from '@/utilities/shimmer';
import ImageLegacyWithFallback from '@/components/ImageLegacy';

const Lightbox = dynamic(() => import('@/components/Lightbox'));
const Empty = dynamic(() => import('@/components/Empty'));

interface ImageListProps {
  images: IProfile[];
}

const ProfileImageList: FC<ImageListProps> = ({ images }) => {
  const [index, setIndex] = useState(-1);

  const closeLightbox = () => {
    setIndex(-1);
  };

  const photos =
    images.length > 0 &&
    images.map((image) => ({
      src: `${imageBaseUrlOriginal}${image.file_path}`,
      width: image.width,
      height: image.height,
      key: image.file_path,
      alt: 'Profile Image',
    }));

  return (
    <div>
      <h2 className='mb-4 text-center text-3xl font-semibold dark:text-white md:text-4xl'>
        Profile Images ({images.length})
      </h2>
      {photos ? (
        <div className='grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-6'>
          {photos.map((photo, i) => (
            <div
              key={photo.key}
              className='relative cursor-pointer overflow-hidden'
            >
              <ImageLegacyWithFallback
                onClick={() => setIndex(i)}
                sizes='(min-width: 768px) 25vw, (min-width: 1024px) 20vw, 33vw'
                width={photo.width}
                height={photo.height}
                src={photo.src}
                alt={photo.alt}
                placeholder='blur'
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(photo.width, photo.height)
                )}`}
                className='hover:opacity-70 transition-opacity duration-300 ease-in-out rounded-md'
              />
            </div>
          ))}
          <Lightbox
            slides={photos}
            open={index >= 0}
            index={index}
            close={closeLightbox}
          />
        </div>
      ) : (
        <Empty message='No images found' />
      )}
    </div>
  );
};

export default ProfileImageList;
