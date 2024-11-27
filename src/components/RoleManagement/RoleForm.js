import React, { useState, useEffect } from "react";
import Notification from "../Notification";
import { v4 as uuidv4 } from "uuid";

const RoleForm = ({ role, onSubmit, existingRoles, permissions, onCancel }) => {
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // Populate the form fields when a role is selected for editing
  useEffect(() => {
    if (role) {
      setRoleName(role.name);
      setSelectedPermissions(role.permissions || []);
    } else {
      resetFields();
    }
  }, [role]);

  const resetFields = () => {
    setRoleName("");
    setSelectedPermissions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate roles
    if (existingRoles.some((r) => r.name === roleName && r.id !== role?.id)) {
      showNotificationMessage("A role with this name already exists.", "error");
      return;
    }

    // Ensure all fields are filled
    if (!roleName) {
      showNotificationMessage("Please provide a role name.", "error");
      return;
    }

    // Prepare new role object with permission objects
    const newRole = {
      id: role?.id || uuidv4(),
      name: roleName,
      permissions: selectedPermissions, // Store the full permission objects
    };

    // Save or update role in local storage
    const rolesInLocalStorage = JSON.parse(localStorage.getItem("roles")) || [];

    if (role) {
      // Update existing role
      const updatedRoles = rolesInLocalStorage.map((r) =>
        r.id === role.id ? newRole : r
      );
      localStorage.setItem("roles", JSON.stringify(updatedRoles));
    } else {
      // Add new role
      rolesInLocalStorage.push(newRole);
      localStorage.setItem("roles", JSON.stringify(rolesInLocalStorage));
    }

    onSubmit(newRole);

    if (!role) resetFields();
  };

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

  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prev) =>
      prev.some((p) => p.id === permission.id)
        ? prev.filter((p) => p.id !== permission.id)
        : [...prev, permission] // Store the full permission object
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow-md">
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
      <h3 className="text-lg font-semibold mb-3 text-primary-500">{role ? "Edit Role" : "Add Role"}</h3>
      <input
        type="text"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        placeholder="Role Name"
        required
        className="border border-gray-300 outline-primary-500 rounded-md p-2 w-full mb-3"
      />

      {/* Permissions checkboxes */}
      <div className="mb-3">
        <h4>Permissions:</h4>
        {permissions.map((permission) => (
          <label key={permission.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedPermissions.some((p) => p.id === permission.id)} // Check based on id
              onChange={() => handlePermissionChange(permission)} // Pass the full permission object
              className="rounded-checkbox mr-2"
            />
            {permission.name}
          </label>
        ))}
      </div>

      <button type="submit" className="bg-primary-500 text-white rounded-md py-2 px-4">
        {role ? "Update Role" : "Add Role"}
      </button>

      {role && (
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 rounded-md px-4 py-2 hover:bg-gray-400 transition ml-2"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default RoleForm;
