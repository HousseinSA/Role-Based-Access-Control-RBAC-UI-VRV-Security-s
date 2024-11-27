import React, { useState } from "react"
import { Edit2 as EditIcon, Trash as DeleteIcon } from "lucide-react"
import ConfirmationDialog from "../ConfirmationDialog"
import Select from "react-select" // Import React Select
import {customStyles} from './UserForm'

const UserList = ({ users, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortCriteria, setSortCriteria] = useState("name") // Default sort by name

  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setShowConfirm(true)
  }

  const confirmDelete = () => {
    onDelete(userToDelete.id)
    setShowConfirm(false)
    setUserToDelete(null)
  }
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort users based on selected criteria
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortCriteria === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortCriteria === "email") {
      return a.email.localeCompare(b.email)
    }
    return 0
  })

  // Define sorting options for react-select
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
  ]

  return (
    <div className="overflow-x-auto pb-4">
      <h2 className="text-xl font-semibold mb-4 text-primary-500">
        User Management
      </h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-md p-2 outline-primary-500 mb-4 w-full"
      />

      {/* Sort Options using react-select */}
      <div className="mb-4">
        <label className="mr-2">Sort by:</label>
        <Select
          options={sortOptions}
          value={sortOptions.find((option) => option.value === sortCriteria)} // Set the current sort option
          onChange={(option) => setSortCriteria(option.value)} // Update sort criteria based on selection
          className="border border-gray-300 w-64 inline-block rounded-md p-2"
          styles={customStyles}
        />
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Role</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              {/* Status with styled background */}
              <td className={`py-2 px-4`}>
                <span
                  className={`inline-block py-1 px-3 rounded-full ${
                    user.status ? "bg-green-100" : "bg-red-100"
                  } ${user.status ? "text-green-800" : "text-red-800"}`}
                >
                  {user.status ? "Active" : "Inactive"}
                </span>
              </td>
              {/* Role with styled background */}
              <td className={`py-2 px-4`}>
                <span
                  className={`inline-block py-1 px-3 rounded-full ${
                    user.role === "Admin" ? "bg-primary-100" : "bg-gray-100"
                  } text-gray-800`}
                >
                  {user.role.name}
                </span>
              </td>
              <td className="py-2 px-4 flex gap-2">
                {/* Edit button */}
                <button
                  onClick={() => onEdit(user)}
                  className="bg-primary-500 hover:bg-primary-400 rounded-full p-2 "
                  aria-label="Edit User"
                >
                  <EditIcon size={16} color="#fff" />
                </button>
                {/* Delete button */}
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="bg-red-500 rounded-full p-2 hover:bg-red-600"
                  aria-label="Delete User"
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
          message={`Are you sure you want to delete ${userToDelete.name}?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  )
}

export default UserList
