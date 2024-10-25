import axios from "axios";
import React from "react";
import { myuser } from "../../wepsite/Auth/Context/FormConrext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Form(props) {
    const [name, setname] = React.useState('');
    const [email, setemail] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [repassword, setrepassword] = React.useState('');
    const [accept, setaccept] = React.useState(false);
    const [emailerr, setemailerr] = React.useState(false);
    const userNow = React.useContext(myuser);
    const token = userNow.auth.Token;
    const nav = useNavigate();
    const cookie = new Cookies();
    React.useEffect(() => {
        setname(props.name);
        setemail(props.email);
    }, [props.name, props.email])
    async function submit(e) {
        setaccept(true);//rerender
        e.preventDefault();
        try {
            //send data
            let res = await axios.post(`http://127.0.0.1:8000/api/${props.endpoint}`, {
                name: name,
                email: email,
                password: password,
                password_confirmation: repassword,
            }, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            });

            const Token = res.data.data.token || token;
            cookie.set("Bearer", Token, { path: "/" })
            const userDetails = res.data.data.user;
            userNow.setauth({ Token, userDetails });
            nav(`${props.navigate}`);
        } catch (err) {
            if (err.response && (err.response.status === 422 || err.response.status === 401)) {
                setemailerr(err.response.status);
            }
            setaccept(true);
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
        paddingBottom: "0",
    }
    const button = {
        width: '100%',
        letterSpacing: '3px',
    }
    return (
        <div>
            <div style={props.Father && loginFather}>
                <div style={props.formback && formbackGround} className="formbackGround">
                    <form onSubmit={submit} action="">
                        <div style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px' }}>{props.FormAction}</div>
                        <label htmlFor="name" className="mylable">Name: </label>
                        <input id="name" placeholder="Name..." type="text" value={name} onChange={(e) => setname(e.target.value)} />
                        {name === '' && accept && <small className='warning'>Name is required !!</small>}
                        <label htmlFor="email" className="mylable">email: </label>
                        <input id="email" placeholder="email..." type="gmail" required value={email} onChange={(e) => setemail(e.target.value)} />
                        {accept && emailerr === 422 && <small className='warning'> Email is already taken !!</small>}
                        <label htmlFor="password" className="mylable">Password: </label>
                        <input id="password" placeholder="password..." type="password" value={password} onChange={(e) => setpassword(e.target.value)} />
                        {password.length < 8 && accept && <small className='warning'>password must be more than 8 char !!</small>}
                        {accept && emailerr === 401 && <small className='warning'> Email or password is not correct !!</small>}
                        <label htmlFor="repeatPassword" className="mylable">Repeat Password: </label>
                        <input id="repeatPassword" placeholder="repeat Password..." type="password" value={repassword} onChange={(e) => setrepassword(e.target.value)} />
                        {repassword !== password && accept && <small className='warning'>password not match !!</small>}
                        <div style={{ textAlign: "center" }} > <button style={props.buttonStyle && button} type={"submit"}>{props.button}</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
}