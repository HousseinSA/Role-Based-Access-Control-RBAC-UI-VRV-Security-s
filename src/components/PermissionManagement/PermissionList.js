import React, { useState } from "react";
import { Edit2 as EditIcon, Trash as DeleteIcon } from "lucide-react";
import ConfirmationDialog from "../ConfirmationDialog";

const PermissionList = ({
  permissions,
  showNotification,
  onEdit,
  onDelete,
  roles
}) => {
  const [permissionToDelete, setPermissionToDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = (permission) => {
    setPermissionToDelete(permission);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    // Prevent deletion if the permission is used in any role
    if (roles.some(role => role.permissions.includes(permissionToDelete.name))) {
      showNotification("Cannot delete this permission because it is assigned to a role.", "error");
      setShowConfirm(false);
      setPermissionToDelete(null);
      return;
    }

    onDelete(permissionToDelete.id); // Call delete function with permission ID
    showNotification(`Permission "${permissionToDelete.name}" deleted successfully!`, "success");
    setShowConfirm(false);
    setPermissionToDelete(null);
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-primary-500">Available Permissions</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Permission</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">
                <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-800">
                  {permission.name}
                </span>
              </td>
              <td className="py-2 px-4 flex gap-2">
                <button
                  onClick={() => onEdit(permission)} // Call edit function
                  className="bg-primary-500 hover:bg-primary-400 rounded-full p-2 text-white"
                >
                  <EditIcon size={16} />
                </button>
                {/* Disable delete button for certain permissions */}
                <button
                  onClick={() => handleDeleteClick(permission)}
                  disabled={["Read", "Write", "Delete"].includes(permission.name)} // Disable if it's Read, Write, or Delete
                  className={`rounded-full p-2 ${["Read", "Write", "Delete"].includes(permission.name) ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white`}
                >
                  <DeleteIcon size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirm && (
        <ConfirmationDialog
          message={`Are you sure you want to delete the permission "${permissionToDelete.name}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default PermissionList;