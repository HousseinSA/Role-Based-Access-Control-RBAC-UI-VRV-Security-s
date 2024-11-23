// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
    return (
        <div className="w-64 bg-gray-200 h-full p-4">
            <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
            <ul>
                <li 
                    className={`cursor-pointer py-2 px-4 rounded ${activeSection === 'users' ? 'bg-blue-300' : ''}`}
                    onClick={() => setActiveSection('users')}
                >
                    Users
                </li>
                <li 
                    className={`cursor-pointer py-2 px-4 rounded ${activeSection === 'roles' ? 'bg-blue-300' : ''}`}
                    onClick={() => setActiveSection('roles')}
                >
                    Roles
                </li>
                <li 
                    className={`cursor-pointer py-2 px-4 rounded ${activeSection === 'permissions' ? 'bg-blue-300' : ''}`}
                    onClick={() => setActiveSection('permissions')}
                >
                    Permissions
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;