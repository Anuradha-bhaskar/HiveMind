import React from 'react'
import WriteStory from '@/components/WriteStory'
import { currentUser } from '@clerk/nextjs/server'
async function page() {
    const user = await currentUser();
    const username = user.emailAddresses[0].emailAddress.split("@")[0];
  return (
      <div>
          <WriteStory username={ username} />
      
    </div>
  )
}

export default page
