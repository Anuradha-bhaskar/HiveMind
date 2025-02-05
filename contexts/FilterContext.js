"use client"
import React, { createContext, useContext,useState } from 'react';

const FilterContext = createContext()
export const useFilter = () => {
    return useContext(FilterContext);
};

// Provider Component
export const FilterProvider = ({ children }) => {
    const [filter, setFilter] = useState("All");
    const [categories, setCategories] = useState([]);

    return (
        <FilterContext.Provider value={{ filter, setFilter, categories, setCategories }}>
            {children}
        </FilterContext.Provider>
    );
};