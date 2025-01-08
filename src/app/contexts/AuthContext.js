"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = (username) => {
        setUser(username);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(username));
        localStorage.setItem("isLoggedIn", "true");
    };

    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
    };

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

        if (savedUser && savedIsLoggedIn) {
            setUser(JSON.parse(savedUser));
            setIsLoggedIn(true);
        }
    }, []); // 初回レンダリング時に実行

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
