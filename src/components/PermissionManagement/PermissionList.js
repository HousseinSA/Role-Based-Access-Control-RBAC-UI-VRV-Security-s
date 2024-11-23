// src/components/PermissionManagement/PermissionList.js
import React, { useState } from 'react';
import { Edit2 as EditIcon, Trash as DeleteIcon } from 'lucide-react';
import ConfirmationDialog from '../ConfirmationDialog';

const PermissionList = ({ permissions, setPermissions, showNotification, setEditPermission }) => {
    const [permissionToDelete, setPermissionToDelete] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleRemovePermission = (permission) => {
        setPermissions(permissions.filter(p => p !== permission));
        showNotification(`Permission "${permission}" deleted successfully!`, 'success');
    };

    const handleEditClick = (permission) => {
        setEditPermission(permission); // Set the permission to be edited
    };

    const handleDeleteClick = (permission) => {
        setPermissionToDelete(permission);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        handleRemovePermission(permissionToDelete);
        setShowConfirm(false);
        setPermissionToDelete(null);
    };

    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Available Permissions</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 text-left">Permission</th>
                        <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {permissions.map((permission) => (
                        <tr key={permission} className="border-b hover:bg-gray-100">
                            <td className="py-2 px-4">{permission}</td>
                            <td className="py-2 px-4 flex gap-2">
                                <button onClick={() => handleEditClick(permission)} className="bg-blue-500 rounded-full p-2 hover:bg-blue-600 text-white">
                                    <EditIcon size={16} />
                                </button>
                                <button onClick={() => handleDeleteClick(permission)} className="bg-red-500 rounded-full p-2 hover:bg-red-600 text-white">
                                    <DeleteIcon size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Confirmation Dialog */}
            {showConfirm && (
                <ConfirmationDialog 
                    message={`Are you sure you want to delete the permission "${permissionToDelete}"?`}
                    onConfirm={confirmDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>  
    );
};

export default PermissionList;