import EditProfileSection from "./EditProfileSection";
import { userByClerkId } from "@/actions/userActions";
import { getOwnerFromSpaceId, getSpaceById } from "@/actions/spaceActions";
import ShareBtn from "./ShareBtn";
import { currentUser } from '@clerk/nextjs/server';
import { checkSpaceFollowing } from "@/actions/spaceActions";
import SpaceFollowBtn from "./SpaceFollowBtn";

async function SpaceViewHeader({ spaceId }) {
    const result = await getSpaceById(spaceId);
    if (!result.success) {
        return <div>Something went wrong, could not fetch the data</div>
    }
    const space = result.data;

    const result2 = await getOwnerFromSpaceId(spaceId);
    if (!result2) {
        return <div>Something went wrong, could not fetch the data</div>
    }
    const spaceOwnerId = result2.data.creatorId;

    const { id } = await currentUser();
    const viewUser = await userByClerkId(id);
    if (!viewUser) {
        return <div>Something went wrong, could not fetch the data</div>
    }
    const result3 = await checkSpaceFollowing(viewUser.message.id, spaceId);
    if (!result3) {
        return <div>Something went wrong, could not fetch the data</div>
    }
    const isFollowing = result3.success;

    return (
        <div className="w-full">
            {/* Banner Container */}
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[350px]">
                {/* Banner Image with Gradient Overlay */}
                <div className="absolute inset-0 w-full">
                    <img
                        src={space.image2 || "https://plus.unsplash.com/premium_vector-1708470396844-c49c3b5384cf?q=80&w=2240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Space Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
                </div>

                {/* Profile Image Container - Centered in Mobile View */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 sm:left-8 sm:translate-x-0">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                        <div className="absolute inset-0">
                            <img
                                src={space.image1 || "https://plus.unsplash.com/premium_vector-1682269287900-d96e9a6c188b?q=80&w=2360&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-xl shadow-lg ring-4 ring-background"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="pt-20 md:pl-44 pb-8">
                    {/* Header Content */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="space-y-1 max-w-full">
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight break-words">
                                {space.name}
                            </h1>

                            {/* Stats Section */}
                            <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-foreground">{space._count.members}</span>
                                    <span className="text-sm text-muted-foreground">Followers</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-foreground">{space._count.questions}</span>
                                    <span className="text-sm text-muted-foreground">Posts</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 sm:ml-auto">
                            {spaceOwnerId === viewUser.message.id ? (
                                <EditProfileSection spaceId={spaceId} />
                            ) : (
                                <SpaceFollowBtn isFollowing={isFollowing} userId={viewUser.message.id} spaceId={spaceId} />
                            )}
                            <ShareBtn />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-muted-foreground max-w-full break-words">
                        {space.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SpaceViewHeader;
