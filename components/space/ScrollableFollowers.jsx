import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getFollowersOfSpace } from "@/actions/spaceActions";

async function ScrollableFollowers({ spaceId }) {
    const result = await getFollowersOfSpace(spaceId);
    const users = result.data;

    return (
        <div className="min bg-background flex items-center justify-center">
            <div className="w-[350px] h-[400px] border rounded-lg shadow-lg bg-card">
                <div className="p-3">
                    <h2 className="text-lg font-semibold mb-2">Followers</h2>
                    <Separator className="mb-3" />
                    <ScrollArea className="h-[330px]">
                        {users.length > 0 ? (
                            <div className="space-y-4 pr-4">
                                {users.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent transition-colors"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.image} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-center text-muted-foreground mt-30">No followers yet</p>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

export default ScrollableFollowers;
