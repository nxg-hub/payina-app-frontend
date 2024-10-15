import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      // Check if we have a value in localStorage
      const saved = localStorage.getItem(key);
      currentValue = saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      // If there's an error parsing the stored value, use default
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    // Update localStorage when value changes
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
