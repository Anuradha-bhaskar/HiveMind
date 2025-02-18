"use client";

import React, { useState } from "react";

function Page() {
  const [selected, setSelected] = useState("Posts");

  return (
    <div>
      {/* Navigation Buttons */}
      <div className="flex border-b border-gray-300">
        {["Posts", "About"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelected(tab)}
            className={`px-4 py-2 text-black text-sm font-medium bg-white focus:outline-none ${selected === tab
                ? "underline underline-offset-8 decoration-2 decoration-black"
                : "hover:underline-offset-1"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Conditionally Render Content */}
      <div className="mt-4">
        {selected === "Posts" && <div>Posts Content</div>}
        {selected === "About" && <div>About Content</div>}
      </div>
    </div>
  );
}

export default Page;
