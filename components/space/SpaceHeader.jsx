import React from 'react';
import { PlusCircle, Compass } from 'lucide-react';
import { Button } from '../ui/button';

const SpaceHeader = () => {
    return (
        <div className="relative w-full bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] overflow-hidden"> {/* Updated gradient color */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative h-[200px] flex items-center">
                    {/* Content Container */}
                    <div className="flex-1 z-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2"> {/* Bold Font */}
                            Welcome to Spaces
                        </h1>
                        <p className="text-indigo-100 text-lg mb-6 max-w-xl">
                            Follow spaces to explore your interests on Hivemind
                        </p>
                        <div className="flex flex-row gap-4"> {/* Horizontal Flex */}
                            <Button
                                className="inline-flex items-center px-8 py-4 rounded-xl bg-white text-[#1e40af] font-bold shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all duration-300 max-w-fit"
                            >
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Create a Space
                            </Button>
                            <Button
                                className="inline-flex items-center px-8 py-4 rounded-xl bg-[#1e40af] text-white font-bold shadow-lg hover:bg-[#1e3a8a] hover:scale-105 transition-all duration-300 max-w-fit"
                            >
                                <Compass className="w-5 h-5 mr-2" />
                                Discover Spaces
                            </Button>
                        </div>
                    </div>

                    {/* Decorative Image */}
                    <div className="hidden md:block absolute right-0 top-0 h-full w-1/3">
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=500"
                            alt="Space decoration"
                            className="h-full w-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af]/90 to-transparent" />
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-purple-300 rounded-full mix-blend-overlay filter blur-lg animate-pulse delay-700" />
            </div>
        </div>
    );
};

export default SpaceHeader;
