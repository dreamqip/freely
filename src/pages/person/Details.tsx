import type { IPerson } from '@/types/person';
import type { FC } from 'react';
import { imageBaseUrlOriginal } from '@/services/themoviedb';
import { shimmer, toBase64 } from '@/utilities/shimmer';
import ImageLegacyWithFallback from '@/components/ImageLegacy';
import {parsePersonDetails} from "@/utilities/helpers";

interface Props {
  person: IPerson;
}

const Details: FC<Props> = ({ person }) => {
  const parsedDetails = parsePersonDetails(person);

  return (
    <div className='grid grid-cols-1 gap-x-8 lg:grid-cols-3'>
      <div className='flex justify-center lg:items-start'>
        <div className='w-3/4 md:w-1/2 lg:w-full'>
          <ImageLegacyWithFallback
            src={`${imageBaseUrlOriginal}${person?.profile_path}`}
            alt={person?.name}
            priority
            width={400}
            height={600}
            placeholder='blur'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(400, 600)
            )}`}
            className='aspect-[2/3] rounded-md object-cover'
          />
        </div>
      </div>
      <div className='mt-6 lg:col-span-2 lg:m-0'>
        <h1 className='text-3xl dark:text-white'>{person?.name}</h1>
        <table className='mt-6'>
          <tbody>
            {parsedDetails &&
              parsedDetails.map((detail) => {
                return (
                  <tr key={detail.label}>
                    <td className='text-sm font-light tracking-tight pr-4 dark:text-white md:text-base align-text-top'>
                      {detail.label}
                    </td>
                    <td className='text-sm font-light tracking-tight dark:text-white md:text-base'>
                      {detail.value}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
