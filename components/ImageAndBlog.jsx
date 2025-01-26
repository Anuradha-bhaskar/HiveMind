import React from 'react'


function ImageAndBlog({ imageUrl, blog }) {
    return (
        <article className="max-w-3xl mx-auto px-4 py-8">
            {/* Featured Image with gradient overlay */}
            <div className="relative h-[400px] mb-12 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent "></div>
                <img
                    src={imageUrl}
                    alt="Blog featured image"
                    className="w-full h-full object-cover "
                />
            </div>

            {/* Blog Content */}
            <div
                className="max-w-3xl mx-auto px-4 py-8"
                dangerouslySetInnerHTML={{
                    __html: `
            <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333;">
  <h2 style="font-size: 2rem; color: #2d3748; margin-bottom: 20px;">Getting Started with React Development</h2>
  <p style="font-size: 1.1rem; color: #555; line-height: 1.6;">React has revolutionized the way we build user interfaces. Its component-based architecture and virtual DOM implementation have made it the go-to choice for modern web development.</p>

  <h3 style="font-size: 1.5rem; color: #2d3748; margin-top: 30px;">Why Choose React?</h3>
  <p style="font-size: 1.1rem; color: #555;">Here are some compelling reasons to choose React for your next project:</p>

  <ul style="list-style-type: disc; padding-left: 20px; font-size: 1.1rem; color: #555;">
    <li>Component-based architecture</li>
    <li>Virtual DOM for optimal performance</li>
    <li>Rich ecosystem and community support</li>
    <li>Excellent developer tools</li>
  </ul>

  <blockquote style="font-size: 1.1rem; color: #4f46e5; font-style: italic; margin: 20px 0; padding-left: 20px; border-left: 4px solid #4f46e5;">
    "React's component-based architecture makes it incredibly easy to build and maintain large-scale applications."
  </blockquote>

  <h3 style="font-size: 1.5rem; color: #2d3748; margin-top: 30px;">Code Example</h3>
  <p style="font-size: 1.1rem; color: #555;">Here's a simple example of a React component:</p>

  <code style="display: block; background-color: #f7fafc; padding: 10px 15px; font-size: 1rem; border-radius: 5px; color: #2b6cb0; font-family: monospace;">
    const Greeting = ({ name }) => {<br />
    &nbsp;&nbsp;return &lt;h1&gt;Hello, {name}!&lt;/h1&gt;;<br />
    }
  </code>

  <p style="font-size: 1.1rem; color: #555; line-height: 1.6; margin-top: 20px;">This is just the beginning of what you can achieve with React. The possibilities are endless!</p>
</div>
        `,
                }}
            />

        </article>)
}

export default ImageAndBlog
