import React from 'react';
import { userByUsername } from '@/actions/userActions';
import { Button } from "@/components/ui/button"; // Adjust the path if needed
import { Pencil } from "lucide-react";

async function RightProfile({ username }) {
    const result = await userByUsername(username);

    if (!result.success) {
        return <div className="text-red-500 text-center py-4">User not found</div>;
    }

    const user = result.message;
    console.log("User : ", user);

    return (
        <div className="flex flex-wrap items-center gap-6 p-6">
            {/* User Image */}
            {user.image && (
                <img
                    src={user.image}
                    alt={`${user.name}'s profile`}
                    className="w-20 h-20 rounded-full object-cover border border-gray-300"
                />
            )}

            {/* User Details */}
            <div className="flex flex-col">
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

            {/* Additional Info */}
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
            <Button size="sm" variant="default" className="flex items-center space-x-2">
                <Pencil className="w-4 h-4" /> {/* Icon */}
                <span>Edit Profile</span>
            </Button>
        </div>
    );
}

export default RightProfile;
