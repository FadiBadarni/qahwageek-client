import React from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { searchPosts } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery, setSearchResults } from 'store/post/searchSlice';
import { PostSearchResult } from 'models/post';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();

  const query = useSelector((state: RootState) => state.search.data.query);
  const searchResults = useSelector(
    (state: RootState) => state.search.data.results
  );
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      dispatch(searchPosts(query.trim()));
    }
  };

  const handleSelect = (result: PostSearchResult) => {
    dispatch(setSearchQuery(''));
    dispatch(setSearchResults([]));
    navigate(`/posts/${result.id}`);
  };

  return (
    <div className="w-full max-w-lg lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        ابحث عن مقال
      </label>
      <Combobox
        as="div"
        value={query}
        onChange={(value) => dispatch(setSearchQuery(value))}
      >
        <div className="relative">
          <Combobox.Input
            className="bg-light-input dark:bg-dark-border block w-full rounded-md border-0 py-1.5 pr-10 pl-3 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-gray-100 focus:ring-0 sm:text-sm sm:leading-6"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="ابحث عن مقال"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400 dark:text-gray-500"
              aria-hidden="true"
            />
          </div>
          {searchResults.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-dark-layer py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {searchResults.map((result) => (
                <Combobox.Option
                  key={result.id}
                  value={result.title}
                  className={({ active }) =>
                    `flex justify-start items-center relative cursor-default select-none py-2 pl-3 pr-3 ${
                      active
                        ? 'bg-brand-500 text-white'
                        : 'text-gray-900 dark:text-white'
                    }`
                  }
                  onClick={() => handleSelect(result)}
                >
                  <>
                    <img
                      src={result.mainImageUrl}
                      alt=""
                      className="h-10 w-10 object-cover rounded-md ml-4"
                    />
                    <span className="block truncate text-xs">
                      {result.title}
                    </span>
                  </>
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default SearchInput;
