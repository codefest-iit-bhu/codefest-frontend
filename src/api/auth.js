import api from './api';

// Function to initiate Google OAuth2 login
export const loginWithGoogle = () => {
    window.location.href = 'https://codefest-backend-igxy.onrender.com/api/v1/Oauth2/google';
};

// Function to handle redirect after Google login or setPassword
export const handleSetPasswordRedirect = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const refreshToken = urlParams.get('refreshToken');

    if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
        alert('Logged in successfully!');
        window.location.href = '/dashboard'; // Redirect to your dashboard or another page
    } else {
        console.error('No refresh token found in the response');
    }
};

// Logout function
export const logout = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('User is not logged in.');

        await api.post('/auth/logout', { refreshToken });

        // Clear tokens and redirect
        localStorage.removeItem('refreshToken');
        alert('Logged out successfully!');
        window.location.href = '/';
    } catch (error) {
        console.error('Error during logout:', error.response?.data || error.message);
    }
};
