// src/components/PermissionManagement/PermissionSection.js
import React from "react"
import PermissionForm from "./PermissionForm"
import PermissionList from "./PermissionList"

const PermissionSection = ({
    permissions,
    permission,
    showNotification,
    roles,
    onEdit,
    onDelete,
    onSubmit,
    existingPermissions,
    onCancel

}) => {
  return (
    <>
      <h1 className="text-center text-xl font-bold mt-8 mb-6 text-primary-500">
        Manage Permissions
      </h1>
      <PermissionForm
        permission={permission}
        onSubmit={onSubmit}
        existingPermissions={existingPermissions}
        showNotification={showNotification}
        onCancel={onCancel}
      />
      <PermissionList
        permissions={permissions}
        showNotification={showNotification}
        roles={roles}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  )
}

export default PermissionSection
