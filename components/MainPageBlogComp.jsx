import { CalendarIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
function MainPageBlogComp({ title, createdAt, content, image, tag, id }) {
    return (
        <Link href={`/blog/${title.toLowerCase().split(" ").join("-")}-${id}`}>

         <div className="group w-full max-w-5xl mx-auto bg-white rounded-xl overflow-hidden hover:bg-gray-50 transition-all duration-300 ease-in-out">

                <div className="flex flex-col sm:flex-row p-3 sm:p-4 gap-3 sm:gap-4">
                    <div className="flex-shrink-0 relative w-full sm:w-[200px] h-[180px] sm:h-[180px] rounded-lg overflow-hidden">
                        <img
                            src={image || "/placeholder.svg"}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"

                        />

                    </div>

                    <div className="flex flex-col flex-grow min-w-0 space-y-2 sm:space-y-3">

                        <div className="flex flex-wrap gap-2 sm:gap-3 items-center text-gray-600 text-xs">

                            <span className="px-2.5 py-1 bg-gray-100 rounded-full font-medium">

                                {tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}

                            </span>

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
                            <div className="flex items-center">

                                <ClockIcon className="h-3.5 w-3.5 mr-1.5" />

                                <span>5 min read</span>

                            </div>

                        </div>

                        <h2 className={
                            "font-bold tracking-tight text-left text-black text-lg sm:text-2xl line-clamp-2 sm:line-clamp-1"
                        }>
                            {title.trim()}
                        </h2>
                        <p

                            className="text-gray-600 text-left text-sm leading-relaxed line-clamp-2 sm:line-clamp-3"

                            dangerouslySetInnerHTML={{ __html: content.trim() }}
                            suppressHydrationWarning={true}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );

}

export default MainPageBlogComp;