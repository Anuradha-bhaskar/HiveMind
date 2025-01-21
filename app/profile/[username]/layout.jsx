import React from 'react'
import TopLeftProfile from '@/components/TopLeftProfile';
import RightProfile from '@/components/RightProfile';
function layout({ params,children }) {
    const {username}=params
    return (
        <div className="flex h-screen m-0">
      
            <div className="w-[70%] border-r">
                <div className="">
                
                    <div className="h-[30%]  ">
                        <TopLeftProfile username={username} />
                    </div>

                    
                    <div className="h-[70%] ">
                        {children}
                    </div>
                </div>
            </div>

            <div className="w-[30%] p-4">
                <RightProfile username={username} />
            </div>
        </div>

    );
}

export default layout
