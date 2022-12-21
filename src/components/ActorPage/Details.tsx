import type { IPerson } from '@/types/person';
import { FC, memo } from 'react';
import { parsePersonDetails } from '@/utilities/parsePersonDetails';
import { imageBaseUrlOriginal } from '@/services/themoviedb';
import ImageWithFallback from '@/components/Image';

interface Props {
  person: IPerson;
}

const Details: FC<Props> = ({ person }) => {
  const parsedDetails = parsePersonDetails(person);

  return (
    <div className='grid grid-cols-1 gap-x-8 lg:grid-cols-3'>
      <div className='flex justify-center lg:items-start'>
        <ImageWithFallback
          src={`${imageBaseUrlOriginal}${person?.profile_path}`}
          alt={person?.name}
          priority
          width={400}
          height={600}
          className='aspect-[2/3] w-3/4 rounded-md object-cover md:w-1/2 lg:w-full'
        />
      </div>
      <div className='mt-6 lg:col-span-2 lg:m-0'>
        <h1 className='text-3xl dark:text-white'>{person?.name}</h1>
        <table className='mt-6'>
          <tbody>
            {parsedDetails &&
              parsedDetails.map((detail) => {
                return (
                  <tr key={detail.detailName}>
                    <td className='pr-4 align-text-top dark:text-white'>
                      {detail.detailName}
                    </td>
                    <td className='dark:text-white'>
                      {detail.detailValue || 'Alive'}
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

export default memo(Details);
