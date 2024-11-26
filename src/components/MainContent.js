// src/components/MainContent.js
import React, { useRef } from "react";
import { gsap } from "gsap";
import UserForm from "./UserManagement/UserForm"; 
import UserList from "./UserManagement/UserList"; 
import RoleForm from "./RoleManagement/RoleForm"; 
import RoleList from "./RoleManagement/RoleList"; 
import PermissionForm from "./PermissionManagement/PermissionForm"; 
import PermissionList from "./PermissionManagement/PermissionList"; 
import Select from 'react-select'; 

const MainContent = ({
  activeSection,
  setActiveSection,
  users,
  roles,
  permissions,
  setCurrentEditPermission,
  currentEditPermission,
  currentUser,
  currentRole,
  setCurrentUser,
  setCurrentRole,
  handleAddUser,
  showNotification,
  handleEditUser,
  handleDeleteUser,
  handleAddRole,
  handleEditRole,
  handleDeleteRole,
  handleAddPermission,
  handleEditPermission,
  handleDeletePermission,
}) => {
  
const contentRef = useRef(null);

React.useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
}, [activeSection]);

const options = [
    { value: 'users', label: 'Users' },
    { value: 'roles', label: 'Roles' },
    { value: 'permissions', label: 'Permissions' }
];

const handleChange = (selectedOption) => {
    setActiveSection(selectedOption.value); 
};

const renderContent = () => {
    switch (activeSection) {
      case "users":
          return (
              <>
                  <h1 className="text-center text-xl font-bold mt-8 mb-6 text-primary-500">User Management</h1>
                  <UserForm
                      user={currentUser}
                      onSubmit={currentUser ? handleEditUser : handleAddUser}
                      roles={roles}
                      existingUsers={users}
                      onCancel={() => setCurrentUser(null)} 
                  />
                  <UserList users={users} onEdit={setCurrentUser} onDelete={handleDeleteUser} />
              </>
          );
      case "roles":
          return (
              <>
                  <h1 className="text-center text-xl font-bold mt-8 mb-6 text-primary-500">Role Management</h1>
                  <RoleForm 
                      role={currentRole} 
                      onSubmit={currentRole ? handleEditRole : handleAddRole} 
                      existingRoles={roles} 
                      permissions={permissions} 
                      showNotification={showNotification} 
                      onCancel={() => setCurrentRole(null)} 
                  />
                  <RoleList roles={roles} onEdit={setCurrentRole} onDelete={handleDeleteRole} />
              </>
          );
      case "permissions":
     return (
       <>
         <h1 className="text-center text-xl font-bold mt-8 mb-6 text-primary-500">Manage Permissions</h1>
         <PermissionForm 
           permission={currentEditPermission} // Pass current permission for editing or an empty object for adding new
           onSubmit={currentEditPermission ? handleEditPermission : handleAddPermission}
           existingPermissions={permissions} 
           showNotification={showNotification}
           onCancel={() => setCurrentEditPermission(null)} // Reset edit state
         />
         <PermissionList 
           permissions={permissions}  
           showNotification={showNotification} 
           onEdit={(permission) => setCurrentEditPermission(permission)} // Function to edit permission
           onDelete={(id) => handleDeletePermission(id)} // Function to delete permission
         />
       </>
          );
      default:
          return null;
    }
};

return (
    <div ref={contentRef} className="flex-grow p-4 overflow-y-auto h-full">
      {/* Show Select only on small screens */}
      <h2 className="block md:hidden text-lg font-semibold mb-4 text-primary-500">Dashboard</h2>
      <div className="block md:hidden mb-4">
          <Select options={options} onChange={handleChange} placeholder="Select an option" className="mb-3" />
      </div>

      {/* Render content based on active section */}
      {renderContent()}
    </div>
);
};

export default MainContent;