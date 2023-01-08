import type { FC, PropsWithChildren } from 'react';
import { FaceFrownIcon } from '@heroicons/react/24/solid';

interface EmptyProps {
  icon?: JSX.Element;
  message?: string;
}

const Empty: FC<PropsWithChildren<EmptyProps>> = ({
  children,
  message = 'No data found',
  icon = <FaceFrownIcon className='w-12 h-12 text-gray-400' />,
}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div>{icon}</div>
      <p className='text-center text-2xl font-medium dark:text-white'>
        {message}
      </p>
      <div className='mx-auto mt-4 max-w-[500px] text-center text-xl dark:text-white'>
        {children}
      </div>
    </div>
  );
};

export default Empty;
