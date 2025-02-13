"use client"
import React from 'react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { MinusCircle } from 'lucide-react'
import { PlusCircle} from 'lucide-react'
import { toggleFollowSpace } from '@/actions/spaceActions'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
function SpaceFollowBtn({ isFollowing, userId, spaceId }) {
    const [isFollowing1, setIsFollowing1] = useState(isFollowing);
    const router = useRouter();
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
        } finally {
            router.refresh();
        }
    }
    return (
        <Button className="gap-2" onClick={handleFollow}>
            {isFollowing1 ? (
                <>
                    <MinusCircle className="w-4 h-4" /> Leave Space
                </>
            ) : (
                <>
                    <PlusCircle className="w-4 h-4" /> Join Space
                </>
            )}
        </Button>

    )
}

export default SpaceFollowBtn
