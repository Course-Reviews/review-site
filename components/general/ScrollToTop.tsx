import { useModal } from 'async-modals';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import IconButton from '../atom/IconButton';

interface ScrollToTopProps {

}

const ScrollToTop: React.FC<ScrollToTopProps> = ({}) => {

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {

    const listener = () => {
      const scrollTop = window.scrollY;
      if(scrollTop > 500 && !show){
        setShow(true);
      } else if (scrollTop <= 500 && show){
        setShow(false);
      }
    };

    document.addEventListener('scroll', listener);
    return () => document.removeEventListener('scroll', listener);
  }, [show]);

  const handleClick = () => {
    window.scrollTo({top: 0});
    // setShow(false);
  };

  return (
    <div className={classNames('fixed bottom-0 left:0 md:right-0 m-5 z-20', show ? 'animate-float-in' : 'animate-float-out opacity-0')}>
    {<IconButton icon={FiArrowUp}  onClick={handleClick} aria-label='Back to top'/>}
    </div>
  );
};

export default ScrollToTop;