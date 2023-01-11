import { type ChangeEvent, type FC, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useAppDispatch } from '@/hooks/redux';
import { setSearchQuery } from '@/features/search/searchSlice';

const SearchInput: FC = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = (query: ChangeEvent<HTMLInputElement>) => {
    const { value } = query.target;

    setSearch(value);
    dispatch(setSearchQuery(value));
  };

  const handleClearSearch = () => {
    setSearch('');
    dispatch(setSearchQuery(''));
  };

  return (
    <div className='relative'>
      <input
        placeholder='Search for movies, tv shows, people...'
        type='text'
        onChange={handleSearch}
        className='h-16 w-full rounded-md border-2 border-gray-400 text-md px-4 md:text-2xl text-gray-500 outline-0 transition-all focus:border-gray-600 dark:bg-black dark:text-gray-300 dark:focus:border-gray-300'
        value={search}
      />
      {search && (
        <button
          type='button'
          className='absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 transition-all hover:text-gray-600 dark:hover:text-gray-300'
          onClick={handleClearSearch}
          aria-label='Clear search'
        >
          <XMarkIcon className='h-6 w-6' />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
