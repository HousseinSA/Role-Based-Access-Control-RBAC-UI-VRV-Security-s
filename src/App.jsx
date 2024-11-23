// src/App.js
import React, { useState } from 'react';
import UserList from './components/UserManagement/UserList';
import UserForm from './components/UserManagement/UserForm';
import RoleList from './components/RoleManagement/RoleList';
import RoleForm from './components/RoleManagement/RoleForm';
import PermissionForm from './components/PermissionManagement/PermissionForm'; 
import PermissionList from './components/PermissionManagement/PermissionList'; 
import Notification from './components/Notification';
import Sidebar from './components/Sidebar'; // Import Sidebar
import MainContent from './components/MainContent'; // Import MainContent

const App = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState(['Read', 'Write', 'Delete']); 
    const [currentUser, setCurrentUser] = useState(null);
    const [currentRole, setCurrentRole] = useState(null);
    const [editPermission, setEditPermission] = useState(null); 
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [activeSection, setActiveSection] = useState('users'); // State for active section

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
         <div className='flex'>
             {/* Sidebar */}
             <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

             {/* Main Content */}
             <MainContent 
                 activeSection={activeSection}
                 users={users}
                 roles={roles}
                 handleAddUser={handleAddUser}
                 handleDeleteUser={handleDeleteUser}
                 setPermissions={setPermissions}
                 handleEditUser={handleEditUser}
                 handleAddRole={handleAddRole}
                 handleDeleteRole={handleDeleteRole}
                 handleEditRole={handleEditRole}
                 permissions={permissions}
                 currentUser={currentUser}  // Pass current user for editing
                 currentRole={currentRole}  // Pass current role for editing
                 setCurrentUser={setCurrentUser}
                 setCurrentRole={setCurrentRole}
                 showNotification={showNotificationMessage} // Pass the notification function here
                 editPermission={editPermission} // Pass editPermission state if needed
                 setEditPermission={setEditPermission} // Function to update permission editing state
             />

             {/* Notification */}
             {showNotification && (
                 <Notification 
                     message={notificationMessage} 
                     type={notificationType} 
                     onClose={() => setShowNotification(false)} 
                 />
             )}
         </div>  
     );
}

export default App;