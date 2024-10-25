import { NavLink } from "react-router-dom";

export default function Sidbar() {
    return (
        <div className="s-bar">
            <NavLink to='/Dashboard/users' className="s-b-link"><i className="fa-solid fa-users"></i>Users</NavLink>
            <NavLink to='/Dashboard/user/create' className="s-b-link"><i className="fa-solid fa-user-plus"></i>Create user</NavLink>
            <NavLink to='/Dashboard/products/' className="s-b-link"><i className="fa-brands fa-product-hunt"></i>Products</NavLink>
            <NavLink to='/Dashboard/product/create' className="s-b-link"><i className="fa-solid fa-plus"></i>Create Product</NavLink>
        </div>
    );
}