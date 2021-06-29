import React, { ElementType, useState } from 'react';

import classnames from 'classnames';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import Ripple from './Ripple';
import Button from './Button';
import Expand from './Expand';
import { FiChevronDown } from 'react-icons/fi';

interface Option { label: string; value: string | number | boolean }

interface DropdownProps {
  options: Option[];

  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ options, children, disabled, ...rest }) => {
  const [focused, setFocused] = useState<boolean>(true);
  const [option, setOption] = useState<Option>(options[0]);

  return (
    <div className={'relative w-full'}>
        <Ripple disabled={disabled} grow rippleClassName={'bg-primary-100'} rippleContainerClassName='rounded-xl'>
      <button
      className={'bg-transparent border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:ring focus:ring-primary-300 relative z-10 flex items-center text-gray-800'}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} >
          {option.label}
          <FiChevronDown className={'ml-2 absolute right-3'} size={20}/>
        </button>
      </Ripple>
      <Expand expanded={focused} className={'bg-white absolute z-10 shadow-lg rounded-lg mt-2 w-full'}>
        <ul className={'p-2'}>
        {options.map((v, i) => <li onClick={() => setOption(v)} key={i} className={'p-1 px-3 cursor-pointer hover:bg-gray-100 rounded-lg'}>{v.label}</li>)}
        </ul>
      </Expand>
    </div>
  );
};

export default Dropdown;
