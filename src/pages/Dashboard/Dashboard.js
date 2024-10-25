import { Outlet } from "react-router-dom";
import Sidbar from "./Sidebar";
import Topbar from "./Topbar";
export default function Dashboard() {
    return (
        <div>
            <Topbar />
            <div className="d-flex-dash">
                <Sidbar />
                <div className="mydashtable">
                    <Outlet /> {/* describe the users table and other things */}
                </div>
            </div>
        </div>
    );
}