import {  UserPlus, Share2, Bell, MoreHorizontal,PenLine } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userByClerkId } from "@/actions/userActions";
import { Button } from "@/components/ui/button";
import { getOwnerFromSpaceId, getSpaceById } from "@/actions/spaceActions";
import ShareBtn from "./ShareBtn";
import { currentUser } from '@clerk/nextjs/server';
import toast from "react-hot-toast";
 async function SpaceViewHeader({spaceId}) {
     const result = await getSpaceById(spaceId);
     if (!result.success) {
         return <div>Something went wrong could not fetch the data</div>
     }
     const space = result.data
    
     const result2 = await getOwnerFromSpaceId(spaceId);
     if (!result2) {
         return <div>Something went wrong could not fetch the data</div>
     }
     const spaceOwnerId = result2.data.creatorId;
   
     const { id } = await currentUser();
     const viewUser = await userByClerkId(id);
     if (!viewUser) {
         return <div>Something went wrong could not fetch the data</div>
     }

     
    return (
        <div className="w-full">
            {/* Banner Container */}
            <div className="relative w-full h-[250px]">
                {/* Banner Image with Gradient Overlay */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2070&auto=format&fit=crop"
                        alt="Space Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
                </div>

                {/* Profile Image Container - Positioned for overflow */}
                <div className="absolute -bottom-16 left-8">
                    <div className="relative w-32 h-32">
                        <div className="absolute inset-0">
                            <img
                                src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1169&auto=format&fit=crop"
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
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">
                              {space.name}
                            </h1>
                          
                            {/* Stats Section */}
                            <div className="flex items-center gap-6 mt-2">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-foreground">52.4K</span>
                                    <span className="text-sm text-muted-foreground">Followers</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-semibold text-foreground">1.2K</span>
                                    <span className="text-sm text-muted-foreground">Posts</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 sm:ml-auto">
                            {
                                spaceOwnerId !== viewUser.message.id ?
                                    <Button className="gap-2">
                                        <UserPlus className="w-4 h-4" />
                                        Follow Space
                                    </Button> :
                                    <Button className="gap-2">
                                        <PenLine className="mr-2 h-4 w-4" />
                                        Edit Space
                                    </Button>
                            }
                           
                            <ShareBtn  />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="secondary" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Bell className="mr-2 h-4 w-4" />
                                        <span>Turn on Notifications</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>

                                        

                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-destructive">
                                        Report Space
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-muted-foreground max-w-2xl">
                       {space.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SpaceViewHeader;