// src/lib/roleOperations.js
import { v4 as uuidv4 } from 'uuid';

export const addRole = (roles, role) => {
    if (roles.some((r) => r.name === role.name)) {
        return { success: false, message: "A role with this name already exists." };
    }
    
    const newRole = { id: uuidv4(), ...role };
    const updatedRoles = [...roles, newRole];
    
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    return { success: true, message: "Role created successfully!", updatedRoles };
};

export const editRole = (roles, updatedRole) => {
    const updatedRoles = roles.map((role) =>
        role.id === updatedRole.id ? updatedRole : role
    );

    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    return { success: true, message: "Role updated successfully!", updatedRoles };
};

export const deleteRole = (roles, id, users) => {
    // Prevent deletion if the role is used by any user
    if (users.some(user => user.roleId === id)) {
        return { success: false, message: "Cannot delete this role because it is assigned to users." };
    }

    const updatedRoles = roles.filter((role) => role.id !== id);
    
    localStorage.setItem("roles", JSON.stringify(updatedRoles)); // Update local storage
    return { success: true, message: "Role deleted successfully!", updatedRoles };
};