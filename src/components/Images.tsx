import { type FC, useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { imageBaseUrlOriginal } from '@/services/themoviedb';
import { shimmer, toBase64 } from '@/utilities/shimmer';
import dynamic from 'next/dynamic';
import ImageWithLegacyFallback from '@/components/ImageLegacy';

const Lightbox = dynamic(() => import('@/components/Lightbox'));
const Empty = dynamic(() => import('@/components/Empty'));

const Images: FC = () => {
  const { movie, series } = useAppSelector((state) => state);
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState<
    | {
        src: string;
        width: number;
        height: number;
        key: string;
        alt: string;
      }[]
    | null
  >(null);

  const closeLightbox = () => {
    setIndex(-1);
  };

  const mapImages = useCallback(() => {
    if (
      (movie.images && movie.images.backdrops.length === 0) ||
      (series.images && series.images.backdrops.length === 0)
    )
      return null;

    return (
      movie.images?.backdrops.map((image) => ({
        src: `${imageBaseUrlOriginal}${image.file_path}`,
        width: image.width,
        height: image.height,
        key: image.file_path,
        alt: 'Backdrop',
      })) ||
      series.images?.backdrops.map((image) => ({
        src: `${imageBaseUrlOriginal}${image.file_path}`,
        width: image.width,
        height: image.height,
        key: image.file_path,
        alt: 'Backdrop',
      }))
    );
  }, [movie.images, series.images]);

  useEffect(() => {
    setPhotos(mapImages() || null);
  }, [mapImages, movie.images, series.images]);

  return (
    <div className='py-4 md:py-10 relative'>
      {photos ? (
        <div className='grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4'>
          {photos.map((photo, i) => (
            <div
              key={photo.key}
              onClick={() => setIndex(i)}
              className='relative cursor-pointer overflow-hidden before:block before:absolute before:inset-0 before:bg-black before:transition-opacity before:duration-300 before:ease-in-out before:opacity-0 hover:before:opacity-50 before:z-10 rounded-md'
            >
              <ImageWithLegacyFallback
                sizes='(min-width: 768px) 25vw, 50vw'
                width={photo.width}
                height={photo.height}
                src={photo.src}
                alt={photo.alt}
                placeholder='blur'
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(photo.width, photo.height)
                )}`}
                className='rounded-md'
              />
            </div>
          ))}
          <Lightbox
            open={index >= 0}
            slides={photos}
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

export default Images;
