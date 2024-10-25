import Form from "../../Dashboard/users/Form";
import Nav from "../Navbar";
export default function Signup() {
    return (
        <div>
            <div className="contaner">
                <Nav />
            </div>
            <Form button='Register' endpoint='register' navigate={'/'} hasTrue={true} FormAction={'Creat account'} Father={true} formback={true} />
        </div>
    );
}