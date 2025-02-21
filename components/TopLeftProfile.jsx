import React from 'react';
import FollowAuthorButton from './FollowAuthorButton';
import { currentUser } from '@clerk/nextjs/server';
import { userByClerkId } from '@/actions/userActions';
import { checkFollowing } from '@/actions/userActions';

import EditDialog from './EditDialog';
async function TopLeftProfile({ user }) {
    const { id } = await currentUser();
    const followingUser = await userByClerkId(id);
    const { isFollowing } = await checkFollowing(followingUser.message.id, user.id);
    return (
        <div className="flex items-center gap-6 py-5 px-10 sticky top-0 ">
            {/* Left side: Name and Username */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-semibold tracking-tighter font-sans">{user.name}</h1>
                <p className="text-md text-gray-600 -mt-2">@{user.username}</p>
                {/* EditDialog for mobile view only */}
                <div className="md:hidden mt-2">
                    <EditDialog user={user} />
                </div>
            </div>

            {/* Corrected Follow Button Logic */}
            {followingUser.message.id !== user.id && (
                <FollowAuthorButton userId={followingUser.message.id} authorId={user.id}  isFollowing={isFollowing}/>
            )}

            {/* Right Side: Follower Count */}
            <div className="ml-auto text-right flex flex-col">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{user._count?.followers || 0}</span> Followers
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{user._count?.following || 0}</span> Following
                </p>
            </div>
        </div>
    );
}

export default TopLeftProfile;
