import React, { FC, InputHTMLAttributes } from 'react';

type SearchBarProps = {} & InputHTMLAttributes<HTMLInputElement>;

const SearchBar: FC<SearchBarProps> = (props) => (
  <input
    {...props}
    type="text"
    placeholder="Buscar..."
    className="flex-1 mx-4 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400"
  />
);

export default SearchBar;
