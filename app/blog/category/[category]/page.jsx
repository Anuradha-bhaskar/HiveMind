import { getCategoryAndSortedBlogs } from "@/actions/blogAction"
import MainPageBlogComp from "@/components/MainPageBlogComp"
import { ArrowUpDown } from "lucide-react"

export default async function Page({ params, searchParams }) {
  const { category } = params
  const { sort } = searchParams

  const res = await getCategoryAndSortedBlogs(sort, category)

  if (!res.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-gray-800">{res.message}</p>
        </div>
      </div>
    )
  }

  const blogs = res.data
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="min-h-screen bg-white mr-[300px]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Minimal Header */}
        <div className="mb-8 border-b border-gray-200 pb-4">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Category</p>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">{formattedCategory}</h1>
            <div className="flex items-center space-x-2 text-gray-600">
              <ArrowUpDown className="h-4 w-4" />
              <p className="text-xs tracking-wide">{sort || "Latest"}</p>
            </div>
          </div>
        </div>

        {/* Blog List */}
        <div className="space-y-12">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id}>
                <MainPageBlogComp
                  title={blog.title}
                  image={blog.image}
                  createdAt={blog.createdAt}
                  content={blog.content}
                  id={blog.id}
                  tag={blog.tags[0]}
                  className="w-full bg-white border-b border-gray-100 pb-12"
                />
              </div>
            ))
          ) : (
            <div className="py-8">
              <p className="text-gray-500 text-sm">No entries found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
