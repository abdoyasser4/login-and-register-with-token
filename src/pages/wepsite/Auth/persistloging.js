import React from "react";
import { Outlet } from "react-router-dom";
import { myuser } from "./Context/FormConrext";
import LoadingScrean from "../../../loading/spiner";
import axios from "axios";
import Cookies from "universal-cookie";

export default function PersistLoging() {
    const userNow = React.useContext(myuser);
    const token = userNow.auth.Token;
    const [Loading, setLoading] = React.useState(true);
    const cookie = new Cookies();
    const getToken = cookie.get('Bearer');
    React.useEffect(() => {
        async function refreshToken() {
            try {
                await axios.post('http://127.0.0.1:8000/api/refresh', null, {
                    headers: {
                        Authorization: 'Bearer ' + getToken,
                    },
                })
                    .then((mydata) => {
                        cookie.set("Bearer", mydata.data.token, { path: "/" })
                        userNow.setauth((prev) => {
                            return { userDetails: mydata.data.user, Token: mydata.data.token };
                        })
                    }
                    );
            } catch (err) {
                console.log(err)
            } finally { setLoading(false) };
        }
        !token ? refreshToken() : setLoading(false);
    }, [])

    return (
        Loading ? <LoadingScrean /> : <Outlet />
    );
}