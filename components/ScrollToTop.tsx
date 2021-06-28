import React, { useState } from 'react';
import { useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import Button from './atom/Button';
import IconButton from './atom/IconButton';

interface ScrollToTopProps {

}

const ScrollToTop: React.FC<ScrollToTopProps> = ({}) => {

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {

    const listener = () => {
      const scrollTop = window.scrollY;
      if(scrollTop > 0 && !show){
        setShow(true);
      } else if (scrollTop <= 0 && show){
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
    <div className={'fixed bottom-0 right-0 m-5'}>
    {<IconButton icon={FiArrowUp} innerClassName={show ? 'animate-float-in' : 'animate-float-out opacity-0'} onClick={handleClick}/>}
    </div>
  );
};

export default ScrollToTop;