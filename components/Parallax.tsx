import React, { HTMLAttributes, useEffect, useState } from 'react';

interface ParallaxProps extends HTMLAttributes<HTMLElement>{

}

const Parallax: React.FC<ParallaxProps> = ({...rest}) => {

  const [offset, setOffset] = useState(0);

  useEffect(() => {

    const listener = () => {
      const scrollY = window.scrollY;
      console.log(scrollY);
      setOffset(scrollY/2 )
    }
    document.addEventListener('scroll', listener)
    return () => document.removeEventListener('scroll', listener)

  }, [])

  return (
    <div {...rest} style={{backgroundPositionY: offset}}/>
  )
}

export default Parallax;