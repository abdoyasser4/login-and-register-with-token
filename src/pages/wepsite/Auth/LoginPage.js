import axios from "axios";
import React from "react";
import Nav from '../Navbar'
import { Link, useNavigate } from "react-router-dom";
import { myuser } from "./Context/FormConrext";
import Cookies from "universal-cookie";
export default function Login() {
    const [email, setemail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [accept, setaccept] = React.useState(false);
    const [emailerr, setemailerr] = React.useState(false);
    const userNow = React.useContext(myuser);
    const nav = useNavigate();
    const cookie = new Cookies();
    async function submit(e) {
        setaccept(true);//rerender
        e.preventDefault();
        try {
            //send data
            let res = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password,
            })
            const Token = res.data.data.token;
            cookie.set("Bearer", Token, { path: "/" })
            const userDetails = res.data.data.user;
            userNow.setauth({ Token, userDetails });
            nav('/');
        } catch (err) {
            if (err.response.status === 401) {
                setemailerr(true);
            }
            setaccept(true);//rerender
        }

    }

    const loginFather = {
        height: "80vh",
        display: "flex",
        justifyContent: " center",
        alignItems: "center",
    }
    const formbackGround = {
        background: "rgba(31, 121, 144, 0.3)",
        backdropFilter: "blur(2px)",
        border: "1px solid rgba(31, 121, 144, 0.15)",
        borderRadius: "10px",
        width: "50%",
        padding: "30px",
        paddingBottom: "0",
    }
    return (
        <div>
            <div className="contaner">
                <Nav />
            </div>
            <div style={loginFather}>
                <div style={formbackGround}>
                    <form onSubmit={submit} action="">
                        <div style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px' }}>login</div>
                        <label htmlFor="email" className="mylable">email: </label>
                        <input id="email" placeholder="email..." type="gmail" required value={email} onChange={(e) => setemail(e.target.value)} />
                        <label htmlFor="password" className="mylable">Password: </label>
                        <input id="password" placeholder="password..." type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                        {accept && emailerr && <small className='warning'> Email or password is not correct!!</small>}
                        <div style={{ textAlign: "center" }} > <button style={{ letterSpacing: '3px' }} type={"submit"}>Login</button></div>
                        <small style={{ padding: '10px 0px' }} className='warning'> Don't have an account !! <Link style={{ textDecoration: 'none' }} to='/Register'>Register</Link></small>
                    </form>
                </div>
            </div>
        </div>
    );
}