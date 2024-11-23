// src/App.js
import React, { useState } from 'react';
import UserList from './components/UserManagement/UserList';
import UserForm from './components/UserManagement/UserForm';
import RoleList from './components/RoleManagement/RoleList';
import RoleForm from './components/RoleManagement/RoleForm';
import PermissionForm from './components/PermissionManagement/PermissionForm'; // Import PermissionForm
import PermissionList from './components/PermissionManagement/PermissionList'; // Import PermissionList
import Notification from './components/Notification';

const App = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState(['Read', 'Write', 'Delete']); // Initialize permissions
    const [currentUser, setCurrentUser] = useState(null);
    const [currentRole, setCurrentRole] = useState(null);
    const [editPermission, setEditPermission] = useState(null); // State for editing permission
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    // Handle user operations
    const handleAddUser = (user) => {
        if (users.some(u => u.name === user.name || u.email === user.email)) {
            showNotificationMessage('A user with this name or email already exists.', 'error');
            return;
        }
        setUsers([...users, { id: Date.now(), ...user }]);
        showNotificationMessage('User created successfully!', 'success');
    };

    const handleEditUser = (updatedUser) => {
        setUsers(users.map(user => 
            user.id === updatedUser.id ? updatedUser : user
        ));
        setCurrentUser(null); // Reset current user after edit
        showNotificationMessage('User updated successfully!', 'success');
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
        showNotificationMessage('User deleted successfully!', 'success');
    };

    // Handle role operations
    const handleAddRole = (role) => {
        if (roles.some(r => r.name === role.name)) {
            showNotificationMessage('A role with this name already exists.', 'error');
            return;
        }
        setRoles([...roles, { id: Date.now(), ...role }]);
        showNotificationMessage('Role created successfully!', 'success');
    };

    const handleEditRole = (updatedRole) => {
        setRoles(roles.map(role => 
            role.id === updatedRole.id ? updatedRole : role
        ));
        setCurrentRole(null); // Reset current role after edit
        showNotificationMessage('Role updated successfully!', 'success');
    };

    const handleDeleteRole = (id) => {
        setRoles(roles.filter(role => role.id !== id));
        showNotificationMessage('Role deleted successfully!', 'success');
    };

    // Notification function
    const showNotificationMessage = (message, type) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);

         // Hide notification after a delay
         setTimeout(() => {
             setShowNotification(false);
         }, 3000); // Duration should match the animation duration in Notification.js
     };

     return (
         <div className='p-6 bg-gray-100 min-h-screen'>
             {/* Notification */}
             {showNotification && (
                 <Notification 
                     message={notificationMessage} 
                     type={notificationType} 
                     onClose={() => setShowNotification(false)} 
                 />
             )}
             
             {/* User Management */}
             <h1 className='text-center text-xl font-bold mb-6'>User Management</h1>
             <UserForm 
                 user={currentUser} 
                 onSubmit={currentUser ? handleEditUser : handleAddUser} 
                 roles={roles} 
                 existingUsers={users} 
             />
             <UserList users={users} onEdit={setCurrentUser} onDelete={handleDeleteUser} />

             {/* Role Management */}
             <h1 className='text-center text-xl font-bold mt-8 mb-6'>Role Management</h1>
             <RoleForm 
                 role={currentRole} 
                 onSubmit={currentRole ? handleEditRole : handleAddRole} 
                 existingRoles={roles}
                 permissions={permissions}
                 setPermissions={setPermissions}
                 showNotification={showNotificationMessage}
             />
             <RoleList roles={roles} onEdit={setCurrentRole} onDelete={handleDeleteRole} />
             
             {/* Permission Management */}
             <h1 className='text-center text-xl font-bold mt-8 mb-6'>Manage Permissions</h1>
             <PermissionForm permissions={permissions} setPermissions={setPermissions} showNotification={showNotificationMessage} editPermission={editPermission} />
             <PermissionList permissions={permissions} setPermissions={setPermissions} showNotification={showNotificationMessage} setEditPermission={setEditPermission}/>
         </div>  
     );
}

export default App;