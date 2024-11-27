// src/App.js
import React, {  useState } from "react";
import Notification from "./components/Notification";
import Sidebar from "./components/Sidebar"; 
import MainContent from "./components/MainContent"; 
import {editPermission, addPermission, deletePermission} from './components/PermissionManagement/permissionOperations'; 
import {addRole, deleteRole, editRole} from './components/RoleManagement/roleOperations'
import {addUser, deleteUser, editUser} from './components/UserManagement/userOperations'
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);
  const [roles, setRoles] = useState(() => JSON.parse(localStorage.getItem("roles")) || []);
  const [permissions, setPermissions] = useState(() => JSON.parse(localStorage.getItem("permissions")) || [
    { id: uuidv4(), name: "Read" },
    { id: uuidv4(), name: "Write" },
    { id: uuidv4(), name: "Delete" }
  ]);

  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [currentEditPermission, setCurrentEditPermission] = useState(null); 
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [activeSection, setActiveSection] = useState("users"); 

  // User operations
  const handleAddUser = (user) => {
    const result = addUser(users, user);
    if (!result.success) {
      showNotificationMessage(result.message, "error");
    } else {
      setUsers(result.updatedUsers);
      showNotificationMessage(result.message, "success");
    }
  };

  const handleEditUser = (updatedUser) => {
    const result = editUser(users, updatedUser);
    setUsers(result.updatedUsers);
    showNotificationMessage(result.message, "success");
    setCurrentUser(null);
  };

  const handleDeleteUser = (id) => {
    const result = deleteUser(users, id);
    setUsers(result.updatedUsers);
    showNotificationMessage(result.message, "success");
  };

  // Role operations
  const handleAddRole = (role) => {
    const result = addRole(roles, role);
    if (!result.success) {
      showNotificationMessage(result.message, "error");
    } else {
      setRoles(result.updatedRoles);
      showNotificationMessage(result.message, "success");
    }
  };

  const handleEditRole = (updatedRole) => {
    const result = editRole(roles, updatedRole);
 
    if (result.success) {
        setRoles(result.updatedRoles);
        
        // Update users with the new role name
        const updatedUsers = users.map(user => {
            if (user.role.id === updatedRole.id) {
                return {
                    ...user,
                    role: {
                        ...user.role,
                        name: updatedRole.name,
                    }
                };
            }
            return user;
        });
 
        setUsers(updatedUsers); // Update users state
        localStorage.setItem('users', JSON.stringify(updatedUsers)); // Update localStorage
        localStorage.setItem('roles', JSON.stringify(result.updatedRoles)); // Update roles in localStorage
        
        showNotificationMessage(result.message, "success");
    } else {
        showNotificationMessage(result.message, "error");
    }
    setCurrentRole(null);
 };

  const handleDeleteRole = (id) => {
    const result = deleteRole(roles, id, users); 
    if (!result.success) {
      showNotificationMessage(result.message, "error");
    } else {
      setRoles(result.updatedRoles);
      showNotificationMessage(result.message, "success");
    }
  };

  // Permission operations
  const handleAddPermission = (permission) => {
    const result = addPermission(permissions, permission);
    if (!result.success) {
      showNotificationMessage(result.message, "error");
    } else {
      setPermissions(result.updatedPermissions);
      showNotificationMessage(result.message, "success");
    }
  };

  const handleEditPermission = (updatedPermission) => {
    const result = editPermission(permissions, updatedPermission);
    setPermissions(result.updatedPermissions);
    showNotificationMessage(result.message, "success");
    setCurrentEditPermission(null);
  };

  const handleDeletePermission = (id) => {
    const result = deletePermission(permissions, id, roles);
    if (!result.success) {
      showNotificationMessage(result.message, "error");
    } else {
      setPermissions(result.updatedPermissions);
      showNotificationMessage(result.message, "success");
    }
  };

  // Notification function
  const showNotificationMessage = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);

    // Hide notification after a delay
    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage("");
      setNotificationType("");
    }, 3000); 
  };

  return (
   <div className="flex h-screen overflow-hidden">
     <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
     <MainContent
       activeSection={activeSection}
       users={users}
       roles={roles}
       permissions={permissions}
       currentUser={currentUser}
       currentRole={currentRole}
       currentEditPermission={currentEditPermission} 
       setCurrentUser={setCurrentUser}
       setActiveSection={setActiveSection}
       setCurrentRole={setCurrentRole}
       showNotification={showNotificationMessage}
       handleAddUser={handleAddUser}
       handleEditUser={handleEditUser}
       handleDeleteUser={handleDeleteUser}
       handleAddRole={handleAddRole}
       handleEditRole={handleEditRole}
       handleDeleteRole={handleDeleteRole}
       handleAddPermission={handleAddPermission} 
       handleEditPermission={handleEditPermission} 
       handleDeletePermission={handleDeletePermission} 
       setCurrentEditPermission={setCurrentEditPermission} 
     />
     {showNotification && (
       <Notification message={notificationMessage} type={notificationType} onClose={() => setShowNotification(false)} />
     )}
   </div>
 );
};

export default App;