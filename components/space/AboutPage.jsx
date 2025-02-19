import React from 'react'
import { CalendarIcon } from 'lucide-react'
import Link from 'next/link'
 function AboutPage({space}) {

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {space.description}
          </p>
        </div>

      
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="font-medium">Creator:</span>
           
            <Link href={`/profile ${space.creator.username}`}> <span>{space.creator.username}</span></Link>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <CalendarIcon className="h-4 w-4" />
            <span>{new Date(space.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
