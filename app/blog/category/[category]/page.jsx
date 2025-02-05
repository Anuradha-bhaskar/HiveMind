import React from 'react'

function page({ params }) {
    const category = params.category;
  return (
    <div>
      Inside the page.jsx of category of {category}
    </div>
  )
}

export default page
