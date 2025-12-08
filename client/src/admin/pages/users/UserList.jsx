import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../../../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteUser(id);
            toast.success("User deleted");
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            toast.error("Error deleting user");
        }
    };

    return (
        <div className="admin-page">
            <h2>User Management</h2>

            {loading && <p>Loading...</p>}

            {!loading && users.length === 0 && <p>No users found.</p>}

            {!loading && users.length > 0 && (
                <table className="admin-table">
                    <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            <td>
                                <Link
                                    to={`/admin/users/${user._id}`}
                                    className="edit-btn"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

