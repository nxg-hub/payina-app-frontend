import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const REGISTRATION_LEVELS = {

    BVN_VERIFICATION_DOCUMENT_UPLOAD: 0,
    BVN_DETAILS_CONFIRMATION_SAVE_USERNAME: 1,
    FACIAL_CAPTURE_AND_UPLOAD: 2,
    CORPORATE_PROFILE_UPDATE_SET_PIN:3,
    KYC_COMPLETED:4,
    // Add more levels as needed
};

export function useAuth(){
    const navigate = useNavigate();

    const checkUserRegistrationLevel = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                // No token, handle unauthenticated state (e.g., redirect to login)
                navigate('/login');
                return;
            }

            const response = await axios.get(import.meta.env.VITE_REG_LEVEL_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const registrationLevel = response.data;
            const step = REGISTRATION_LEVELS[registrationLevel] || 0;

            if (step < 17) {
                navigate('/signup');
            } else {
                navigate('/account/dashboard');
            }
        } catch (error) {
            console.error('Error checking registration level:', error);
            navigate('/login'); // Fallback to login in case of an error
        }
    };

    useEffect(() => {
        checkUserRegistrationLevel();
    }, []);

    return { checkUserRegistrationLevel };
}