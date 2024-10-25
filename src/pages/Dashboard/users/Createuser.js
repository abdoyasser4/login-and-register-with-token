import Form from "./Form";

export default function Createuser() {
    return (
        <div>
            <Form button='Create' endpoint={`user/create`} navigate={'/Dashboard/users'} FormAction={'Create new user'} buttonStyle={true} />
        </div>
    );
}