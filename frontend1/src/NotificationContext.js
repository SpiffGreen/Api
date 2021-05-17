import React, { useState, createContext } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = props => {
    const [notify, setNotify] = useState({val: false});
    
    return (
        <NotificationContext.Provider value = {{notify, setNotify}} >
            {props.children}
        </NotificationContext.Provider>
    );
}