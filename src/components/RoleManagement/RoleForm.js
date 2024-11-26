// src/components/RoleManagement/RoleForm.js
import React, { useState, useEffect } from 'react';
import Notification from '../Notification';

const RoleForm = ({ role, onSubmit, existingRoles, permissions,onCancel }) => {
    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    // Populate the form fields when a role is selected for editing
    useEffect(() => {
        if (role) {
            setRoleName(role.name);
            setSelectedPermissions(role.permissions || []);
        } else {
            resetFields();
        }
    }, [role]);

    const resetFields = () => {
        setRoleName('');
        setSelectedPermissions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for duplicate roles
        if (existingRoles.some(r => r.name === roleName && r.id !== role?.id)) {
            showNotificationMessage('A role with this name already exists.', 'error');
            return;
        }

        // Ensure all fields are filled
        if (!roleName) {
            showNotificationMessage('Please provide a role name.', 'error');
            return;
        }

        // Prepare new role object and submit it to parent component.
        const newRole = { id: role?.id || Date.now(), name: roleName, permissions: selectedPermissions };

        // Save or update role in local storage
        const rolesInLocalStorage = JSON.parse(localStorage.getItem('roles')) || [];

        if (role) {
            // Update existing role
            const updatedRoles = rolesInLocalStorage.map(r => (r.id === role.id ? newRole : r));
            localStorage.setItem('roles', JSON.stringify(updatedRoles));
        } else {
            // Add new role
            rolesInLocalStorage.push(newRole);
            localStorage.setItem('roles', JSON.stringify(rolesInLocalStorage));
        }

        onSubmit(newRole); // Notify parent component about the new or updated role

        // Clear form fields after submission only if it's a new role creation
        if (!role) resetFields();

        showNotificationMessage(role ? 'Role updated successfully!' : 'Role created successfully!', 'success');
    };

    const showNotificationMessage = (message, type) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);

         // Hide notification after a delay.
         setTimeout(() => {
             setShowNotification(false);
             setNotificationMessage(""); // Clear message after hiding.
             setNotificationType("");     // Clear type after hiding.
         }, 3000);
     };

     const handlePermissionChange = (permission) => {
         setSelectedPermissions((prev) =>
             prev.includes(permission)
                 ? prev.filter(p => p !== permission)
                 : [...prev, permission]
         );
     };

     return (
         <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow-md">
             {showNotification && (
                 <Notification 
                     message={notificationMessage} 
                     type={notificationType} 
                     onClose={() => setShowNotification(false)} 
                 />
             )}
             <h3 className="text-lg font-semibold mb-3">{role ? 'Edit Role' : 'Add Role'}</h3>
             <input 
                 type="text" 
                 value={roleName} 
                 onChange={(e) => setRoleName(e.target.value)} 
                 placeholder="Role Name" 
                 required 
                 className="border border-gray-300 rounded-md p-2 w-full mb-3"
             />
             
             {/* Permissions checkboxes */}
             <div className='mb-3'>
               <h4>Permissions:</h4>
               {permissions.map(permission => (
                   <label key={permission} className='flex items-center mb-2'>
                       <input 
                           type='checkbox' 
                           checked={selectedPermissions.includes(permission)} 
                           onChange={() => handlePermissionChange(permission)} 
                           className='rounded-checkbox mr-2'
                       />
                       {permission.name} 
                   </label>
               ))}
             </div>
             <button type='submit' className='bg-primary-500 text-white rounded-md py-2 px-4'>
              {role ? 'Update Role' : 'Add Role'}
             </button>
             {role && (
               <button type='button' onClick={onCancel} className='bg-gray-300 rounded-md px-4 py-2 hover:bg-gray-400 transition ml-2'>
                   Cancel
               </button>
           )}
         </form>
     );
};

export default RoleForm;