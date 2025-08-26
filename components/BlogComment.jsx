"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { postComments } from '@/actions/blogAction'
import toast from 'react-hot-toast'

function BlogComment({ userId, blogId }) {
    const [comment, setComment] = useState('');

    const handlePostComment = async (e) => {
        e.preventDefault();

        // Check if user is logged in
        if (!userId) {
            toast.error("You must be signed in to post a comment");
            return;
        }

        if (!comment.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }

        try {
            const result = await postComments({ userId, blogId, comment });
            if (result && result.success) {
                toast.success(result.message);
                window.location.reload(); // optionally replace with a state update instead of reload
            } else {
                toast.error(result.message || "Failed to post comment");
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            toast.error("Something went wrong while posting the comment");
        } finally {
            setComment('');
        }
    }

    return (
        <div id='comment-section'>
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Comments</h2>
                <form className="space-y-4">
                    <div className="flex items-start space-x-4">
                        <div className="flex-grow">
                            <Textarea
                                placeholder="Write a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full min-h-[100px] resize-none"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className={`${!comment ? "opacity-50 cursor-not-allowed" : ""} text-white py-2 px-4 rounded`}
                            disabled={!comment}
                            onClick={handlePostComment}
                        >
                            Post Comment
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BlogComment
