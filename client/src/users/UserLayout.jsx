
import { NavLink, Outlet } from "react-router-dom";


export default function UserLayout() {
    return (
        <div className="user-dashboard-container">


            <aside className="user-sidebar">

                <h3 className="user-sidebar__title">My Account</h3>

                <nav className="user-sidebar__nav">
                    <NavLink to="/user" end>
                        Profile
                    </NavLink>

                    <NavLink to="/user/reviews">
                        My Reviews
                    </NavLink>

                    <NavLink to="/user/orders">
                        Order History
                    </NavLink>
                </nav>
            </aside>


            <main className="user-dashboard-content">
                <Outlet />
            </main>
        </div>
    );
}
