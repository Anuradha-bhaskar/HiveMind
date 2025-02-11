import React from 'react'
import SpaceViewHeader from '@/components/space/SpaceViewHeader'
function page({params}) {
  return (
    <div>
     
      <SpaceViewHeader/>
      Page inside of the title {params.title}
    </div>
  )
}

export default page
