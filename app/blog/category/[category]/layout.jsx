import React from 'react'
import { FilterProvider } from '@/contexts/FilterContext';
import FilterSidebar from '@/components/FilterSidebar';

function layout({ children }) {

  return (
   
    <FilterProvider>
        <div>  
       
        {children}
        <FilterSidebar/>
      </div>
      </FilterProvider>
   
  )
}

export default layout;
