import type { NextPage } from 'next';
import Button from '@/components/Button';

const Error500: NextPage = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mb-6 text-center text-[120px] font-black leading-none text-gray-700 dark:text-gray-400 md:text-[220px]'>
        500
      </div>
      <h1 className='text-center text-4xl font-black dark:text-white'>
        Something bad just happened...
      </h1>
      <div className='mx-auto mt-4 max-w-[500px] text-center text-xl dark:text-white'>
        Our servers could not handle your request. Don&apos;t worry, our
        development team was already notified. Try refreshing the page.
      </div>
      <Button onClick={refreshPage}>Refresh the page</Button>
    </div>
  );
};

export default Error500;
