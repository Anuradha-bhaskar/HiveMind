import React from 'react';
import OrbitingTexts from './OrbitingWrite';

function HeroSection() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center px-4 sm:px-8 lg:px-16 pt-2 rounded-lg gap-8">
            {/* Left Section */}
            <div className="max-w-xl text-left lg:text-left flex flex-col sm:block">
                <h1 className="text-3xl sm:text-4xl font-bold sm:mb-4 font-sans">
                    Your Destination for Creativity, Knowledge, and Growth
                </h1>

                <div className="flex justify-between items-center">
                    <p className="text-sm sm:text-base sm:mb-6 leading-relaxed max-w-[40%] sm:max-w-[55%]">
                        Discover insights, tips, and trends to fuel your creativity and success.
                    </p>

                    <div className="w-[35%] flex justify-end">
                        <OrbitingTexts />
                    </div>
                </div>
            </div>
            <div className='hidden lg:block lg:mr-20'>
                <OrbitingTexts />
            </div>
        </div>
    );
}

export default HeroSection;
