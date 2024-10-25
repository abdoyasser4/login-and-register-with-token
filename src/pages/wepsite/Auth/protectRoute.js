import React from "react";
import { myuser } from "./Context/FormConrext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectRoutes() {
    const theuser = React.useContext(myuser);
    return (
        theuser.auth.userDetails ? <Outlet /> : <Navigate to={'/login'} />
    );
}
// import React from "react";
// import { myuser } from "./Context/FormConrext";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// export default function ProtectRoutes() {
//     const theuser = React.useContext(myuser);
//     const location = useLocation();
//     return (
//         theuser.auth.userDetails ? <Outlet /> :
//             <Navigate state={{ from: location }} replaceto='/login' />
//     );
// }