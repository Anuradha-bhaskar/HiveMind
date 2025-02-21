import React from 'react'
import TopLeftProfile from '@/components/TopLeftProfile';
import RightProfile from '@/components/RightProfile';
import { UserProvider } from '@/contexts/UserContext';
import { userByUsername } from '@/actions/userActions';
async function layout({ params, children }) {
    const { username } = params
    const result = await userByUsername(username);
    if (!result.success) {
        return <div className="text-red-500 text-center py-4">User not found</div>;
    }
    const user = result.message;


    return (
        <UserProvider value={user}>
            <div className="flex h-screen m-0">
                <div className="w-full md:w-[70%] border-r">
                    <div className="">
                        <div className="h-[30%]">
                            <TopLeftProfile user={user} />
                        </div>
                        <div className="h-[70%]">
                            {children}
                        </div>
                    </div>
                </div>

                <div className="hidden md:block w-[30%] p-4">
                    <RightProfile user={user} />
                </div>
            </div>
        </UserProvider>
    );
}

export default layout
