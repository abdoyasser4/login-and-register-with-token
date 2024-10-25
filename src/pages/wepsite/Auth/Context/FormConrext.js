import React from "react";
export const myuser = React.createContext({});
export default function UserProvider({ children }) {
    const [auth, setauth] = React.useState({});
    // console.log(auth);
    return (
        <myuser.Provider value={{ auth, setauth }}>
            {children}
        </myuser.Provider>
    );
}