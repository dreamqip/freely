import type { FC, HTMLAttributes } from 'react';
import s from '@/styles/button.module.css';

const Button: FC<HTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`relative z-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-4 rounded-full dark:bg-gradient-to-r dark:from-purple-400 dark:to-indigo-400 ${s.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
