import React, { useState, useCallback } from 'react';
import { apiService } from '../services/apiService';
import InputStyle from '../utilities/InputStyle';

const EmailVerification = ({
                             onUserVerified,
                             value,
                             onChange,
                             type = "email",
                             placeholder = "Enter Email address",
                             className = "border-2 rounded-[5px] px-5 py-2 border-primary bg-black text-slate-600"
                           }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const verifyEmail = useCallback(async (email) => {
    if (!email) return;

    setLoading(true);
    setError('');

    try {
      const response = await apiService.checkEmailRegistration(email);

      // Assuming the API returns { exists: boolean, message: string, userType: string | null }
      const isRegistered = response.exists;

      // Call the callback with the verification result and email
      onUserVerified(isRegistered, email, response.userType);

      if (!isRegistered) {
        // If user doesn't exist, we don't show an error, as this is expected behavior
        setError('');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during verification');
    } finally {
      setLoading(false);
    }
  }, [onUserVerified]);

  const handleChange = useCallback((e) => {
    const newEmail = e.target.value;
    onChange(e);  // Call the parent's onChange handler

    // Clear any existing error when the user types
    if (error) setError('');
  }, [onChange, error]);

  const handleBlur = useCallback((e) => {
    verifyEmail(e.target.value);
  }, [verifyEmail]);

  return (
    <div>
      <InputStyle
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={className}
        disabled={loading}
      />
      {loading && <span className="text-yellow">Verifying...</span>}
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default EmailVerification;