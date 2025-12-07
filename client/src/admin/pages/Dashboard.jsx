import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="admin-dashboard container">
            <h1>Admin Panel</h1>

            <div className="admin-actions">
                <Link to="/admin/products">Manage Products</Link>
                <Link to="/admin/users">Manage Users</Link>
                <Link to="/admin/reviews">Manage Reviews</Link>
                <Link to="/admin/products/create">Create New Product</Link>
            </div>
        </div>
    );
}
