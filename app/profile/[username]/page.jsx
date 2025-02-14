"use client";
import React, { useState } from "react";
import YourBlogs from "@/components/YourBlogs";
import SavedBlogs from "@/components/SavedBlogs";

import { useUser } from "@/contexts/UserContext";

function Page() {
    const [selected, setSelected] = useState("Your Blogs");
    const user = useUser();
    // console.log("User in the page.jsx", user);

    return (
        <div>
            {/* Navigation Buttons */}
            <div className="flex border-b border-gray-300">
                {["Your Blogs", "Saved Blogs", "Created Spaces", "Subscribed Spaces"].map((tab) => (
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
                {selected === "Your Blogs" && <YourBlogs userId={user.id} />}
                {selected === "Saved Blogs" && <SavedBlogs userId={user.id} />}
                {selected === "Created Spaces" && <div>Created spaces</div>}
                {selected === "Subscribed Spaces" && <div>Subscribed spaces</div>}
            </div>
        </div>
    );
}

export default Page;
