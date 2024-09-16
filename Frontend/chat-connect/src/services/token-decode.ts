import {jwtDecode} from 'jwt-decode';

export const getUsernameFromToken = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.sub;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};