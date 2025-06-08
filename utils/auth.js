import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const checkAndRemoveExpiredToken = () => {
    const token = Cookies.get('token');
    
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Convert to seconds
            
            // Check if token is expired
            if (decodedToken.exp < currentTime) {
                // Remove expired token
                Cookies.remove('token');
                return true; // Token was expired and removed
            }
        } catch (error) {
            // If token is invalid, remove it
            Cookies.remove('token');
            return true; // Token was invalid and removed
        }
    }
    
    return false; // No token or token is valid
}; 