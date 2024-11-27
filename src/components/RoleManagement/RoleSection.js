// src/components/RoleManagement/RoleSection.js
import React from "react"
import RoleForm from "./RoleForm"
import RoleList from "./RoleList"

const RoleSection = ({
  role,
  onSubmit,
  existingRoles,
  permissions,
  showNotification,
  onCancel,
  roles,
  users,
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <h1 className="text-center text-xl font-bold mt-8 mb-6 text-primary-500">
        Role Management
      </h1>
      <RoleForm
        role={role}
        onSubmit={onSubmit}
        existingRoles={existingRoles}
        permissions={permissions}
        showNotification={showNotification}
        onCancel={onCancel} // Reset logic here if needed
      />
      <RoleList
        roles={roles}
        users={users} // Pass users if needed for deletion checks
        onEdit={onEdit}
        showNotification={showNotification}
        onDelete={onDelete}
      />
    </>
  )
}

export default RoleSection
