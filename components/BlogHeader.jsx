import React from 'react'

function BlogHeader({title, tags, dateOfPublished}) {
  return (
      <header className="w-full max-w-3xl mx-auto px-4 py-12 text-center">
        
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
          </h1>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
              {tags.map((tag) => (
                  <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                      {tag}
                  </span>
              ))}
          </div>

          <p className="text-sm text-gray-600">
              Published on {dateOfPublished}
          </p>
      </header>
  )
}

export default BlogHeader
