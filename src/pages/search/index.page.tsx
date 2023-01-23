import type { NextPage } from 'next';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { multiSearchQuery } from '@/services/themoviedb';
import { useEffect } from 'react';
import { setSearchResults } from '@/features/search/searchSlice';
import { NextSeo } from 'next-seo';
import SearchInput from '@/pages/search/SearchInput';
import dynamic from 'next/dynamic';
import useDebounce from '@/hooks/useDebounce';

const BackTop = dynamic(() => import('@/components/BackTop'));
const SearchResults = dynamic(() => import('@/pages/search/SearchResults'));

const Search: NextPage = () => {
  const { query } = useAppSelector((state) => state.search);
  const debouncedSearch = useDebounce(query, 300);
  const dispatch = useAppDispatch();

  const { data, isLoading } = multiSearchQuery(debouncedSearch);

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setSearchResults(data));
    }
  }, [isLoading, data, dispatch]);

  return (
    <>
      <NextSeo
        title='Search'
        description='Search for movies, tv shows and people'
      />
      <div className='relative h-full pt-6'>
        <SearchInput />
        {data && query ? (
          <SearchResults isLoading={isLoading} />
        ) : (
          <h1 className='mt-10 text-center text-3xl font-medium text-black dark:text-white md:text-5xl'>
            Start typing to search
          </h1>
        )}
        <BackTop />
      </div>
    </>
  );
};

export default Search;
