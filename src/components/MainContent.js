// src/components/MainContent.js
import React from 'react';
import { gsap } from 'gsap';
import UserForm from './UserManagement/UserForm';  // Import UserForm
import UserList from './UserManagement/UserList';  // Import UserList
import RoleForm from './RoleManagement/RoleForm';  // Import RoleForm
import RoleList from './RoleManagement/RoleList';  // Import RoleList
import PermissionForm from './PermissionManagement/PermissionForm';  // Import PermissionForm
import PermissionList from './PermissionManagement/PermissionList';  // Import PermissionList

const MainContent = ({ activeSection, users, roles, permissions, currentUser, currentRole, setCurrentUser, setCurrentRole, showNotification,setEditPermission,setPermissions,editPermission,handleDeleteRole,handleAddRole,handleEditRole,handleDeleteUser,handleAddUser,handleEditUser, }) => {
    const contentRef = React.useRef(null);

    React.useEffect(() => {
        gsap.from(contentRef.current, { opacity: 0, y: 20, duration: 0.5 });
    }, [activeSection]);

    const renderContent = () => {
        switch (activeSection) {
            case 'users':
                return (
                    <>
                        <h1 className='text-center text-xl font-bold mb-6'>User Management</h1>
                        <UserForm 
                            user={currentUser} 
                            onSubmit={currentUser ? handleEditUser : handleAddUser} 
                            roles={roles} 
                            existingUsers={users} 
                        />
                        <UserList users={users} onEdit={setCurrentUser} onDelete={handleDeleteUser} />
                    </>
                );
            case 'roles':
                return (
                    <>
                        <h1 className='text-center text-xl font-bold mt-8 mb-6'>Role Management</h1>
                        <RoleForm 
                            role={currentRole} 
                            onSubmit={currentRole ? handleEditRole : handleAddRole} 
                            existingRoles={roles}
                            permissions={permissions}
                            setPermissions={setPermissions}
                            showNotification={showNotification}
                        />
                        <RoleList roles={roles} onEdit={setCurrentRole} onDelete={handleDeleteRole} />
                    </>
                );
            case 'permissions':
                return (
                    <>
                        <h1 className='text-center text-xl font-bold mt-8 mb-6'>Manage Permissions</h1>
                        <PermissionForm permissions={permissions} setPermissions={setPermissions} showNotification={showNotification} editPermission={editPermission} />
                        <PermissionList permissions={permissions} setPermissions={setPermissions} showNotification={showNotification} setEditPermission={setEditPermission}/>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div ref={contentRef} className="flex-grow p-4">
            {renderContent()}
        </div>
    );
};

export default MainContent;