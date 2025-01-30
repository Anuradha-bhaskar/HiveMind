"use client"
import React, { createContext, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to access the UserContext
export const useUser = () => useContext(UserContext);

// Create the provider component
export const UserProvider = ({ children, value }) => {
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
