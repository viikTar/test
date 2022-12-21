import React from 'react';
import './style.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='Layout'>{children}</div>
  )
};

export default Layout;
