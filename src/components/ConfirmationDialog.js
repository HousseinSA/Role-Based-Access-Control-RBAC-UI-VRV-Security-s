// src/components/ConfirmationDialog.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    const dialogRef = useRef(null);

    // Use GSAP to animate the dialog
    useEffect(() => {
        gsap.fromTo(dialogRef.current, 
            { opacity: 0, scale: 0.5 }, 
            { opacity: 1, scale: 1, duration: 0.3 }
        );
    }, []);

    const handleCancel = () => {
        // Animate out before calling onCancel
        gsap.to(dialogRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            onComplete: () => onCancel() // Call onCancel after animation
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={dialogRef} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">{message}</h3>
                <div className="flex justify-end">
                    <button 
                        onClick={handleCancel} 
                        className="bg-gray-300 rounded-md px-4 py-2 mr-2 hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;