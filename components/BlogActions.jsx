"use client"
import toast from 'react-hot-toast'
import React, { useState, useEffect } from 'react'
import { checkSavedBlog } from '@/actions/savedBlogsActions'
import { checkLikedBlog } from '@/actions/blogAction'
import { toggleBlogLike } from '@/actions/blogAction'
import { toggleBookMarked } from '@/actions/savedBlogsActions'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheck, MessageCircle, Copy, ThumbsUp } from 'lucide-react'
function BlogActions({ userId, blogId }) {

    const [liked, setLiked] = useState(false)
    const [bookmarked, setBookmarked] = useState(false)


    useEffect(() => {
        
        async function checkBookMarked() {
            const result = await checkSavedBlog(userId, blogId)
            if (result.success) {
                setBookmarked(true)
            }
        }
        async function checkLiked() {
            const result = await checkLikedBlog(userId, blogId);
            if (result.success) {
                setLiked(true)
            }

        }
        checkBookMarked();
        checkLiked()
    })


    const handleBookMarked = async (e) => {
        e.preventDefault();

        if (!userId) {
            toast.error("You must be signed in to bookmark a blog");
            return;
        }

        try {
            const result = await toggleBookMarked(userId, blogId);
            if (result.success) {
                setBookmarked(!bookmarked);
                toast.success(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong while bookmarking the blog");
        }
    };

    const handleBlogLike = async (e) => {
        e.preventDefault();

        if (!userId) {
            toast.error("You must be signed in to like a blog");
            return;
        }

        try {
            const result = await toggleBlogLike(userId, blogId);
            if (result.success) {
                setLiked(!liked);
                // toast.success(result.message);
            }
        } catch (error) {
            toast.error("Something went wrong while liking the blog");
        }
    };


    const handleShare = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
    };

    const scrollToComment = (e) => {
        e.preventDefault();
        const sectionB = document.getElementById("comment-section");
        if (sectionB) {
            sectionB.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <div className="w-full bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" onClick={handleBlogLike} aria-label="Like">
                            <ThumbsUp className={`h-5 w-5 ${liked ? "fill-primary text-primary" : "text-gray-500"}`} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={scrollToComment} aria-label="Comment">
                            <MessageCircle className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleBookMarked} aria-label="Bookmark">
                            {bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                        </Button>
                        
                        <Button variant="ghost" size="icon" onClick={handleShare} aria-label="Share">
                            <Copy className="h-5 w-5" />
                        </Button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogActions
