"use client"
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"
import { uploadImageAndCreateBlog } from "@/actions/blogAction";
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Image as ImageIcon,
    X,
    Code,
  
    Tag as TagIcon
} from "lucide-react";
import toast from "react-hot-toast";
// Tag enum
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

const WriteStory = ({username}) => {
    const editorRef = useRef(null);
    const [content, setContent] = useState("");
    const [storyTitle, setStoryTitle] = useState("");
    const [image, setImage] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result); // Base64 string
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        // console.log("inside the submit methdo")
        e.preventDefault();
        try {
            // console.log("Image console.log",image)
            let base64Image = null;
            if (image) {
                // Check if image is valid
                if (typeof image === 'string' && image.startsWith('data:image')) {
                    // If the image is already a Base64 string
                    // console.log("image isstring ")
                    base64Image = image;
                } else if (image instanceof File) {
                    // If the image is a File object
                    base64Image = await convertToBase64(image); // Convert image to Base64
                } else {
                    toast.error("Invalid image file.");
                    return;
                }
            }

            // Check for content, selectedTags, and storyTitle validity
            if (!content || !selectedTags || !storyTitle) {
                toast.error("Please fill in all required fields.");
                return;
            }

            const result = await uploadImageAndCreateBlog(storyTitle, content, selectedTags, base64Image, username);

            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong in the 'write story' component.");
            console.error("Error while creating blog:", error);
        } finally {
            if (editorRef.current) {
                editorRef.current.innerHTML = ''; // Clear content of the editor
            }
            setContent(''); 
            setContent("");
            setStoryTitle("")
            setImage(null);
            setSelectedTags([])
        }
    };

    const applyCommand = (command) => {
        document.execCommand(command, false, null);
    };

    const handleContentChange = () => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTagToggle = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const removeTag = (tagToRemove) => {
        setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
    };



    return (
        <div className="min-h-screen  py-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto p-8">
                {/* Title Section */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-black mb-4 tracking-tighter">Create Your Story</h2>
                    <Input
                        value={storyTitle}
                        onChange={(e) => setStoryTitle(e.target.value)}
                        placeholder="Enter your story title..."
                        className="text-xl py-3 px-4 w-full border-2 border-gray-200  "
                    />
                </div>

                {/* Tags Section */}
                <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                        <TagIcon className="h-5 w-5 text-gray-600" />
                        <h3 className="text-lg font-semibold tracking-tight text-gray-800 ">Story Tags</h3>
                    </div>

                    {/* Selected Tags Display */}
                    {selectedTags.length > 0 && (
                        <div className="mb-4 p-4 bg-white border border-gray-200 shadow-sm">
                            <div className="flex flex-wrap gap-2">
                                {selectedTags.map((tag) => {

                                    return (
                                        <Badge
                                            variant={"outline"}
                                            key={tag}
                                            className={`
                                                inline-flex items-center gap-1.5 px-3 py-1.5 
                                                text-sm font-medium transition-all
                                              
                                                border
                                                shadow-sm hover:shadow
                                            `}
                                        >
                                            {tag.replace(/_/g, ' ')}
                                            <Badge
                                                onClick={() => removeTag(tag)}
                                                className={`
                                                    inline-flex items-center justify-center 
                                                p-0.5
                                                    focus:outline-none focus:ring-2 focus:ring-offset-1
                                                `}
                                            >
                                                <X className="h-3 w-3" />
                                            </Badge>
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Tags Selection */}
                    <div className="relative">
                        <div className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(Tag).map(([key, value]) => {

                                    const isSelected = selectedTags.includes(value);
                                    return (
                                        <Badge
                                            key={key}
                                            onClick={() => handleTagToggle(value)}
                                            className={`
                                                px-3 py-1.5  text-sm font-medium
                                                transition-all duration-200 ease-in-out
                                                ${isSelected
                                                    ? ` shadow-inner`
                                                    : `bg-white text-gray-600 border-gray-200 hover:bg-gray-50`
                                                }
                                                border hover:shadow-sm
                                                focus:outline-none focus:ring-2 focus:ring-offset-1
                                            `}
                                        >
                                            {value.replace(/_/g, ' ')}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4">
                        <input
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                            id="image-input"
                        />
                        <label
                            htmlFor="image-input"
                            className="flex items-center px-4 py-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <ImageIcon className="h-5 w-5 mr-2" />
                            <span>Upload Cover Image</span>
                        </label>
                    </div>
                    {image && (
                        <div className="mt-4 h-48 overflow-y-scroll">
                            <img
                                src={image}
                                alt="Cover"
                                className="w-full object-cover rounded-lg shadow-md"
                            />
                        </div>
                    )}

                </div>

                {/* Toolbar */}
                <div className="sticky top-0  bg-white border-b border-gray-200 pb-4 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => applyCommand("bold")}
                                className="hover:bg-gray-100"
                            >
                                <Bold className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => applyCommand("italic")}
                                className="hover:bg-gray-100"
                            >
                                <Italic className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => applyCommand("underline")}
                                className="hover:bg-gray-100"
                            >
                                <Underline className="h-4 w-4" />
                            </Button>
                       
                        </div>

                    </div>
                </div>

                <div className={`grid  grid-cols-1`}>
                    {/* Editor Area */}
                    <div className="mb-8">
                        <div
                            ref={editorRef}
                            contentEditable
                            
                            onInput={handleContentChange}
                            className="min-h-[400px] w-full p-6 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors prose prose-sm max-w-none [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded-lg"
                            placeholder="Start writing your story..."
                        />
                    </div>

                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-4">

                    <Button variant={"default"} className="px-6 " onClick={(e)=>handleSubmit(e)}>
                        Publish
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WriteStory;