"use client"
import { useState } from 'react';
import React from 'react'
import { ShimmerButton } from "./ui/shimmer-button";
import toast from 'react-hot-toast';
import { toggleFollow } from '@/actions/userActions';

function FollowAuthorButton({ userId, authorId, isFollowing }) {
    const [isFollowingState, setIsFollowingState] = useState(isFollowing);

    const handleFollow = async (e) => {
        e.preventDefault();

        if (!userId) {
            toast.error("You must be signed in to follow authors");
            return;
        }

        try {
            const result = await toggleFollow(userId, authorId);
            if (result.success) {
                setIsFollowingState(!isFollowingState);
                toast.success(isFollowingState ? "Unfollowed successfully" : "Followed successfully");
            } else {
                toast.error("Something went wrong while following the author");
            }
        } catch (error) {
            console.error("Error in follow button:", error);
            toast.error("Something went wrong while following the author");
        }
    }

    return (
        <div>
            <ShimmerButton
                onClick={handleFollow}
                className="px-4 py-1.5"
                disabled={!userId} 
            >
                {isFollowingState ? "Following" : "Follow"}
            </ShimmerButton>
        </div>
    )
}

export default FollowAuthorButton;
