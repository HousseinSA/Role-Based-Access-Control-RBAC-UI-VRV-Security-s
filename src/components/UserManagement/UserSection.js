// src/components/UserManagement/UserSection.js
import React from 'react';
import UserForm from './UserForm';
import UserList from './UserList';

const UserSection = ({ 
    user,
    onSubmit,
    roles,
    existingUsers,
    onCancel,
    users,
    onEdit,
    onDelete,
    showNotification

 }) => {
    return (
        <>
            <h1 className="text-center text-xl font-bold mt-8 mb-6 text-primary-500">User Management</h1>
            <UserForm
                user={user}
                onSubmit={onSubmit}
                existingUsers={existingUsers}
                roles={roles} // Pass appropriate roles if needed
                onCancel={onCancel} // Reset logic here if needed
            />
            <UserList users={users} onEdit={onEdit} onDelete={onDelete} showNotification={showNotification} />
        </>
    );
};

export default UserSection;