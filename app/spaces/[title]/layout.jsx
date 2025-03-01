import React from 'react';
import SpaceViewHeader from '@/components/space/SpaceViewHeader';
import ScrollableFollowers from '@/components/space/ScrollableFollowers';

 async function Layout({ children, params }) {
  const { title } = await params;
  return (
    <div className="flex flex-col items-center h-full border-b ">
      {/* Upper part with bottom border */}
      <div className="w-full md:w-[70%]  pb-2">
        <SpaceViewHeader spaceId={title} />
      </div>

      {/* Main content with ScrollableFollowers on the right */}
      <div className="w-full md:w-[70%] flex gap-4 ">
        {/* Main content area */}
        <div className="flex-1">{children}</div>

        {/* Scrollable Followers on the right */}
        <div className="w-[250px] hidden md:block">
          <ScrollableFollowers spaceId={title} />
        </div>
      </div>
    </div>
  );
}

export default Layout;
