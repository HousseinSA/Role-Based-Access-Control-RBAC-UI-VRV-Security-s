# Role-Based Access Control (RBAC) Application

This project is a Role-Based Access Control (RBAC) application designed for managing users, roles, and permissions. It provides an intuitive interface for administrators to manage access control efficiently. The application is built using React and utilizes local storage for data persistence.

## Features

### User Management:
- View, add, edit, and delete users.
- Assign roles to users.
- Toggle user status (Active/Inactive).

### Role Management:
- Define roles with specific permissions.
- Edit existing roles and update associated users automatically.
- Delete roles while ensuring that users assigned to those roles are updated.

### Permission Management:
- Create and edit permissions.
- Assign permissions to roles dynamically.
- Ensure that changes in permissions are reflected across all roles.

### Dynamic Updates:
- Changes made to role names or permissions are automatically reflected in users assigned those roles.
- The application updates local storage to maintain data integrity.

### Responsive Design:
- The application is designed to be responsive and user-friendly across devices.

## Technologies Used
- **Frontend:** React
- **State Management:** React Hooks
- **Styling:** Tailwind CSS (or your preferred styling method)
- **Data Storage:** Local Storage

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- A code editor (e.g., Visual Studio Code).

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
