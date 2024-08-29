import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const REGISTRATION_LEVELS = {
    BVN_VERIFICATION_DOCUMENT_UPLOAD: 0,
    BVN_DETAILS_CONFIRMATION: 1,
    FACIAL_CAPTURE_AND_UPLOAD: 2,
    CORPORATE_PROFILE_UPDATE: 3,
    SET_TRANSACTION_PIN: 4,
    KYC_COMPLETED: 5,
};

export function useAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const registrationLevel = localStorage.getItem('registrationLevel');

        if (token) {
            const savedStep = REGISTRATION_LEVELS[registrationLevel] || 0;

            if (savedStep < 5) { // Adjust this number based on your logic
                navigate('/signup');
            } else {
                navigate('/account/dashboard');
            }
        } else {
            navigate('/');
        }
    }, [navigate]);
}
