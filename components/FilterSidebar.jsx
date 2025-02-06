"use client";

import * as React from "react";
import { useFilters } from "@/contexts/FilterContext";
import { Search, X, SlidersHorizontal } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "most-popular", label: "Most Popular" },
];

const categoryOptions = [
    { value: "TECH", label: "Tech" },
    { value: "SCIENCE", label: "Science" },
    { value: "DESIGN", label: "Design" },
    { value: "SCIFI", label: "Sci-fi" },
    { value: "ENVIRONMENT", label: "Environment" },
];

function FilterSidebar() {
    const { filters, setFilters } = useFilters();
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);

    // Handle the sort option change
    const handleSortChange = (value) => {
        setFilters((prev) => ({ ...prev, sort: value }));
    };

    // Handle category change
    const handleCategoryChange = (category) => {
        setFilters((prev) => ({ ...prev, category }));
    };

    // Handle search query change
    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Search for: ${searchQuery}`);
    };

    // Toggle sidebar visibility for mobile
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <Button
                variant="outline"
                size="icon"
                className="fixed right-4 top-4 mt-16 z-50 md:hidden"
                onClick={toggleSidebar}
                aria-label={isOpen ? "Close filters" : "Open filters"}
            >
                {isOpen ? (
                    <X className="h-4 w-4" />
                ) : (
                    <SlidersHorizontal className="h-4 w-4" />
                )}
            </Button>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 md:hidden"
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 right-0 w-64 transform overflow-y-auto bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out z-50 md:z-0 ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}
            >
                <div className="flex items-center justify-between mb-6 mt-16">
                    <h2 className="text-lg font-semibold">Filter Options</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={toggleSidebar}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-6">
                    {/* Search Form */}
                    <form onSubmit={handleSearch} className="space-y-2">
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pr-10 rounded-lg"
                            />
                            <Button
                                type="submit"
                                size="sm"
                                variant="ghost"
                                className="absolute right-0 top-0 h-full px-3"
                            >
                                <Search className="h-4 w-4" />
                                <span className="sr-only">Search</span>
                            </Button>
                        </div>
                    </form>

                    {/* Sort By Options */}
                    <div>
                        <h3 className="text-sm font-medium mb-2">Sort By</h3>
                        <RadioGroup value={filters.sort} onValueChange={handleSortChange} className="space-y-1">
                            {sortOptions.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.value} id={option.value} />
                                    <Label htmlFor={option.value}>{option.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    {/* Category Options */}
                    <div>
                        <h3 className="text-sm font-medium mb-2">Categories</h3>
                        <div className="flex flex-col space-y-1 text-left">
                            {categoryOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleCategoryChange(option.value)}
                                    className="underline underline-offset-2 text-left hover:cursor-pointer"
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterSidebar;
