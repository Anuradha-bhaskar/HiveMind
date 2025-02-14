import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const dummyUsers = [
    { id: 1, name: "Sarah Wilson", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    { id: 2, name: "Michael Chen", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { id: 3, name: "Emma Davis", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    { id: 4, name: "James Miller", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
    { id: 5, name: "Olivia Brown", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    { id: 6, name: "Lucas Garcia", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    { id: 7, name: "Sophia Lee", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
    { id: 8, name: "Ethan Taylor", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop" }
];

function App() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-[300px] h-[400px] border rounded-lg shadow-lg bg-card">
                <div className="p-3">
                    <h2 className="text-lg font-semibold mb-2">Followers</h2>
                    <Separator className="mb-3" />
                    <ScrollArea className="h-[330px]">
                        <div className="space-y-4 pr-4">
                            {dummyUsers.map((user) => (
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
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}

export default App;