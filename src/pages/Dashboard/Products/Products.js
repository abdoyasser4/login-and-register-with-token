import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { myuser } from "../../wepsite/Auth/Context/FormConrext";
// import Cookies from "universal-cookie";
export default function Products() {
    const [products, setproducts] = React.useState([]);
    const [run, setrun] = React.useState(0);
    const userNow = React.useContext(myuser);
    const token = userNow.auth.Token;
    React.useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/product/show', {
            headers: {
                Accept: "application/json",
                Authorization: 'Bearer ' + token,
            }
        })
            .then((data) => setproducts(data.data))
            .catch((err) => console.log(err))
    }, [run]);
    async function DeleteUSer(id) {
        try {
            let res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
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

    const productData = products.map((product, index) => (
        <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>
                <Link to={`${product.id}`}>
                    <i className="fa-solid fa-pen-to-square" style={{ color: '#74afb9', fontSize: '20px', paddingRight: '10px' }}></i>
                </Link>
                <i onClick={() => DeleteUSer(product.id)} className="fa-solid fa-trash" style={{ color: 'red', fontSize: '20px' }}></i>
            </td>
        </tr>
    ))
    return (
        <div>
            <table >
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {productData}
                </tbody>
            </table>
        </div>
    );
}