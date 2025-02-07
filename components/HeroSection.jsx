import React from 'react';
import OrbitingTexts from './OrbitingWrite';

function HeroSection() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-8 lg:px-16 pt-2 rounded-lg gap-8">
            {/* Left Section */}
            <div className="max-w-xl text-left lg:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 font-sans">
                    Your Destination for Creativity, Knowledge, and Growth
                </h1>
                <p className="text-sm sm:text-base mb-6">
                    Discover insights, tips, and trends to fuel your creativity and success.
                </p>
            </div>

            {/* Right Section */}
            <div className='mb-4 lg:mr-20'>
                <OrbitingTexts />
            </div>
        </div>
    );
}

export default HeroSection;