// src/components/PermissionManagement/PermissionForm.js
import React, { useState, useEffect } from 'react';
import Notification from '../Notification'; // Import Notification

const PermissionForm = ({ permissions, setPermissions, showNotification, editPermission }) => {
    const [newPermission, setNewPermission] = useState('');

    useEffect(() => {
        if (editPermission) {
            setNewPermission(editPermission);
        } else {
            setNewPermission('');
        }
    }, [editPermission]);

    const handleAddOrUpdatePermission = () => {
        const capitalizedPermission = newPermission.charAt(0).toUpperCase() + newPermission.slice(1).toLowerCase();

        if (capitalizedPermission) {
            if (!permissions.includes(capitalizedPermission)) {
                // Adding a new permission
                setPermissions([...permissions, capitalizedPermission]);
                showNotification(`Permission "${capitalizedPermission}" added successfully!`, 'success');
            } else {
                showNotification(`A permission with the name "${capitalizedPermission}" already exists.`, 'error');
            }
        }

        // If editing an existing permission
        if (editPermission && permissions.includes(editPermission)) {
            setPermissions(permissions.map(p => (p === editPermission ? capitalizedPermission : p)));
            showNotification(`Permission updated to "${capitalizedPermission}" successfully!`, 'success');
        }

        // Reset input field
        setNewPermission('');
    };

    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{editPermission ? 'Edit Permission' : 'Add Permission'}</h3>
            <input 
                type="text" 
                value={newPermission} 
                onChange={(e) => setNewPermission(e.target.value)} 
                placeholder="New Permission" 
                className="border border-gray-300 rounded-md p-2 w-full mb-3"
            />
            <button onClick={handleAddOrUpdatePermission} className="bg-blue-500 text-white rounded-md py-2 px-4 mb-3">
                {editPermission ? 'Update Permission' : 'Add Permission'}
            </button>
        </div>
    );
};

export default PermissionForm;