import React from 'react';

import EditDialog from './EditDialog';
import { currentUser } from '@clerk/nextjs/server';
import { userByClerkId } from '@/actions/userActions';
import { checkFollowing } from '@/actions/userActions';


async function RightProfile({ user }) {

    const pageUser = await currentUser();
    let followingUser = null;
    let isFollowing = false;
    if (pageUser) {
        followingUser = await userByClerkId(pageUser.id);
        let { isFollowing } = await checkFollowing(followingUser.message.id, user.id);
        isFollowing = isFollowing;
    }
   
    return (
        <div className="flex flex-wrap items-center gap-6 p-6 sticky">
         
            {user.image && (
                <img
                    src={user.image}
                    alt={`${user.name}'s profile`}
                    className="w-20 h-20 rounded-full object-cover border border-gray-300"
                />
            )}

            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold ">{user.name || 'Not given'}</h1>
                <p className="text-md text-gray-600 -mt-2">@{user.username}</p>
                <div className="flex gap-4 mt-2">
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">{user._count.followers || 0}</span> Followers
                    </p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">{user._count.following || 0}</span> Following
                    </p>
                </div>
            </div>

            <div className="flex flex-col  text-left ">
                <p className="text-sm text-gray-800  font-sans font-normal">
                    <strong>Bio : </strong> {user.bio || 'Not given'}
                </p>
                <p className="text-sm text-gray-800  font-sans font-normal">
                    <strong>Email:</strong> {user.email || 'Not given'}
                </p>
                <p className="text-sm text-gray-800  font-sans font-normal">
                    <strong>Location:</strong> {user.location || 'Not given'}
                </p>
                <p className="text-sm text-gray-800  font-sans font-normal">
                    <strong>Website:</strong>{' '}
                    {user.website ? (
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            {user.website}
                        </a>
                    ) : (
                        'Not given'
                    )}
                </p>

            </div>

             {
                                   pageUser && followingUser.message.id === user.id && (
                                       <EditDialog user={user} />
                                   )}
           
        </div>
    );
}

export default RightProfile;
