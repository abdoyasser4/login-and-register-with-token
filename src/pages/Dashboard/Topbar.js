import { Link } from "react-router-dom"

export default function Topbar() {
    return (
        <div className="d-flex contaner t-bar">
            <p>Store</p>
            <Link to='/' className="Navbtn">Go to website</Link>
        </div>
    );
}