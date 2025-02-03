import React from 'react';
import { CalendarIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function YourAndSavedBlog({ title, id, createdAt, content, image, tag }) {
    return (
        <Link href={`/blog/${title.toLowerCase().split(" ").join("-")}-${id}`}>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-xl overflow-hidden mb-2 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex p-3">
                    {/* Image container with smaller dimensions */}
                    <div className="flex-shrink-0 w-[130px] h-[110px] relative rounded-xl overflow-hidden">
                        <Image
                            src={image || "/placeholder.svg"}
                            alt={title}
                            layout="fill"
                            className="object-cover"
                        />
                    </div>
                    {/* Content container */}
                    <div className="flex flex-col min-w-0 ml-3">
                        <div className="flex items-center mb-2 text-gray-600 text-xs font-normal">
                            {/* Tag */}
                            <span>{tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}</span>

                            {/* Separator */}
                            <span className="mx-2">&middot;</span>

                            {/* Calendar */}
                            <div className="flex items-center">
                                <CalendarIcon className="h-3 w-3 mr-1" />
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
                                <ClockIcon className="h-3 w-3 mr-1" />
                                <span>5 min read</span>
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold tracking-tight text-left text-black mb-2 line-clamp-1">
                            {title.trim()}
                        </h2>

                        <p
                            className="text-gray-600 text-left px-4 text-sm leading-relaxed line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: content.trim() }}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default YourAndSavedBlog;
