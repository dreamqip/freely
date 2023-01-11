import type { NextPage } from 'next';
import { SignalSlashIcon } from '@heroicons/react/24/solid';

const Offline: NextPage = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <SignalSlashIcon className='mb-4 h-40 w-40 text-gray-700 dark:text-gray-400' />
      <div className='mb-6 text-center text-[120px] font-black leading-none text-gray-700 dark:text-gray-400 md:text-[220px]'>
        Offline
      </div>
      <h1 className='text-center text-4xl font-black dark:text-white'>
        You are offline now. Please connect to the network.
      </h1>
    </div>
  );
};

export default Offline;
