import React from 'react'
import BlogHeader from '@/components/BlogHeader'
import AuthorInBlog from '@/components/AuthorInBlog'
import { getBlogById } from '@/actions/blogAction'
import ImageAndBlog from '@/components/ImageAndBlog'
async function page() {
    const sampleBlog = `
    <h2>Getting Started with React Development</h2>
    <p>React has revolutionized the way we build user interfaces. Its component-based architecture and virtual DOM implementation have made it the go-to choice for modern web development.</p>
    
    <h3>Why Choose React?</h3>
    <p>Here are some compelling reasons to choose React for your next project:</p>
    <ul>
      <li>Component-based architecture</li>
      <li>Virtual DOM for optimal performance</li>
      <li>Rich ecosystem and community support</li>
      <li>Excellent developer tools</li>
    </ul>

    <blockquote>
      "React's component-based architecture makes it incredibly easy to build and maintain large-scale applications."
    </blockquote>

    <h3>Code Example</h3>
    <p>Here's a simple example of a React component:</p>
    <code>
      const Greeting = ({ name }) => {
        return <h1>Hello, {name}!</h1>;
      }
    </code>

    <p>This is just the beginning of what you can achieve with React. The possibilities are endless!</p>
  `;
     console.log("Inside the blog layout")
         const result = await getBlogById("cm69801os0001bqeklbdrnyvc")
         if (result.success) {
             console.log("Blog Data:", result.message)
         } else {
             console.log("Error:", result.message)
         }
  return (
      <div className="min-h-screen bg-gray-100">
          <BlogHeader
              title="Building Beautiful React Components with Tailwind CSS"
              tags={["React", "Tailwind CSS", "Web Development", "Frontend", "UI Design"]}
              dateOfPublished="March 15, 2024"
          />
          <AuthorInBlog />
          <ImageAndBlog imageUrl={result.message.image} blog={sampleBlog} />
          {/* Comment option Here */}
        {/* Show all comments herre */}
      </div>
  )
}

export default page
