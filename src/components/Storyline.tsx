import { type FC, useEffect, useState } from 'react';
import type { IMovie } from '@/types/movie';
import type { ITvShow } from '@/types/series';
import { imageBaseUrlW400 } from '@/services/themoviedb';
import { shimmer, toBase64 } from '@/utilities/shimmer';
import { parseMovieDetails, parseSeriesDetails } from '@/utilities/helpers';
import ImageLegacyWithFallback from '@/components/ImageLegacy';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

interface Props {
  series: IMovie | ITvShow;
}

const Storyline: FC<Props> = ({ series }) => {
  const [blurDataUrl, setBlurDataUrl] = useState('');
  const [rendered, setRendered] = useState(false);
  const parsedDetails =
    'seasons' in series
      ? parseSeriesDetails(series)
      : parseMovieDetails(series);

  useIsomorphicLayoutEffect(() => {
    setRendered(false);
  }, [series]);

  useEffect(() => {
    setBlurDataUrl(`data:image/svg+xml;base64,${toBase64(shimmer(250, 400))}`);
    setRendered(true);
  }, [series]);

  return (
    <div className='grid grid-cols-1 gap-8 pt-20 md:grid-cols-[250px_minmax(0,_1fr)]'>
      <div className='relative mx-auto md:mx-0'>
        {rendered && (
          <ImageLegacyWithFallback
            src={`${imageBaseUrlW400}${series.poster_path}`}
            alt={('title' in series && series.title) || series.name}
            placeholder='blur'
            blurDataURL={blurDataUrl}
            className='aspect-[2/3] rounded-md object-cover'
            width={250}
            height={400}
          />
        )}
      </div>
      <div className='relative'>
        <h2 className='text-2xl dark:text-white md:text-3xl'>Storyline</h2>
        <h3 className='text-md mt-2 dark:text-primary-dark md:text-lg'>
          {series.overview}
        </h3>
        <div className='mt-4'>
          <table className='w-full table-fixed'>
            <tbody>
              {parsedDetails.map((detail) => (
                <tr
                  key={detail.label}
                  className='flex justify-between gap-x-6 md:table-row'
                >
                  <td className='text-sm font-light tracking-tight text-white md:text-base'>
                    {detail.label}
                  </td>
                  <td className='text-sm font-light tracking-tight text-white md:text-base truncate'>
                    {detail.label === 'Homepage' && detail.value !== 'N/A' ? (
                      <a
                        className='underline md:hover:underline md:underline-none'
                        href={detail.value.toString()}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span>{detail.value}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Storyline;
