'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAndRemoveExpiredToken } from '@/utils/auth';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';

export default function AuthCheckLayout({ children }) {
    const router = useRouter();
    const { logout } = useAuth();

    useEffect(() => {
        const tokenWasRemoved = checkAndRemoveExpiredToken();
        
        if (tokenWasRemoved) {
            // Logout the user if token was removed
            logout();
            toast.info('Your session has expired. Please login again.');
            
            // Store current path for redirect after login
            const currentPath = window.location.pathname;
            if (currentPath !== '/login') {
                document.cookie = `redirectAfterLogin=${currentPath}; path=/`;
            }
            
            // Redirect to login page
            router.push('/login');
        }
    }, []);

    return children;
} 