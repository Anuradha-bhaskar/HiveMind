"use client"
import React from 'react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { UserMinus } from 'lucide-react'
import { UserPlus } from 'lucide-react'
import { toggleFollowSpace } from '@/actions/spaceActions'
import toast from 'react-hot-toast'
function SpaceFollowBtn({ isFollowing, userId, spaceId }) {
    const [isFollowing1, setIsFollowing1] = useState(isFollowing);
    const handleFollow = async (e) => {
        e.preventDefault();
        try {
            const result = await toggleFollowSpace(userId, spaceId);
            if (result.success) {
                setIsFollowing1(!isFollowing1);
                 toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error("Error ",error)
        }
    }


    return (
        <Button className="gap-2" onClick={handleFollow} >
            {isFollowing1 ? (
                <>
                    <UserMinus className="w-4 h-4" /> Unfollow
                </>
            ) : (
                <>
                    <UserPlus className="w-4 h-4" /> Follow Space
                </>
            )}
        </Button>
    )
}

export default SpaceFollowBtn
