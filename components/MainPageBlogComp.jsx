import { CalendarIcon, ClockIcon } from "lucide-react"
import Image from "next/image"

function MainPageBlogComp({ title, createdAt, content, image, tag }) {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white rounded-xl overflow-hidden mb-6 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex p-4">
                {/* Image container with fixed dimensions */}
                <div className="flex-shrink-0 w-[200px] h-[180px] relative rounded-xl overflow-hidden">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content container */}
                <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ">
                            {tag}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                            <span>
                                {new Date(createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                            <ClockIcon className="h-3.5 w-3.5 mr-1" />
                            <span>5 min read</span>
                        </div>
                    </div>

                    <h2 className="text-xl my-2 text-left font-semibold tracking-tight text-black mb-2 line-clamp-1">
                        {title}
                    </h2>

                    <p className="text-gray-600  my-2 text-left text-sm line-clamp-3">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MainPageBlogComp