import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const REGISTRATION_LEVELS = {
    BVN_VERIFICATION_DOCUMENT_UPLOAD: 0,
    BVN_DETAILS_CONFIRMATION: 1,
    FACIAL_CAPTURE_AND_UPLOAD: 2,
    CORPORATE_PROFILE_UPDATE: 3,
    SET_TRANSACTION_PIN: 4,
    KYC_COMPLETED: 5,
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

            if (step < 17) { // assuming 17 is the completion level
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

export default useAuth;


// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
//
// const REGISTRATION_LEVELS = {
//     BVN_VERIFICATION_DOCUMENT_UPLOAD: 0,
//     BVN_DETAILS_CONFIRMATION: 1,
//     FACIAL_CAPTURE_AND_UPLOAD: 2,
//     CORPORATE_PROFILE_UPDATE: 3,
//     SET_TRANSACTION_PIN: 4,
//     KYC_COMPLETED: 5,
// };
//
// export function useAuth() {
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const token = localStorage.getItem('authToken');
//         const registrationLevel = localStorage.getItem('registrationLevel');
//
//         if (token) {
//             const savedStep = REGISTRATION_LEVELS[registrationLevel] || 0;
// console.log(savedStep);
//             if (savedStep < 5) { // Adjust this number based on your logic
//                 navigate('/signup');
//             } else {
//                 navigate('/account/dashboard');
//             }
//         } else {
//             navigate('/login');
//         }
//     }, [navigate]);
// }
