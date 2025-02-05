"use client"

import * as React from "react"


import { useFilter } from "@/contexts/FilterContext"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "most popular", label: "Most Popular" },
]

const categoryOptions = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
    { value: "category3", label: "Category 3" },
]

function FilterSidebar() {
    const { filter, setFilter, categories, setCategories } = useFilter()
   

    const handleFilterChange = (value) => {
        setFilter(value)
    }

    const handleCategoryChange = (category, checked) => {
        setCategories((prevCategories) =>
            checked ? [...prevCategories, category] : prevCategories.filter((cat) => cat !== category),
        )
    }



    return (
        
            <div
                className={`fixed inset-y-0 right-0 w-64 transform overflow-y-auto bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0`}
            >
                <div className="flex items-center justify-between mb-6 mt-16">
                    <h2 className="text-lg font-semibold">Filter Options</h2>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium mb-2">Sort By</h3>
                        <RadioGroup value={filter} onValueChange={handleFilterChange} className="space-y-1">
                            {sortOptions.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.value} id={option.value} />
                                    <Label htmlFor={option.value}>{option.label}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium mb-2">Categories</h3>
                        {categoryOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2 mb-1">
                                <Checkbox
                                    id={option.value}
                                    checked={categories.includes(option.value)}
                                    onCheckedChange={(checked) => handleCategoryChange(option.value, checked )}
                                />
                                <Label htmlFor={option.value}>{option.label}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        
    )
}

export default FilterSidebar

