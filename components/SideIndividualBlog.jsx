import Image from "next/image"
import { Badge } from "./ui/badge"
import Link from "next/link"
function SideIndividualBlog({ imageUrl, title, tag, date,id }) {
    return (

        <Link href={`/blog/${title.toLowerCase().split(" ").join("-")}-${id}`}>
        <div className="flex items-start space-x-4 mb-2">
                <div className="min-w-[180px] h-[100px] relative overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                    <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={title}
                        layout="fill"
                        className="object-cover"
                       
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
                    <h3 className="text-sm font-sans tracking-tight text-black font-bold line-clamp-2">{title}</h3>
            </div>
            </div>
        </Link>
    )
}

export default SideIndividualBlog
