"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
const FilterContext = createContext()

// Provider Component
export const FilterProvider = ({ children }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [filters, setFilters] = useState({
        category: "",
        sort: "",
    });

    useEffect(() => {
        const params = new URLSearchParams();
        if (filters.sort) params.set("sort", filters.sort);

        let newUrl = pathname;

        if (filters.category) {
            newUrl = `/blog/category/${filters.category}`;
        }

        router.push(`${newUrl}?${params.toString()}`);
    }, [filters, router, pathname]);

    // Extract filters from URL on first load
    useEffect(() => {
        const paths = pathname.split("/").filter(Boolean);
        const categoryIndex = paths.indexOf("category");

        const category = categoryIndex !== -1 ? paths[categoryIndex + 1] : "";
        const sort = searchParams.get("sort") || "";

        setFilters({ category, sort });
    }, []);

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilters = () => {
    return useContext(FilterContext);
};
