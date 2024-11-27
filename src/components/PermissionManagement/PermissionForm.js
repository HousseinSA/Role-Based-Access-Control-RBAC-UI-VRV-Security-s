// src/components/PermissionManagement/PermissionForm.js
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PermissionForm = ({ permission, onSubmit, existingPermissions = [], showNotification, onCancel }) => {
   const [name, setName] = useState('');

   useEffect(() => {
       if (permission) {
           setName(permission.name); // Set name for editing
       } else {
           resetFields(); // Reset fields for adding
       }
   }, [permission]);

   const resetFields = () => {
       setName('');
   };

   const handleSubmit = (e) => {
       e.preventDefault();

       if (existingPermissions.some((p) => p.name === name && p.id !== permission?.id)) {
           showNotification("A permission with this name already exists.", "error");
           return;
       }

       if (!name) {
           showNotification("Please provide a permission name.", "error");
           return;
       }

       const newPermissionData = {
           id: permission?.id || uuidv4(),
           name,
       };

       // Notify parent component about the new or updated permission.
       onSubmit(newPermissionData);

       // Reset fields after submission
       resetFields();
   };

   return (
       <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white rounded-lg shadow-md">
           <h3 className="text-lg font-semibold mb-3">{permission ? 'Update Permission' : 'Add Permission'}</h3>
           <input 
               type="text" 
               value={name} 
               onChange={(e) => setName(e.target.value)} 
               placeholder="Permission Name" 
               required 
               className="border border-gray-300 rounded-md p-2 w-full mb-3"
           />
           <button type='submit' className='bg-primary-500 text-white rounded-md py-2 px-4'>
               {permission ? 'Update Permission' : 'Add Permission'}
           </button>
           {permission && (
               <button type='button' onClick={onCancel} className='bg-gray-300 rounded-md px-4 py-2 hover:bg-gray-400 transition ml-2'>
                   Cancel
               </button>
           )}
       </form>
   );
};

export default PermissionForm;