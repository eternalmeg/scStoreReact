import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getAllUsers, deleteUser } from "../../../services/userService";
import useFetch from "../../../hooks/useFetch";

export default function UserList() {

    // ✔ Зареждаме всички потребители чрез useFetch
    const { data: users, setData: setUsers, loading, error } =
        useFetch(() => getAllUsers(), []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteUser(id);
            toast.success("User deleted");

            // премахваме от локалния state чрез setData
            setUsers(prev => prev.filter(u => u._id !== id));

        } catch (err) {
            toast.error("Error deleting user");
        }
    };

    return (
        <div className="container">

            <div className="d-flex justify-content-between align-items-center my-3">
                <h2>User Management</h2>

                <Link to="/admin/users/create" className="btn btn-primary">
                    + Create User
                </Link>
            </div>


            {error && <p className="text-danger">{error}</p>}


            {loading && <h4>Loading...</h4>}


            {!loading && users.length === 0 && <p>No users found.</p>}


            {!loading && users.length > 0 && (
                <table className="table table-striped">
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
                                    className="btn btn-sm btn-warning me-2"
                                >
                                    Edit
                                </Link>

                                <button
                                    className="btn btn-sm btn-danger"
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
