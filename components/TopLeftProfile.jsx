import React from 'react';
import { userByUsername } from '@/actions/userActions';

async function TopLeftProfile({ username }) {
    const result = await userByUsername(username);

    if (!result.success) {
        return <div className="text-red-500 text-center py-4">User not found</div>;
    }

    const user = result.message;
   

    return (
        <div className="flex items-center gap-6 py-5 px-10  ">
            {/* Left side: Name and Username */}
            <div className="flex flex-col">
                <h1 className="text-3xl font-semibold  tracking-tighter font-sans">{user.name}</h1>
                <p className="text-md text-gray-600 -mt-2 ">@{user.username}</p>
            </div>

            {/* Right side: Followers and Following count */}
            <div className="ml-auto text-right flex flex-col">
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{user._count.followers || 0}</span> Followers
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">{user._count.following || 0}</span> Following
                </p>
            </div>
        </div>
    );
}

export default TopLeftProfile;
