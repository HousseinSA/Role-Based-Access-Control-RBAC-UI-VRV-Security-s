// src/components/UserManagement/UserList.js
import React, { useState } from 'react';
import { Edit2 as EditIcon, Trash as DeleteIcon } from 'lucide-react';
import ConfirmationDialog from '../ConfirmationDialog';

const UserList = ({ users, onEdit, onDelete }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriteria, setSortCriteria] = useState('name'); // Default sort by name

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        onDelete(userToDelete.id);
        setShowConfirm(false);
        setUserToDelete(null);
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort users based on selected criteria
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortCriteria === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortCriteria === 'email') {
            return a.email.localeCompare(b.email);
        }
        return 0;
    });

    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            />

            {/* Sort Options */}
            <div className="mb-4">
                <label className="mr-2">Sort by:</label>
                <select
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                </select>
            </div>

            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 text-left">Name</th>
                        <th className="py-2 px-4 text-left">Email</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Role</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">{user.name}</td>
                            <td className="py-2 px-4">{user.email}</td>
                            {/* Status with styled background */}
                            <td className={`py-2 px-4`}>
                                {/* Status Indicator with inline-block styling */}
                                <span 
                                    className={`inline-block py-1 px-3 rounded-full ${user.status ? 'bg-green-100' : 'bg-red-100'} ${user.status ? 'text-green-800' : 'text-red-800'}`}
                                >
                                    {user.status ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            {/* Role with styled background */}
                            <td className={`py-2 px-4`}>
                                <span 
                                    className={`inline-block py-1 px-3 rounded-full ${user.role === 'Admin' ? 'bg-blue-100' : 'bg-gray-100'} text-gray-800`}
                                >
                                    {user.role}
                                </span>
                            </td> {/* Display assigned role */}
                            <td className="py-2 px-4 flex gap-2">
                                {/* Edit button with styled background */}
                                <button 
                                    onClick={() => onEdit(user)} 
                                    className="bg-blue-500 rounded-full p-2 hover:bg-blue-600"
                                    aria-label="Edit User"
                                >
                                   <EditIcon size={16} color="#fff" /> 
                                </button>
                                {/* Delete button with styled background */}
                                <button 
                                    onClick={() => handleDeleteClick(user)} 
                                    className="bg-red-500 rounded-full p-2 hover:bg-red-600"
                                    aria-label="Delete User"
                                >
                                    <DeleteIcon size={16} color="#fff" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Confirmation Dialog */}
            {showConfirm && (
                <ConfirmationDialog 
                    message={`Are you sure you want to delete ${userToDelete.name}?`}
                    onConfirm={confirmDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};

export default UserList;