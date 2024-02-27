import React, { useState } from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { searchPosts } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery, setSearchResults } from 'store/post/searchSlice';
import ReactSelect, { components } from 'react-select';
import { searchStyles } from './searchStyles';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchResults = useSelector(
    (state: RootState) => state.search.data.results
  );
  const [inputValue, setInputValue] = useState('');

  const options = searchResults.map((result) => ({
    value: result.id,
    label: result.title,
    mainImageUrl: result.mainImageUrl,
  }));

  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      dispatch(setSearchQuery(''));
      dispatch(setSearchResults([]));
      navigate(`/posts/${selectedOption.value}`);
    }
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      dispatch(searchPosts(inputValue.trim()));
    }
  };

  // Custom option component to display images
  const CustomOption = (props: any) => (
    <components.Option {...props}>
      <img
        src={props.data.mainImageUrl}
        alt=""
        className="h-10 w-10 object-cover rounded-md ml-4"
      />
      <span className="line-clamp-2	text-md">{props.data.label}</span>
    </components.Option>
  );

  return (
    <div className="w-full max-w-lg lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        ابحث عن مقال
      </label>
      <ReactSelect
        options={options}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        styles={searchStyles}
        components={{ Option: CustomOption }}
        placeholder="ابحث عن مقال"
        className="react-select-container"
        classNamePrefix="react-select"
        inputValue={inputValue}
      />
    </div>
  );
};

export default SearchInput;
