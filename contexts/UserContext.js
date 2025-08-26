"use client"
import React, { createContext, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// Create the provider component
export const UserProvider = ({ children, value }) => {
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
