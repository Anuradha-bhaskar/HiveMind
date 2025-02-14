import React from 'react';

function Layout({ children }) {
  return (
    <div className="flex justify-center  min-h-screen">
      <div className="md:w-[70%]">{children}</div>
    </div>
  );
}

export default Layout;
