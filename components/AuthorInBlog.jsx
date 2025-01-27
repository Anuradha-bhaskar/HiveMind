import React from 'react'
import { userById } from '@/actions/userActions'
import { Clock } from 'lucide-react'
import { ShimmerButton } from './ui/shimmer-button'


async function AuthorInBlog({ authorId }) {
  const result = await userById(authorId)
  if (result.success) {
    console.log("Author Data:", result.message)
  } else {
    console.log("Error:", result.message)
  }
  const author = result.message;

  return (
   
    < div className = "flex items-center justify-between mb-8 px-4 py-3 bg-white  border-t border-b" >
      <div className="flex items-center gap-4">
        {/* Author Image */}
        <img
          src={author.image}
          alt={author.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-indigo-50"
        />

        {/* Author Details */}
        <div className="flex flex-col items-start">
          <h3 className="font-semibold text-gray-900">
            {author.name}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Clock size={14} className="text-indigo-400" />
            <span>5 min read</span>
            <span>•</span>
            <time>{new Date(author.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</time>
          </div>
        </div>
      </div>

  {/* Follow Button */ }
  <ShimmerButton className="px-4 py-1.5"
  >  Follow</ShimmerButton>
      </div >
  )
}

export default AuthorInBlog
