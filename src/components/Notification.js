import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Notification = ({ message, type, onClose }) => {
    const notificationRef = useRef(null);

    // Use GSAP to animate the notification
    useEffect(() => {
        gsap.fromTo(notificationRef.current, 
            { opacity: 0, y: -20 }, 
            { opacity: 1, y: 0, duration: 0.3 }
        );

        // Automatically close the notification after a delay
        const timer = setTimeout(() => {
            gsap.to(notificationRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: onClose // Call onClose after animation
            });
        }, 3000); // Show for 3 seconds

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [onClose]);

    return (
        <div 
            ref={notificationRef} 
            className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg transition-all ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
            {message}
        </div>
    );
};

export default Notification;