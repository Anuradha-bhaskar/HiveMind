import { CalendarIcon, ClockIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function MainPageBlogComp({ title, createdAt, content, image, tag, id }) {
    return (
        <Link href={`/blog/${title.toLowerCase().split(" ").join("-")}-${id}`}>
            <div className="w-full max-w-5xl mx-auto bg-white rounded-xl overflow-hidden hover:bg-gray-50 transition-colors duration-200">
                <div className="flex flex-col sm:flex-row p-4">
                    
                    <div className="flex-shrink-0 w-full sm:w-[200px] h-[200px] sm:h-[180px] relative rounded-xl overflow-hidden mb-4 sm:mb-0">
                        <Image src={image || "/placeholder.svg"} alt={title} layout="fill" className="object-cover" />
                    </div>
                   
                    <div className="flex flex-col min-w-0 sm:ml-4">
                        <div className="flex flex-wrap items-center mb-3 text-gray-600 text-xs font-normal">
                            
                            <span className="mb-1 sm:mb-0">{tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}</span>

                         
                            <span className="mx-2 hidden sm:inline">&middot;</span>

                            <div className="flex items-center mb-1 sm:mb-0 w-full sm:w-auto">
                                <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                                <span>
                                    {new Date(createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>

                            <span className="mx-2 hidden sm:inline">&middot;</span>

                            
                            <div className="flex items-center">
                                <ClockIcon className="h-3.5 w-3.5 mr-1.5" />
                                <span>5 min read</span>
                            </div>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-left text-black mb-3 line-clamp-2 sm:line-clamp-1">
                            {title.trim()}
                        </h2>

                        <p
                            className="text-gray-600 text-left text-sm leading-relaxed line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: content.trim() }}
                            suppressHydrationWarning={true}
                        />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MainPageBlogComp

