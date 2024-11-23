// src/components/RoleManagement/RoleList.js
import React from 'react';
import { Edit2 as EditIcon, Trash as DeleteIcon } from 'lucide-react';
import ConfirmationDialog from '../ConfirmationDialog';

const RoleList = ({ roles, onEdit, onDelete }) => {
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [roleToDelete, setRoleToDelete] = React.useState(null);

    const handleDeleteClick = (role) => {
        setRoleToDelete(role);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        onDelete(roleToDelete.id);
        setShowConfirm(false);
        setRoleToDelete(null);
    };

    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Role Management</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 text-left">Role Name</th>
                        <th className="py-2 px-4 text-left">Permissions</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role.id} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4 capitalize">{role.name}</td>
                            {/* Display permissions with styled background */}
                            <td className="py-2 px-4 max-w-xs">
                                <div className="flex flex-wrap gap-2">
                                    {role.permissions.map(permission => (
                                        <span key={permission} className={`inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-800`}>
                                            {permission}
                                        </span>
                                    ))}
                                </div>
                            </td> 
                            <td className="py-2 px-4 flex gap-2">
                                {/* Edit button with styled background */}
                                <button 
                                    onClick={() => onEdit(role)} 
                                    className="bg-blue-500 rounded-full p-2 hover:bg-blue-600"
                                    aria-label="Edit Role"
                                >
                                   <EditIcon size={16} color="#fff" /> 
                                </button>
                                {/* Delete button with styled background */}
                                <button 
                                    onClick={() => handleDeleteClick(role)} 
                                    className="bg-red-500 rounded-full p-2 hover:bg-red-600"
                                    aria-label="Delete Role"
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
                    message={`Are you sure you want to delete the role ${roleToDelete.name}?`}
                    onConfirm={confirmDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};

export default RoleList;