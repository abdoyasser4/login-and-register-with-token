import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { myuser } from "../../wepsite/Auth/Context/FormConrext";
// import Cookies from "universal-cookie";
export default function Users() {
    const [user, setuser] = React.useState([]);
    const [run, setrun] = React.useState(0);
    const userNow = React.useContext(myuser);
    const token = userNow.auth.Token;
    React.useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user/show', {
            headers: {
                Accept: "application/json",
                Authorization: 'Bearer ' + token,
            }
        })
            .then((data) => setuser(data.data))
            .catch((err) => console.log(err))
    }, [run]);
    async function DeleteUSer(id) {
        try {
            let res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }
            )
            if (res.status === 200) {
                setrun((prev) => prev + 1);
            }

        } catch (err) {
            console.log(err);
        }
    }

    const userData = user.map((user, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <Link to={`${user.id}`}>
                    <i className="fa-solid fa-pen-to-square" style={{ color: '#74afb9', fontSize: '20px', paddingRight: '10px' }}></i>
                </Link>
                <i onClick={() => DeleteUSer(user.id)} className="fa-solid fa-trash" style={{ color: 'red', fontSize: '20px' }}></i>
            </td>
        </tr>
    ))
    return (
        <div>
            <table >
                <thead>
                    <tr>
                        <th>id</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData}
                </tbody>
            </table>
        </div>
    );
}