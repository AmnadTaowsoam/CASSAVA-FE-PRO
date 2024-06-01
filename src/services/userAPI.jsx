import { useState, useCallback } from 'react';

const useFetchUsers = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:8080';

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiUrl}/api/users/users`, {
        method: 'GET',
        // credentials: 'include', // Ensure the server and endpoint support credentials
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Attempt to parse error details from the response if the response was not ok
        let errorData = { message: 'Something went wrong' };
        try {
          errorData = await response.json();
        } catch (jsonError) {
          console.error('Error parsing error response:', jsonError);
        }
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(`Failed to fetch: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  return { fetchUsers, result, error, isLoading };
};

export default useFetchUsers;
