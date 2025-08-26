"use client";
import React, { useState } from "react";
import YourBlogs from "@/components/YourBlogs";
import SavedBlogs from "@/components/SavedBlogs";

import { useUser } from "@/contexts/UserContext";

function Page() {
    const [selected, setSelected] = useState("Blogs");
    const user = useUser();
    
    return (
        <div>
            <div className="flex border-b border-gray-300">
                {["Blogs", "Saved Blogs"].map((tab) => (
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

            {/* Conditionally Render Component */}
            <div className="mt-4">
                {selected === "Blogs" && <YourBlogs userId={user.id} />}
                {selected === "Saved Blogs" && <SavedBlogs userId={user.id} />}
            </div>
        </div>
    );
}

export default Page;
