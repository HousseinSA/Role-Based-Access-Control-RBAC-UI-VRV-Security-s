// src/App.js
import React, { useState } from "react";
import Notification from "./components/Notification";
import Sidebar from "./components/Sidebar"; // Import Sidebar
import MainContent from "./components/MainContent"; // Import MainContent

const App = () => {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });
  const [roles, setRoles] = useState(() => {
    return JSON.parse(localStorage.getItem("roles")) || [];
  });
  const [permissions, setPermissions] = useState(() => {
    return JSON.parse(localStorage.getItem("permissions")) || [
      { id: 1, name: "Read" },
      { id: 2, name: "Write" },
      { id: 3, name: "Delete" }
    ];
  });
  
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const [currentEditPermission, setCurrentEditPermission] = useState(null); 
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [activeSection, setActiveSection] = useState("users"); // State for active section

  // User operations
  const handleAddUser = (user) => {
    if (users.some((u) => u.name === user.name || u.email === user.email)) {
      showNotificationMessage("A user with this name or email already exists.", "error");
      return;
    }
    const newUser = { id: Date.now(), ...user };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    showNotificationMessage("User created successfully!", "success");
  };

  const handleEditUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setCurrentUser(null);
    showNotificationMessage("User updated successfully!", "success");
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    showNotificationMessage("User deleted successfully!", "success");
  };

  // Role operations
  const handleAddRole = (role) => {
    if (roles.some((r) => r.name === role.name)) {
      showNotificationMessage("A role with this name already exists.", "error");
      return;
    }
    
    const newRole = { id: Date.now(), ...role };
    const updatedRoles = [...roles, newRole];
    
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    showNotificationMessage("Role created successfully!", "success");
  };

  const handleEditRole = (updatedRole) => {
    const updatedRoles = roles.map((role) =>
      role.id === updatedRole.id ? updatedRole : role
    );

    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    setCurrentRole(null);
    showNotificationMessage("Role updated successfully!", "success");
  };

  const handleDeleteRole = (id) => {
    const updatedRoles = roles.filter((role) => role.id !== id);
    
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    showNotificationMessage("Role deleted successfully!", "success");
  };

  // Permission operations

  // Permission operations
 
  // Permission operations
  const handleAddPermission = (permission) => {
    if (permissions.some((p) => p.name === permission.name)) {
      showNotificationMessage("A permission with this name already exists.", "error");
      return;
    }

    const newPermission = { id: Date.now(), ...permission };
    const updatedPermissions = [...permissions, newPermission];

    setPermissions(updatedPermissions);
    localStorage.setItem("permissions", JSON.stringify(updatedPermissions));
    showNotificationMessage("Permission created successfully!", "success");
  };

  const handleEditPermission = (updatedPermission) => {
    const updatedPermissions = permissions.map((permission) =>
      permission.id === updatedPermission.id ? updatedPermission : permission
    );

    setPermissions(updatedPermissions);
    localStorage.setItem("permissions", JSON.stringify(updatedPermissions));
    showNotificationMessage("Permission updated successfully!", "success");
    
    // Reset the current edit permission after updating
    setCurrentEditPermission(null);
  };

  const handleDeletePermission = (id) => {
    // Prevent deletion of default permissions
    if (["Read", "Write", "Delete"].includes(permissions.find(p => p.id === id)?.name)) {
      showNotificationMessage("Default permissions cannot be deleted.", "error");
      return;
    }

    // Prevent deletion if the permission is used in any role
    if (roles.some(role => role.permissions.includes(permissions.find(p => p.id === id)?.name))) {
      showNotificationMessage("Cannot delete this permission because it is assigned to a role.", "error");
      return;
    }

    const updatedPermissions = permissions.filter((permission) => permission.id !== id);
    
    setPermissions(updatedPermissions);
    localStorage.setItem("permissions", JSON.stringify(updatedPermissions)); // Update local storage
    showNotificationMessage("Permission deleted successfully!", "success");
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
        currentEditPermission={currentEditPermission} // Pass current permission for editing
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