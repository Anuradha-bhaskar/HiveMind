import { CalendarIcon, ClockIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function MainPageBlogComp({ title, createdAt, content, image, tag ,id}) {
    return (
        <Link href={`/blog/${title.toLowerCase().split(" ").join("-")}-${id}`}>
        <div className="w-full max-w-5xl mx-auto bg-white rounded-xl overflow-hidden  hover:bg-gray-50 transition-colors duration-200">
            <div className="flex p-4">
                {/* Image container with fixed dimensions */}
                <div className="flex-shrink-0 min-w-[200px] min-h-[180px] relative rounded-xl overflow-hidden">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt={title}
                        layout="fill"
                        className="object-cover"
                    />
                </div>
                {/* Content container */}
                <div className="flex flex-col min-w-0">
                    <div className="flex items-center mb-3 mx-4 text-gray-600 text-xs font-normal">
                        {/* Tag */}
                        <span>{tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
                        }</span>

                        {/* Separator */}
                        <span className="mx-2">&middot;</span>

                        {/* Calendar */}
                        <div className="flex items-center">
                            <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                            <span>
                                {new Date(createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                        </div>

                        {/* Separator */}
                        <span className="mx-2">&middot;</span>

                        {/* Read Time */}
                        <div className="flex items-center">
                            <ClockIcon className="h-3.5 w-3.5 mr-1.5" />
                            <span>5 min read</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-left text-black mb-3 mx-4 line-clamp-1">
                        {title.trim()}
                    </h2>

                    <p
                        className="text-gray-600 text-left  px-5 text-sm leading-relaxed line-clamp-3"
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