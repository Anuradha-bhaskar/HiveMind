"use client"
import { useState,useEffect } from 'react';
import React from 'react'
import { ShimmerButton } from "./ui/shimmer-button";
import toast from 'react-hot-toast';
import { toggleFollow } from '@/actions/userActions';
function FollowAuthorButton({ userId, authorId ,isFollowing}) {
    const [isFollowing1, setIsFollowing1] = useState(isFollowing)
    console.log("User id and author id in follow button", userId, authorId)

    const handleFollow = async (e) => {
        e.preventDefault();
        try {
            console.log("Inside the follow button")
            const result = await toggleFollow(userId, authorId);
            if (result.success) {
                setIsFollowing1(!isFollowing1)
                toast.success("TOggle follow successfully")
            } else {
                toast.error("Something went wrong in the follow button")
            }
        } catch (error) {
            console.log("Something went wrong in the follow button")

        }
    }
  return (
      <div>
          <ShimmerButton onClick={(e)=>handleFollow(e)} className="px-4 py-1.5">{isFollowing1?"following":"follow" }</ShimmerButton>
    </div>
  )
}

export default FollowAuthorButton
