import React from 'react'
import WriteStory from '@/components/WriteStory'
import { currentUser } from '@clerk/nextjs/server'


import { redirect } from "next/navigation";
async function page() {
  const user = await currentUser();

  if (!user) {

    return redirect("/")
  }

  const username = user.emailAddresses[0].emailAddress.split("@")[0];
  return (
    <div>
      <WriteStory username={username} />

    </div>
  )
}


export default page
