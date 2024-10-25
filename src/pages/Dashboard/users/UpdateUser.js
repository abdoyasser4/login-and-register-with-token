import React from "react";
import { myuser } from "../../wepsite/Auth/Context/FormConrext";
import Form from "./Form";
export default function UpdateUser() {
    const [name, setname] = React.useState('');
    const [email, setemail] = React.useState('');
    const id = window.location.pathname.split('/').slice(-1)[0];
    const userNow = React.useContext(myuser);
    const token = userNow.auth.Token;

    React.useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
            .then(res => res.json())
            .then(data => {
                setname(data[0].name)
                setemail(data[0].email)
            });
    }, [])
    return (
        <div>
            <Form button='Update' name={name} email={email} endpoint={`user/update/${id}`} navigate={'/Dashboard/users'} FormAction={'Update User '} buttonStyle={true} />
        </div>

    );
}

