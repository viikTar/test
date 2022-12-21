import React, { FC } from 'react';
import './style.css';

interface InputProps {
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: { target: { value: React.SetStateAction<string>; }; }) => void;
};

const Input:FC<InputProps> = ({ type = 'text', value = '', placeholder = '', onChange }) => {
  return (
    <input className='Input' type={type} value={value} placeholder={placeholder} onChange={onChange} />
  )
};

export default Input;
