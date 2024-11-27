import React, { useState } from "react";
import { Edit2 as EditIcon, Trash as DeleteIcon } from "lucide-react";
import ConfirmationDialog from "../ConfirmationDialog";

const RoleList = ({ roles, onEdit, onDelete, users,showNotification }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const handleDeleteClick = (role) => {
    setRoleToDelete(role);
    setShowConfirm(true);
  };


  const confirmDelete = () => {
    // Prevent deletion if the role is used by any user
    if (users.some(user => user.role === roleToDelete.name)) { // Assuming user has a roleId property linking to roles
      showNotification("Cannot delete this role because it is assigned to users.", "error");
      setShowConfirm(false);
      setRoleToDelete(null);
      return;
    }

    onDelete(roleToDelete.id); // Call delete function with role ID
    setShowConfirm(false);
    setRoleToDelete(null);
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-primary-500">Role Management</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Role Name</th>
            <th className="py-2 px-4 text-left">Permissions</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4 capitalize">{role.name}</td>
              <td className={`py-2 px-4 max-w-xs`}>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission,index) => (
                    <span key={index} className={`inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-800`}>
                      {permission.name}
                    </span>
                  ))}
                </div>
              </td> 
              <td className="py-2 px-4 flex gap-2">
                <button 
                  onClick={() => onEdit(role)} 
                  className="bg-primary-500 rounded-full p-2 hover:bg-primary-600"
                  aria-label="Edit Role"
                >
                  <EditIcon size={16} color="#fff" /> 
                </button>
                {/* Delete button */}
                <button 
                  onClick={() => handleDeleteClick(role)} 
                  className="bg-red-500 rounded-full p-2 hover:bg-red-600"
                  aria-label="Delete Role"
                >
                  <DeleteIcon size={16} color="#fff" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <ConfirmationDialog 
          message={`Are you sure you want to delete the role "${roleToDelete.name}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default RoleList;