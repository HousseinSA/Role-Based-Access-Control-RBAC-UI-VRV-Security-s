// src/lib/userOperations.js
import { v4 as uuidv4 } from 'uuid';

export const addUser = (users, user) => {
    if (users.some((u) => u.name === user.name || u.email === user.email)) {
        return { success: false, message: "A user with this name or email already exists." };
    }
    console.log(user, 'user')
    const newUser = { id: uuidv4(), ...user };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return { success: true, message: "User created successfully!", updatedUsers };
};

export const editUser = (users, updatedUser) => {
    const updatedUsers = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return { success: true, message: "User updated successfully!", updatedUsers };
};

export const deleteUser = (users, id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return { success: true, message: "User deleted successfully!", updatedUsers };
};
