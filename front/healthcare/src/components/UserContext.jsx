import React, { createContext, useState } from 'react';

export const UserProvider = ({ children }) => {
    const [userid, setUserid] = useState('');

    return (
        <UserContext.Provider value={{ userid, setUserid }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserContext = createContext();
