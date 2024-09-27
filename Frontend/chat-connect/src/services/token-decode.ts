import { jwtDecode } from 'jwt-decode';

const getToken = () => {
  return sessionStorage.getItem('token');
};

export const getUsernameFromToken = () => {
  try {
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};