import React from 'react';
import OrbitingTexts from './OrbitingWrite';

function HeroSection() {
    return (
        <div className="flex justify-between items-center px-16 pt-4  rounded-lg ">
            {/* Left Section */}
            <div className="max-w-lg">
                <h1 className="text-4xl font-bold mb-4 font-sans">
                    Your Destination for Creativity, Knowledge, and Growth
                </h1>
                <p className="text-sm mb-6 ">
                    Discover insights, tips, and trends to fuel your creativity and success.
                </p>
            </div>

            {/* Right Section */}
            <div className='mb-4 mr-20'>
                <OrbitingTexts />
            </div>
        </div>
    );
}

export default HeroSection;
