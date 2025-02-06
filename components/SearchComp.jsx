"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Link from 'next/link';

function SearchComp() {
    const [search, setSearch] = useState("");

    return (
        <div className="relative w-full max-w-4xl my-4 mx-auto bg-background">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl" />
            <div className="relative border-2 border-dashed border-primary/20 rounded-3xl backdrop-blur-sm">
                <div className="flex items-center justify-between px-4 py-1">
                    {/* Search Input with Button */}
                    <div className="relative w-64 flex items-center">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="pl-8 pr-20 h-9 w-full bg-transparent border-none outline-none focus:outline-none ring-0 focus:ring-0"
                        />
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                            <Link href={`/blog/category/${search}`}>
                                <Button
                                    size="sm"
                                    className="h-7 px-3"
                                >
                                    Search
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex space-x-4">
                        <Link href="/">
                            <Button variant="ghost" className="hover:bg-secondary">
                                All Blogs
                            </Button>
                        </Link>
                        <Link href="/blog/category/TECH">
                            <Button variant="ghost" className="hover:bg-secondary">
                                Tech
                            </Button>
                        </Link>
                        <Link href="/blogs/category/DESIGN">
                            <Button variant="ghost" className="hover:bg-secondary">
                                Design
                            </Button>
                        </Link>
                        <Link href="/blogs/category/ENVIRONMENT">
                            <Button variant="ghost" className="hover:bg-secondary">
                                Environment
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchComp;