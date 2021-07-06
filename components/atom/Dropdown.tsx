import React, { ElementType, useEffect, useState } from 'react';

import classnames from 'classnames';
import { HTMLAttributes } from 'react';
import { InputHTMLAttributes } from 'react';
import Ripple from './Ripple';
import Button from './Button';
import Expand from './Expand';
import { FiChevronDown } from 'react-icons/fi';
import { Control, Controller } from 'react-hook-form';

export interface Option {
  label: string;
  value: any;
}

interface DropdownProps {
  className?: string;
  options: Option[];
  name: string;
  control?: Control;
}

const Dropdown: React.FC<DropdownProps> = ({ options, children, name, control, ...rest }) => {
  const [focused, setFocused] = useState<boolean>(false);

  // useEffect(() => {
  //   if (onChange) {
  //     onChange(option);
  //   }
  // }, [option]);

  // useEffect(() => {
  //   if (selectedIndex) {
  //     setOption(options[selectedIndex]);
  //   }
  // }, [selectedIndex]);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => (
        <div className={'relative w-full'}>
          <Ripple grow rippleClassName={'bg-primary-200'} rippleContainerClassName='rounded-xl'>
            <button
              type='button'
              aria-expanded={focused}
              className={
                'bg-transparent border border-gray-300 px-3 py-2 rounded-xl focus:outline-none focus:ring focus:ring-primary-300 relative z-10 flex items-center text-gray-800'
              }
              onClick={() => setFocused((v) => !v)}
              onBlur={() => setFocused(false)}
              {...rest}
            >
              {options.find(o => o.value === value)?.label}
              <FiChevronDown className={'ml-2 absolute right-3'} size={20} />
            </button>
          </Ripple>
          <Expand
            expanded={focused}
            className={'bg-white absolute z-10 shadow-lg rounded-lg mt-2 w-full'}
          >
            <ul className={'p-2 divide-y divide-gray-200'}>
              {options.map((v, i) => (
                <li
                  onClick={() => onChange(v.value)}
                  key={i}
                  className={'p-1 px-3 cursor-pointer hover:bg-gray-100 '}
                >
                  {v.label}
                </li>
              ))}
            </ul>
          </Expand>
        </div>
      )}
    />
  );
};

export default Dropdown;
