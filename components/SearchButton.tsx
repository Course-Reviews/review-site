import { useModal } from 'async-modals';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import IconButton from './atom/IconButton';
import SearchModal from './SearchModal';

const SearchButton: React.FC = () => {

const modal = useModal(SearchModal)

  return (
    <IconButton variant='none' icon={FiSearch} onClick={() => modal.show()}/>
  )
}

export default SearchButton;