import React from 'react';
import classnames from 'classnames';
import { HTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface FormGroupProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  required?: boolean;
  error?: FieldError;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, required, children, error, className }) => (
  <div className={classnames('flex flex-col mt-4', className)}>
    {label && <div className={'ml-2 mb-2 text-sm text-gray-600 font-semibold'}>{label}{required && <span className={'text-danger-500'}>*</span>}</div>}
    {children}
    {error && <div className={'text-sm text-danger-500'}>{error.message}</div>}
  </div>
);

export default FormGroup;
