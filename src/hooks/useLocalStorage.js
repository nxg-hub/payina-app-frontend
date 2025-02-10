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
    // Update localStorage when value changes, but prevent overwriting with an empty string
    if (value !== '') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue];
};
//   useEffect(() => {
//     // Update localStorage when value changes
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value, key]);

//   return [value, setValue];
// };

export default useLocalStorage;

// import { useState, useEffect } from 'react';
//
// const useLocalStorage = (key, defaultValue) => {
//   const [value, setValue] = useState(() => {
//     let currentValue;
//
//     try {
//       // Check if we have a value in localStorage
//       const saved = localStorage.getItem(key);
//       currentValue = saved ? JSON.parse(saved) : defaultValue;
//     } catch (error) {
//       // If there's an error parsing the stored value, use default
//       currentValue = defaultValue;
//     }
//
//     return currentValue;
//   });
//
//   useEffect(() => {
//     // Update localStorage when value changes
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value, key]);
//
//   // return [value, setValue];
//   // };
//
//   // export default useLocalStorage;
//
//   const getToken = () => {
//     try {
//       const token = localStorage.getItem(key);
//       return token ? JSON.parse(token) : null;
//     } catch (error) {
//       console.error('Error retrieving token', error);
//       return null;
//     }
//   };
//
//   return [value, setValue, getToken];
// };
//
// export default useLocalStorage;
