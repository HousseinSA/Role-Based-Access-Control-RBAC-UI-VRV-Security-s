import React, { useState } from "react";
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
 
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('roles', JSON.stringify(result.updatedRoles));
      
      showNotificationMessage(result.message, "success");
    } else {
      showNotificationMessage(result.message, "error");
    }
    setCurrentRole(null);
  };

  const handleDeleteRole = (roleId) => {
    // Check if any users are using this role
    const isRoleInUse = users.some(user => user.role.id === roleId);

    if (isRoleInUse) {
      showNotificationMessage(
        "Cannot delete this role as it is assigned to one or more users",
        "error"
      );
      return;
    }

    // If role is not in use, proceed with deletion
    const updatedRoles = roles.filter((role) => role.id !== roleId);
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    showNotificationMessage("Role deleted successfully", "success");
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
    // Step 1: Update the permissions array with the updated permission name
    const updatedPermissions = permissions.map(permission =>
      permission.id === updatedPermission.id
        ? { ...permission, name: updatedPermission.name } // Update the permission name
        : permission
    );
  
    // Update the permissions state
    setPermissions(updatedPermissions);
  
    // Step 2: Update roles that use the updated permission
    const updatedRoles = roles.map(role => {
      // Check if the role uses the updated permission, if so, update it
      const updatedRolePermissions = role.permissions.map(permission => 
        permission.id === updatedPermission.id
          ? { ...permission, name: updatedPermission.name } // Update the permission name
          : permission
      );
  
      // Return the updated role
      return {
        ...role,
        permissions: updatedRolePermissions
      };
    });
  
    // Step 3: Update the roles state
    setRoles(updatedRoles);
  
    // Step 4: Persist the updated roles and permissions to localStorage
    localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
    localStorage.setItem('roles', JSON.stringify(updatedRoles));
  
    // Step 5: Show a success notification
    showNotificationMessage("Permission updated successfully", "success");
  
    // Step 6: Reset current edit permission state (optional)
    setCurrentEditPermission(null);
  };
  
  

  const handleDeletePermission = (id) => {
    // Check if the permission is used by any roles
    const isPermissionInUse = roles.some(role =>
      role.permissions && role.permissions.some(permission => permission.id === id)
    );
  
    if (isPermissionInUse) {
      showNotificationMessage("Cannot delete this permission as it is assigned to one or more roles", "error");
      return;
    }
  
    const result = deletePermission(permissions, id, roles);
    if (!result.success) {
      showNotificationMessage(result.message, "error");
    } else {
      setPermissions(result.updatedPermissions);
      localStorage.setItem("permissions", JSON.stringify(result.updatedPermissions));
      showNotificationMessage(result.message, "success");
    }
  };
  

  // Notification function
  const showNotificationMessage = (message, type) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);

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
        <Notification 
          message={notificationMessage} 
          type={notificationType} 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </div>
  );
};

export default App;