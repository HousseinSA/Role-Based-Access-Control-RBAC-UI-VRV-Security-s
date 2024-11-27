import React, { useRef } from "react"
import { gsap } from "gsap"
import Select from "react-select"
import PermissionSection from "./PermissionManagement/PermissionSection"
import RoleSection from "./RoleManagement/RoleSection"
import UserSection from "./UserManagement/UserSection"

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
  const contentRef = useRef(null)

  React.useEffect(() => {
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
  }, [activeSection])

  const options = [
    { value: "users", label: "Users" },
    { value: "roles", label: "Roles" },
    { value: "permissions", label: "Permissions" },
  ]

  const handleChange = (selectedOption) => {
    setActiveSection(selectedOption.value)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return (
          <UserSection
            user={currentUser}
            onSubmit={currentUser ? handleEditUser : handleAddUser}
            roles={roles}
            existingUsers={users}
            onCancel={() => setCurrentUser(null)}
            users={users}
            onEdit={setCurrentUser}
            onDelete={handleDeleteUser}
            showNotification={showNotification}

          />
        )
      case "roles":
        return (
          <RoleSection
            role={currentRole}
            onSubmit={currentRole ? handleEditRole : handleAddRole}
            existingRoles={roles}
            permissions={permissions}
            showNotification={showNotification}
            onCancel={() => setCurrentRole(null)}
            roles={roles}
            users={users}
            onEdit={setCurrentRole}
            onDelete={handleDeleteRole}
          />
        )
      case "permissions":
        return (
          <PermissionSection
            permission={currentEditPermission}
            permissions={permissions}
            showNotification={showNotification}
            roles={roles}
            onEdit={(permission) => setCurrentEditPermission(permission)} // Function to edit permission
            onDelete={(id) => handleDeletePermission(id)} // Function to delete permission
            onSubmit={
              currentEditPermission ? handleEditPermission : handleAddPermission
            }
            existingPermissions={permissions}
            onCancel={() => setCurrentEditPermission(null)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div ref={contentRef} className="flex-grow p-4 overflow-y-auto h-full">
      {/* Show Select only on small screens */}
      <h2 className="block md:hidden text-lg font-semibold mb-4 text-primary-500">
        Dashboard
      </h2>
      <div className="block md:hidden mb-4">
        <Select
          options={options}
          onChange={handleChange}
          placeholder="Select an option"
          className="mb-3"
        />
      </div>

      {/* Render content based on active section */}
      {renderContent()}
    </div>
  )
}

export default MainContent
