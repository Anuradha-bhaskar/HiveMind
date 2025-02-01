import Image from "next/image"
import { Badge } from "./ui/badge"

function SideIndividualBlog({ imageUrl, title, tag, date }) {
    return (
        <div className="flex items-start space-x-4 mb-2">
            <div className="w-[180px] h-[100px] relative overflow-hidden rounded-lg">
                <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="flex flex-col">
                <div className="flex items-center space-x-2 mb-1">
                    <Badge>{tag}</Badge>
                    <span className="text-xs text-gray-500">
                        {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{title}</h3>
            </div>
        </div>
    )
}

export default SideIndividualBlog
