import classNames from 'classnames';
import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Pagination } from '../../types/config';
import IconButton from './IconButton';

interface PaginationControlsProps {
  className?: string;
  pagination: Pagination;
  setPage: (page: number) => void;
}

// the maximum number of page switch buttons
const MAX_BUTTONS = 3;

interface PaginationControlProps {
  pageNum: number;
  setPage: (page: number) => void;
  active?: boolean;
}

const PaginationControl: React.FC<PaginationControlProps> = ({ pageNum, setPage, active }) => (
  <button onClick={() => setPage(pageNum - 1)} className={classNames('mx-1 rounded w-9 h-9 shadow-lg', active ? 'bg-primary-500 text-white font-bold' : 'bg-white text-gray-700 font-semibold')} >{pageNum}</button>
);

const PaginationDots: React.FC = () => <div className={'mx-1 text-gray-700 font-semibold'}>...</div>;

const PaginationControls: React.FC<PaginationControlsProps> = ({
  pagination: { totalCount, page, pageSize },
  setPage,
  className,
}) => {
  const numPages = Math.ceil(totalCount / pageSize);

  const renderButtons = () => {

    const pagesBehind = page;
    const pagesAhead = numPages - page - 1

    // This is how many previous page buttons to render
    const behindBudget = Math.min(pagesBehind, Math.max(MAX_BUTTONS, MAX_BUTTONS * 2 - pagesAhead))
    // This is how many next page buttons to render
    const aheadBudget = Math.min(pagesAhead, Math.max(MAX_BUTTONS, MAX_BUTTONS * 2 - pagesBehind))

    const buttons: JSX.Element[] = [];

    // back buttons
    for(let x = 0; x < behindBudget; x++){
      const pageNum = (page + 1) - (behindBudget - x);
      if(x === 0){
        buttons.push(<PaginationControl setPage={setPage} pageNum={1}/>)
      } else if (x === 1 && page > behindBudget){
        buttons.push(<PaginationDots/>)
      } else {
        buttons.push(<PaginationControl setPage={setPage} pageNum={pageNum}/>)
      }
    }

    // current
    buttons.push(<PaginationControl active pageNum={page+1} setPage={setPage}/>)

        // forward buttons
        for(let x = 0; x < aheadBudget; x++){
          const pageNum = x + page + 2
          if(x === aheadBudget - 2 && pageNum + 1 !== numPages){
            buttons.push(<PaginationDots/>)
          } else if (x === aheadBudget - 1) {
            buttons.push(<PaginationControl pageNum={numPages} setPage={setPage}/>)
          } else {
            buttons.push(<PaginationControl pageNum={pageNum} setPage={setPage}/>)
          }

        }

    return buttons;
  }

  return (
    <div className={classNames('flex', className)}>
      <IconButton icon={FiChevronLeft} variant='none' className={'mr-2'} onClick={() => setPage(page - 1)} disabled={page === 0}/>
      {renderButtons()}
      <IconButton icon={FiChevronRight} variant='none' className={'ml-2'} onClick={() => setPage(page + 1)} disabled={page + 1 === numPages}/>
    </div>
  );
};

export default PaginationControls;
