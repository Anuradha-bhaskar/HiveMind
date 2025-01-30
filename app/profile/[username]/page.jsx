"use client";
import React, { useState } from "react";
import YourBlogs from "@/components/YourBlogs";
import SavedBlogs from "@/components/SavedBlogs";
import { useUser } from "@/contexts/UserContext";
function Page() {
    const [selected, setSelected] = useState("Your Blogs");
    const user = useUser()
    console.log("User in the page .jsx ",user)
    return (
        <div>
            {/* Navigation Buttons */}
            <div className="flex border-b border-gray-300">
                <button
                    onClick={() => setSelected("Your Blogs")}
                    className={`px-4 py-2 text-black text-sm font-medium bg-white focus:outline-none ${selected === "Your Blogs"
                            ? "underline underline-offset-8 decoration-2 decoration-black"
                            : "hover:underline-offset-1"
                        }`}
                >
                    Your Blogs
                </button>
                <button
                    onClick={() => setSelected("Saved Blogs")}
                    className={`px-4 py-2 text-black text-sm font-medium bg-white focus:outline-none ${selected === "Saved Blogs"
                            ? "underline underline-offset-8 decoration-2 decoration-black"
                            : "hover:underline-offset-1"
                        }`}
                >
                    Saved Blogs
                </button>
            </div>

            {/* Conditionally Render Component */}
            <div className="mt-4">
                {selected === "Your Blogs" ? <YourBlogs userId={user.id} /> : <SavedBlogs userId={user.id} />}
            </div>
        </div>
    );
}

export default Page;
