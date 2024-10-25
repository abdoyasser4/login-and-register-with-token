import axios from "axios";
import React from "react";
import { myuser } from "../../wepsite/Auth/Context/FormConrext";
import { useNavigate } from "react-router-dom";
export default function NewProducts() {
    const [title, settitle] = React.useState('');
    const [description, setdescription] = React.useState('');
    const [image, setimage] = React.useState('');
    const [accept, setaccept] = React.useState('');
    const userNow = React.useContext(myuser);
    const token = userNow.auth.Token;
    const nav = useNavigate();
    async function submit(e) {
        setaccept(true);//rerender
        e.preventDefault();
        try {
            //send data
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image);
            let res = await axios.post(`http://127.0.0.1:8000/api/product/create`,
                formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                });
            nav('/Dashboard/products');

        } catch (err) {
            console.log(err)
            setaccept(true);
        }

    }
    const button = {
        width: '100%',
        letterSpacing: '3px',
    }
    return (
        <div>
            <div>
                <div className="formbackGround">
                    <form onSubmit={submit} action="">
                        <div style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '3px' }}>Add Product</div>
                        <label htmlFor="Title" className="mylable">Title: </label>
                        <input id="Title" placeholder="product Name..." type="text" value={title} onChange={(e) => settitle(e.target.value)} />
                        {title === '' && accept && <small className='warning'>product title is required !!</small>}
                        <label htmlFor="Description" className="mylable">Description: </label>
                        <input id="Description" placeholder="product Description..." type="text" required value={description} onChange={(e) => setdescription(e.target.value)} />
                        {/* {accept && emailerr === 422 && <small className='warning'> Email is already taken !!</small>} */}
                        <label htmlFor="image" className="mylable">image: </label>
                        <input id="image" placeholder="image..." type="file" onChange={(e) => setimage(e.target.files.item(0))} />
                        {/* {password.length < 8 && accept && <small className='warning'>password must be more than 8 char !!</small>}
                        {accept && emailerr === 401 && <small className='warning'> Email or password is not correct !!</small>}
                        <label htmlFor="repeatPassword" className="mylable">Repeat Password: </label>
                        <input id="repeatPassword" placeholder="repeat Password..." type="password" value={repassword} onChange={(e) => setrepassword(e.target.value)} />
                        {repassword !== password && accept && <small className='warning'>password not match !!</small>} */}
                        <div style={{ textAlign: "center" }} > <button style={button} type={"submit"}>Create Product</button></div>
                    </form>
                </div>
            </div>
        </div>
    );
}