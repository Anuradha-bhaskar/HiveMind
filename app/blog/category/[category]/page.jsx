"use client"
import React from 'react'
import { useFilters} from '@/contexts/FilterContext';
function page() {
    const {filters }=useFilters()
  return (
    <div>
      Inside the page.jsx of category of {filters.sort} andd {filters.category}
     
    </div>
  )
}

export default page
