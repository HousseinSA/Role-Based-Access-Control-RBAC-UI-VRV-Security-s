import React from 'react';
import Select from 'react-select'; // Import React Select

const Sidebar = ({ activeSection, setActiveSection }) => {
    const options = [
        { value: 'users', label: 'Users' },
        { value: 'roles', label: 'Roles' },
        { value: 'permissions', label: 'Permissions' }
    ];

    const handleChange = (selectedOption) => {
        setActiveSection(selectedOption.value); // Update active section based on selection
    };

    return (
        <div className='md:w-64 bg-gray-200 h-full p-4 hidden md:block'>
                        <h2 className="text-lg font-semibold mb-4 text-primary-500">Dashboard</h2>

            <div className="block md:hidden mb-4">
                <Select
                    options={options}
                    onChange={handleChange}
                    placeholder="Select an option"
                    className="mb-3"
                />
            </div>

            {/* Sidebar items for larger screens */}
            <ul className="hidden md:block">
                {options.map(option => (
                    <li 
                        key={option.value}
                        className={`cursor-pointer py-2 px-4 rounded ${activeSection === option.value ? 'bg-primary-300' : ''}`}
                        onClick={() => setActiveSection(option.value)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;