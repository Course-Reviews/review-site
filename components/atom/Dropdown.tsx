import React, { ElementType, useEffect, useState } from 'react';

import classnames from 'classnames';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import Ripple from './Ripple';
import Button from './Button';
import Expand from './Expand';
import { FiChevronDown } from 'react-icons/fi';

export interface Option { label: string; value: any }

interface DropdownProps {
  className?: string;
  options: Option[];
  selectedIndex?: number;
  disabled?: boolean;
  onChange?: (val: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, children, onChange, selectedIndex = 0, disabled, ...rest }) => {
  selectedIndex = selectedIndex === -1 ? 0 : selectedIndex;
  const [focused, setFocused] = useState<boolean>(false);
  const [option, setOption] = useState<Option>(options[selectedIndex]);

  useEffect(() => {
    if(onChange){
      onChange(option)
    }
  }, [option])

  return (
    <div className={'relative w-full'}>
        <Ripple disabled={disabled} grow rippleClassName={'bg-primary-200'} rippleContainerClassName='rounded-xl'>
      <button
      type='button'
      aria-expanded={focused}
      className={'bg-transparent border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:ring focus:ring-primary-300 relative z-10 flex items-center text-gray-800'}
      onClick={() => setFocused(v => !v)} onBlur={() => setFocused(false)} {...rest}>
          {option.label}
          <FiChevronDown className={'ml-2 absolute right-3'} size={20}/>

        </button>
      </Ripple>
      <Expand expanded={focused} className={'bg-white absolute z-10 shadow-lg rounded-lg mt-2 w-full'}>
        <ul className={'p-2 divide-y divide-gray-200'}>
        {options.map((v, i) => <li onClick={() => setOption(v)} key={i} className={'p-1 px-3 cursor-pointer hover:bg-gray-100 '}>{v.label}</li>)}
        </ul>
      </Expand>
    </div>
  );
};

export default Dropdown;
