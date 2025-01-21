"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const tagsEnum = [
    "MOVIE",
    "HORROR",
    "SCIFI",
    "TECH",
    "TRAVEL",
    "LIFESTYLE",
    "HEALTH",
    "FITNESS",
    "EDUCATION",
    "BUSINESS",
    "FINANCE",
    "ENTERTAINMENT",
    "FOOD",
    "ART",
    "DESIGN",
    "MUSIC",
    "WRITING",
    "PERSONAL_DEVELOPMENT",
    "PRODUCTIVITY",
    "PHOTOGRAPHY",
    "MARKETING",
    "SPORTS",
    "POLITICS",
    "ENVIRONMENT",
    "SPIRITUALITY",
    "HISTORY",
    "GAMING",
    "PARENTING",
    "SCIENCE",
    "NATURE",
    "FASHION",
    "DIY",
    "CAREER",
    "SOCIAL_MEDIA",
    "BOOKS",
    "STARTUPS",
    "PSYCHOLOGY",
    "SELF_IMPROVEMENT",
    "MENTAL_HEALTH",
    "NEWS",
    "MEMES",
    "ANIME",
    "CULTURE",
];

const Page = () => {
    const [blogPost, setBlogPost] = useState({
        title: "",
        content: "",
        tags: [],
    });
    const contentRef = useRef(null);

    const handleContentChange = () => {
        if (contentRef.current) {
            setBlogPost((prev) => ({
                ...prev,
                content: contentRef.current.value,
            }));
        }
    };

    const handleTagSelect = (e) => {
        const selectedTag = e.target.value;
        if (!blogPost.tags.includes(selectedTag) && selectedTag !== "") {
            setBlogPost((prev) => ({
                ...prev,
                tags: [...prev.tags, selectedTag],
            }));
        }
    };

    const removeTag = (tagToRemove) => {
        setBlogPost((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Blog post to submit:", blogPost);
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="py-6 px-8 bg-gray-100 shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">Write Your Story</h1>
            </header>
            <main className="px-8 py-10">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-8 max-w-5xl mx-auto"
                >
                    {/* Tags Selection */}
                    <div>
                        <Label htmlFor="tags" className="block text-lg font-medium text-gray-700 mb-2">
                            Choose Tags
                        </Label>
                        <div className="flex items-center space-x-4">
                            <select
                                id="tags"
                                onChange={handleTagSelect}
                                className="block w-1/3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2.5"
                            >
                                <option value="">Select a tag</option>
                                {tagsEnum.map((tag) => (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))}
                            </select>
                            <div className="flex space-x-2 flex-wrap">
                                {blogPost.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-2 text-blue-600 hover:text-blue-900"
                                        >
                                            &times;
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Title Input */}
                    <div>
                        <Label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
                            Story Title
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            value={blogPost.title}
                            onChange={(e) =>
                                setBlogPost((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                }))
                            }
                            placeholder="Enter your story title"
                            required
                            className="block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
                        />
                    </div>

                    {/* Content Textarea */}
                    <div>
                        <Label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">
                            Story Content
                        </Label>
                        <Textarea
                            id="content"
                            ref={contentRef}
                            value={blogPost.content}
                            onChange={handleContentChange}
                            placeholder="Start writing your story here..."
                            required
                            className="block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 h-60"
                        ></Textarea>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full py-3 text-lg">
                        Publish Story
                    </Button>
                </form>
            </main>
        </div>
    );
};

export default Page;
