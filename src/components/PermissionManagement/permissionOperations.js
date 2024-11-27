// src/lib/permissionOperations.js
import { v4 as uuidv4 } from 'uuid';

export const addPermission = (permissions, permission) => {
    if (permissions.some((p) => p.name === permission.name)) {
        return { success: false, message: "A permission with this name already exists." };
    }

    const newPermission = { id: uuidv4(), ...permission };
    const updatedPermissions = [...permissions, newPermission];

    localStorage.setItem("permissions", JSON.stringify(updatedPermissions));
    return { success: true, message: "Permission created successfully!", updatedPermissions };
};

export const editPermission = (permissions, updatedPermission) => {
    const updatedPermissions = permissions.map((permission) =>
        permission.id === updatedPermission.id ? updatedPermission : permission
    );

    localStorage.setItem("permissions", JSON.stringify(updatedPermissions));
    return { success: true, message: "Permission updated successfully!", updatedPermissions };
};

export const deletePermission = (permissions, id, roles) => {
    // Prevent deletion of default permissions
    if (["Read", "Write", "Delete"].includes(permissions.find(p => p.id === id)?.name)) {
        return { success: false, message: "Default permissions cannot be deleted." };
    }

    // Prevent deletion if the permission is used in any role
    if (roles.some(role => role.permissions.includes(permissions.find(p => p.id === id)?.name))) {
        return { success: false, message: "Cannot delete this permission because it is assigned to a role." };
    }

    const updatedPermissions = permissions.filter((permission) => permission.id !== id);
    
    localStorage.setItem("permissions", JSON.stringify(updatedPermissions)); // Update local storage
    return { success: true, message: "Permission deleted successfully!", updatedPermissions };
};