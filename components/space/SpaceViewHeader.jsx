import EditProfileSection from "./EditProfileSection"
import { userByClerkId } from "@/actions/userActions"
import { getOwnerFromSpaceId, getSpaceById } from "@/actions/spaceActions"
import ShareBtn from "./ShareBtn"
import { currentUser } from "@clerk/nextjs/server"
import { checkSpaceFollowing } from "@/actions/spaceActions"
import SpaceFollowBtn from "./SpaceFollowBtn"
import { UserRound, CalendarDays } from "lucide-react"

async function SpaceViewHeader({ spaceId }) {
    const result = await getSpaceById(spaceId)
    if (!result.success) {
        return <div>Something went wrong, could not fetch the data</div>
    }
    const space = result.data

    const result2 = await getOwnerFromSpaceId(spaceId)
    if (!result2) {
        return <div>Something went wrong, could not fetch the data</div>
    }
    const spaceOwnerId = result2.data.creatorId

    const { id } = await currentUser()
    const viewUser = await userByClerkId(id)
    if (!viewUser) {
        return <div>Something went wrong, could not fetch the data</div>
    }
    const result3 = await checkSpaceFollowing(viewUser.message.id, spaceId)
    if (!result3) {
        return <div>Something went wrong, could not fetch the data</div>
    }
    const isFollowing = result3.success

    return (
        <div className="w-full bg-background">
            {/* Banner Container */}
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px]">
                {/* Banner Image with Gradient Overlay */}
                <div className="absolute inset-0 w-full">
                    <img
                        src={
                            space.image2 ||
                            "https://plus.unsplash.com/premium_vector-1708470396844-c49c3b5384cf?q=80&w=2240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt="Space Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
                </div>

                {/* Profile Image Container - Centered in Mobile View */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 sm:left-8 sm:translate-x-0 z-10 mb-4">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                        <div className="absolute inset-0">
                            <img
                                src={
                                    space.image1 ||
                                    "https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                }
                                alt="Profile"
                                className="w-full h-full object-cover rounded-2xl shadow-lg ring-4 ring-background"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-[200px] relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="pt-12 md:pt-16 pb-8">
                        <div className="flex flex-col gap-6 md:gap-8">
                            {/* Title and Creator Section */}
                            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight break-words">
                                        {space.name}
                                    </h1>
                                    <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
                                        <UserRound className="w-4 h-4 flex-shrink-0" />
                                        <span className="text-sm">Created by</span>
                                        <span className="text-sm font-medium text-foreground hover:text-primary cursor-pointer transition-colors">
                                            {space.creator.name}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                    {spaceOwnerId === viewUser.message.id ? (
                                        <EditProfileSection spaceId={spaceId} />
                                    ) : (
                                        <SpaceFollowBtn
                                            isFollowing={isFollowing}
                                            userId={viewUser.message.id}
                                            spaceId={spaceId}
                                        />
                                    )}
                                    <ShareBtn />
                                </div>
                            </div>

                            {/* Stats Section */}
                            <div className="flex flex-wrap items-center gap-6 md:gap-8 text-sm">
                                <div className="flex flex-col">
                                    <span className="text-xl md:text-2xl font-bold text-foreground">
                                        {space._count.members.toLocaleString()}
                                    </span>
                                    <span className="text-muted-foreground">Following</span>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-xl md:text-2xl font-bold text-foreground">
                                        {space._count.questions.toLocaleString()}
                                    </span>
                                    <span className="text-muted-foreground">Posts</span>
                                </div>

                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>Created {new Date(space.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpaceViewHeader

