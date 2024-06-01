//src/service/InterfaceAPI
import { useState, useCallback } from 'react';

const useInterfaceResult = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const apiUrl = import.meta.env.VITE_REACT_APP_INTERFACE_ENDPOINT || 'http://localhost:8004';

  const login = useCallback(async () => {
    const loginUrl = `${apiUrl}/api/auth/login`;
    const credentials = {
      apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
      apiSecret: import.meta.env.VITE_REACT_APP_API_SECRET
    };

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      sessionStorage.setItem('interfaceAccessToken', data.accessToken);
      sessionStorage.setItem('interfaceRefreshToken', data.refreshToken);
      setAccessToken(data.accessToken);
      return true;
    } catch (error) {
      console.error('Login error:', error.message);
      setError(`Login error: ${error.message}`);
      return false;
    }
  }, [apiUrl]);

  const startInterface = useCallback(async (inslot, batch, material, plant, operationno) => {
    setIsLoading(true);
    setError('');

    let token = accessToken;
    if (!token) {
      const loggedIn = await login();
      if (!loggedIn) {
        setIsLoading(false);
        return;
      }
      token = sessionStorage.getItem('interfaceAccessToken');
    }

    const startUrl = `${apiUrl}/interfaces/physical-data`;

    try {
      const response = await fetch(startUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ inslot, batch, material, plant, operationno })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to start interface');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(`Failed to start interface: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, login, accessToken]);

  return { startInterface, result, error, isLoading };
};

export default useInterfaceResult;
