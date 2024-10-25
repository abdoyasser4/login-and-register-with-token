import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
export default function Nav() {
    const cookie = new Cookies();
    const token = cookie.get('Bearer');
    // console.log(token);
    async function handelLogout() {
        await axios.post('http://127.0.0.1:8000/api/logout', null, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        });
        cookie.remove('Bearer');
        window.location.pathname = '/login';
    }
    return (
        <nav className="navbar">
            <div className="navcontent">
                <p>Home</p>
                <p>About</p>
            </div>
            <div className="navbtn">
                {

                    !token ? (<>
                        <Link to='/Register' className="Navbtn">Register</Link>
                        <Link to='/Login' className="Navbtn">Login</Link>
                    </>)
                        : (<>
                            <Link to='/Dashboard' className="Navbtn">Dashboard</Link>
                            <Link to='/Login' onClick={handelLogout} className="Navbtn" type={"submit"}>Logout</Link>
                        </>)
                }
            </div>
        </nav>
    );
}