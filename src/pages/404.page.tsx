import type { NextPage } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';

const NotFound: NextPage = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <div className='mb-6 text-center text-[120px] font-black leading-none text-gray-700 dark:text-gray-400 md:text-[220px]'>
        404
      </div>
      <h1 className='text-center text-4xl font-black dark:text-white'>
        You have found a secret place.
      </h1>
      <div className='mx-auto mt-4 max-w-[500px] text-center text-xl dark:text-white'>
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </div>
      <Link href='/' className='mt-10'>
        <Button>Go back to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
