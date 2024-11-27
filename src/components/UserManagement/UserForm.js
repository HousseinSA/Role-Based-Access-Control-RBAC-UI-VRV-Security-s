import React, { useState, useEffect } from "react"
import Notification from "../Notification"
import Select from "react-select" 
import { v4 as uuidv4 } from "uuid" 

export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "#66cc66"
      : state.isSelected
      ? "#c2f0c2"
      : "#fff", // Light color when selected or focused
    color: state.isFocused ? "white" : "black",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#fff", // Background color of the select control
    borderColor: "#009900", // Primary border color
    boxShadow: "none",
    "&:hover": {
      borderColor: "#66cc66", // Border color on hover
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black", // Color of the selected value
  }),
}
const UserForm = ({ user, onSubmit, roles, existingUsers, onCancel }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(true)
  const [selectedRole, setSelectedRole] = useState(null) // Change to null for React Select
  // Notification states
  const [notificationMessage, setNotificationMessage] = useState("")
  const [notificationType, setNotificationType] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  // Populate the form fields when a user is selected for editing
  useEffect(() => {
    if (user) {
        setName(user.name)
        setEmail(user.email)
        setStatus(user.status)
        // Find the matching role in roles array
        const userRole = roles.find(role => role.id === user.role.id)
        if (userRole) {
            setSelectedRole({
                value: userRole.name,
                label: userRole.name,
                id: userRole.id
            })
        }
    } else {
        resetFields()
    }
}, [user, roles])
  const resetFields = () => {
    setName("")
    setEmail("")
    setStatus(true)
    setSelectedRole(null) // Reset to null
  }

  const handleCancel = () => {
    resetFields() // Reset fields when cancel is clicked
    onCancel() // Call the onCancel function provided by the parent
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check for duplicate users
    if (existingUsers.some((u) => u.name === name && u.id !== user?.id)) {
        showNotificationMessage("A user with this name already exists.", "error")
        return
    }

    if (existingUsers.some((u) => u.email === email && u.id !== user?.id)) {
        showNotificationMessage("A user with this email already exists.", "error")
        return
    }

    // Ensure all fields are filled
    if (!name || !email || !selectedRole) {
        showNotificationMessage("Please fill in all fields.", "error")
        return
    }

    // Use uuid for generating a new user ID
    onSubmit({
        id: user?.id || uuidv4(),
        name,
        email,
        status,
        role: {
            id: selectedRole.id,    // Use the role's id from selectedRole
            name: selectedRole.value // Use the role's name
        }
    })

    // Clear form fields after submission only if it's a new user creation
    if (!user) resetFields()
}

  const showNotificationMessage = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotification(true)

    // Hide notification after a delay
    setTimeout(() => {
      setShowNotification(false)
    }, 3000) // Duration should match the animation duration in Notification.js
  }

  // Prepare options for react-select
  const roleOptions = roles.map((role) => ({
    value: role.name,
    label: role.name,
    id: role.id  // Changed from roleId to id to match your role object structure
}))

  
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-white rounded-lg shadow-md"
    >
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
      <h3 className="text-lg font-semibold mb-3 text-primary-500">
        {user ? "Edit User" : "Add User"}
      </h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="border border-gray-300 rounded-md p-2 w-full mb-3 outline-primary-500"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="border border-gray-300 rounded-md p-2 w-full mb-3 outline-primary-500"
      />
      <label className="flex items-center mb-3">
        <input
          type="checkbox"
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
          className="rounded-checkbox"
        />
        <span className="ml-2">Active</span>
      </label>

      {/* Custom Styled Select */}
      <Select
        options={roleOptions}
        value={selectedRole}
        onChange={(option) => setSelectedRole(option)} // Set selected role as an object
        placeholder="Select Role"
        className="mb-3 "
        styles={customStyles}
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-primary-500 hover:bg-primary-400 text-white rounded-md py-2 px-4"
        >
          {user ? "Update User" : "Add User"}
        </button>
        {user && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 rounded-md px-4 py-2 hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default UserForm
