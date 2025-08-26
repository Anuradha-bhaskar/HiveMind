import React from 'react';
import OrbitingTexts from './OrbitingWrite';

function HeroSection() {
    return (
        <section className="px-4 sm:px-8 lg:px-16 pt-6 lg:pt-12">
            <div className="max-w-6xl mx-auto">
              
                <div className="grid grid-cols-12 gap-4 items-center">
             
                    <div className="col-span-8">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            Your Destination for Creativity, Knowledge, and Growth
                        </h1>

                        <p className="mt-4 text-sm sm:text-base leading-relaxed max-w-md">
                            Discover insights, tips, and trends to fuel your creativity and success.
                        </p>
                    </div>

                    <div className="col-span-4 flex justify-end">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex items-center justify-center">
                            <OrbitingTexts />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
