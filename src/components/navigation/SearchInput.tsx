import React from 'react';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { searchPosts } from 'store/post/postActions';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery, setSearchResults } from 'store/post/searchSlice';
import ReactSelect, { components } from 'react-select';
import { getSearchStyles } from './searchStyles';

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentTheme = useSelector((state: RootState) => state.theme.theme);
  const { results, query } = useSelector(
    (state: RootState) => state.search.data
  );

  const options = results.map((result) => ({
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
    dispatch(setSearchQuery(newValue));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' && query.trim() !== '') {
      dispatch(searchPosts(query.trim()));
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
    <div className="w-full max-w-lg lg:max-w-72">
      <label htmlFor="search" className="sr-only">
        ابحث عن مقال
      </label>
      <ReactSelect
        options={options}
        onChange={handleChange}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        styles={getSearchStyles(currentTheme)}
        components={{ Option: CustomOption }}
        placeholder="ابحث عن مقال"
        className="react-select-container"
        classNamePrefix="react-select"
        inputValue={query}
        noOptionsMessage={() => 'لا توجد نتائج'}
        isClearable={true}
      />
    </div>
  );
};

export default SearchInput;
