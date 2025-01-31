import React from 'react'
import { fetchBlogsForInfinte } from '@/actions/infiniteScrollAction';
 async function MainBlog() {
      const blogs = await fetchBlogsForInfinte(0, 1);
  return (
      <div>
          Inside the main bllog
      
    </div>
  )
}

export default MainBlog
