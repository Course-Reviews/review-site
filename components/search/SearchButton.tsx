import { useModal } from 'async-modals';
import React, { HTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';
import IconButton from '../atom/IconButton';
import SearchModal from './SearchModal';

const SearchButton: React.FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
  const modal = useModal(SearchModal);

  return (
    <IconButton
      innerClassName={className}
      variant='none'
      icon={FiSearch}
      onClick={() => modal.show()}
    />
  );
};

export default SearchButton;
