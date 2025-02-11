"use client";
import { PlusCircle, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSpace } from "@/actions/spaceActions";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/clerk-react";
// Predefined tags
const Tag = {
    MOVIE: "MOVIE",
    HORROR: "HORROR",
    SCIFI: "SCIFI",
    TECH: "TECH",
    TRAVEL: "TRAVEL",
    LIFESTYLE: "LIFESTYLE",
    HEALTH: "HEALTH",
    FITNESS: "FITNESS",
    EDUCATION: "EDUCATION",
    BUSINESS: "BUSINESS",
    FINANCE: "FINANCE",
    ENTERTAINMENT: "ENTERTAINMENT",
    FOOD: "FOOD",
    ART: "ART",
    DESIGN: "DESIGN",
    MUSIC: "MUSIC",
    WRITING: "WRITING",
    PERSONAL_DEVELOPMENT: "PERSONAL_DEVELOPMENT",
    PRODUCTIVITY: "PRODUCTIVITY",
    PHOTOGRAPHY: "PHOTOGRAPHY",
    MARKETING: "MARKETING",
    SPORTS: "SPORTS",
    POLITICS: "POLITICS",
    ENVIRONMENT: "ENVIRONMENT",
    SPIRITUALITY: "SPIRITUALITY",
    HISTORY: "HISTORY",
    GAMING: "GAMING",
    PARENTING: "PARENTING",
    SCIENCE: "SCIENCE",
    NATURE: "NATURE",
    FASHION: "FASHION",
    DIY: "DIY",
    CAREER: "CAREER",
    SOCIAL_MEDIA: "SOCIAL_MEDIA",
    BOOKS: "BOOKS",
    STARTUPS: "STARTUPS",
    PSYCHOLOGY: "PSYCHOLOGY",
    SELF_IMPROVEMENT: "SELF_IMPROVEMENT",
    MENTAL_HEALTH: "MENTAL_HEALTH",
    NEWS: "NEWS",
    MEMES: "MEMES",
    ANIME: "ANIME",
    CULTURE: "CULTURE",
};

const SpaceHeader = () => {
    const { user } = useUser();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedTag, setSelectedTag] = useState("");

    const handleTagSelection = (tag) => {
        setSelectedTag(tag === selectedTag ? "" : tag); 
    };
    const handleSubmit = async (e) => {
        if (!user) {
            toast.error("User not authenticated. Please log in.");
            return; 
        }
        e.preventDefault();
        try {
            const response = await createSpace(user.id, title, description, selectedTag);
            if (response.success) {
                toast.success("Space created successfully!");
                setTitle("");
                setDescription("");
                setSelectedTag(""); 
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            toast.error("Failed to create space. Please try again.");
        }
    };


    return (
        <div className="relative w-full bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative min-h-[200px] py-8 sm:py-12 flex items-center">
                    {/* Content Container */}
                    <div className="flex-1 z-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-4">
                            Welcome to Spaces
                        </h1>
                        <p className="text-indigo-100 text-base sm:text-lg mb-6 max-w-xl">
                            Follow spaces to explore your interests on Hivemind
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Dialog className="m-2">
                                <DialogTrigger asChild>
                                    <Button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-[#1e40af] font-sans hover:bg-indigo-50 hover:scale-105 transition-all duration-300">
                                        <PlusCircle className="w-5 h-5 mr-2" />
                                        Create a Space
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-semibold text-gray-900">Create a Space</DialogTitle>
                                        <DialogDescription className="text-sm text-gray-500">
                                            Define your space with a title, tags, and a brief description.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit}>
                                        <div className="grid gap-6 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="space-title" className="text-sm font-medium text-gray-700">
                                                    Title
                                                </Label>
                                                <Input
                                                    id="space-title"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    placeholder="Enter space title"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="space-tags" className="text-sm font-medium text-gray-700">
                                                    Select a tag that describes your space
                                                </Label>
                                                <ScrollArea className="h-20 w-full rounded-md border border-gray-200">
                                                    <div className="flex flex-wrap gap-2 p-4">
                                                        {Object.values(Tag).map((value, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="secondary"
                                                                className={`cursor-pointer py-1 px-3 rounded-lg text-sm font-medium   ${selectedTag === value
                                                                        ? "bg-blue-600 text-white" // Selected state, change background and text color
                                                                        : "hover:bg-primary hover:text-primary-foreground" // Hover effect for non-selected tags
                                                                    }`}
                                                                onClick={() => handleTagSelection(value)}
                                                            >
                                                                {value}
                                                            </Badge>

                                                        ))}
                                                    </div>
                                                </ScrollArea>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="space-desc" className="text-sm font-medium text-gray-700">
                                                    Description
                                                </Label>
                                                <Textarea
                                                    id="space-desc"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    placeholder="Enter a brief description..."
                                                    className="resize-none h-24"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" className="w-full">
                                                Create Space
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>

                            <Button className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-[#1e40af] text-white font-sans  hover:bg-[#1e3a8a] hover:scale-105 transition-all duration-300 border border-white">
                                <Compass className="w-5 h-5 mr-2" />
                                Discover Spaces
                            </Button>
                        </div>
                    </div>

                    {/* Decorative Image */}
                    <div className="hidden md:block absolute right-0 top-0 h-full w-1/3">
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=500"
                            alt="Space decoration"
                            className="h-full w-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af]/90 to-transparent" />
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-purple-300 rounded-full mix-blend-overlay filter blur-lg animate-pulse delay-700" />
            </div>
        </div>
    );
};

export default SpaceHeader;
