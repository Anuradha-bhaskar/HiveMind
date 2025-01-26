import React from 'react'


function ImageAndBlog({ imageUrl, blog }) {
    const htmlBlog = blog
   
    return (
        <article className="max-w-3xl mx-auto px-4 py-8">
            {/* Featured Image with gradient overlay */}
            <div className="relative h-[400px] mb-12 rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute"></div>
                <img
                    src={imageUrl}
                    alt="Blog featured image"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Blog Content */}
           
                {blog ? (
                    <div className="max-w-3xl mx-auto px-4 py-8"
                        dangerouslySetInnerHTML={{ __html: blog }}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            

        </article>)
}

export default ImageAndBlog
