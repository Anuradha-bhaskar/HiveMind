"use client"
import React, { useState } from 'react';

function Page() {
    const [selected, setSelected] = useState('Your Blogs');

    return (
        <div>
            <div className="flex border-b border-gray-300">
                <button
                    onClick={() => setSelected('Your Blogs')}
                    className={`px-4 py-2 text-black text-sm font-medium bg-white focus:outline-none ${selected === 'Your Blogs'
                        ? 'underline underline-offset-8 decoration-2  decoration-black'
                            : 'hover:underline-offset-1'
                        }`}
                >
                    Your Blogs
                </button>
                <button
                    onClick={() => setSelected('Saved Blogs')}
                    className={`px-4 py-2 text-black text-sm font-medium bg-white focus:outline-none ${selected === 'Saved Blogs'
                            ? 'underline underline-offset-8 decoration-2 decoration-black'
                            : 'hover:underline-offset-1'
                        }`}
                >
                    Saved Blogs
                </button>
            </div>
        </div>
    );
}

export default Page;
