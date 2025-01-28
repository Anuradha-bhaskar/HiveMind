"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { toggleCommentLike } from "@/actions/blogAction";

function CommentSectionBlog({ blogId, userId, comments }) {
    const [updatedComments, setUpdatedComments] = useState(comments);

    useEffect(() => {
        setUpdatedComments(comments);
    }, [comments]);

    const like = async (e, commentId) => {
        e.preventDefault();

        try {
            const result = await toggleCommentLike({ commentId, blogId });
            if (result.success) {
                // Optimistically update the UI
                setUpdatedComments((prevComments) =>
                    prevComments.map((comment) => {
                        if (comment.id === commentId) {
                            const hasLiked = comment.likes.some((like) => like.userId === userId);
                            return {
                                ...comment,
                                likes: hasLiked
                                    ? comment.likes.filter((like) => like.userId !== userId) // Unlike
                                    : [...comment.likes, { userId }], // Like
                            };
                        }
                        return comment;
                    })
                );
                toast.success("Like toggled");
            } else {
                toast.error("Error toggling like");
            }
        } catch (error) {
            toast.error("Error toggling like");
            console.error("Error in like function:", error);
        }
    };

    return (
        <div>
            <div className="space-y-6 mt-4">
                {updatedComments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <Avatar>
                            <AvatarImage src={comment.author.image} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{comment.author.name}</p>
                                <p className="text-sm text-gray-500">
                                    {formatDistanceToNow(new Date(comment.createdAt), {
                                        addSuffix: true,
                                    })}
                                </p>
                            </div>
                            <p className="mt-1">{comment.content}</p>
                            <div className="mt-2 flex items-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`text-gray-500 hover:text-gray-700 ${comment.likes.some((like) => like.userId === userId) ? "text-blue-600" : ""
                                        }`}
                                    onClick={(e) => like(e, comment.id)}
                                    disabled={!userId} // Disable button until userId is fetched
                                >
                                    <Heart
                                        className="h-4 w-4 mr-1"
                                        color={comment.likes.some((like) => like.userId === userId) ? "red" : "gray"}
                                        fill={comment.likes.some((like) => like.userId === userId) ? "red" : "none"}
                                    />
                                    {comment.likes.length}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CommentSectionBlog;
