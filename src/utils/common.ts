
import  jwtDecode, {JwtPayload}  from 'jwt-decode';
export const retreiveFromStorage = async (key: string) => {
  return await localStorage.getItem(key);
};

export const saveToStorage = (key: string, value:any) => {
  localStorage.setItem(key, value);
  return value;
}

export const setToken = (token: string) => {
  try {
    localStorage.setItem('token', token);
    return token
  } catch (err) {
    
  }
};

export const getTokenFromStorage = async () => {
  try {
    const token = await localStorage.getItem('token');
    if (token) {
      const decodedToken = await jwtDecode<JwtPayload>(token);
      if(decodedToken?.exp){
          const expiresAt = new Date(decodedToken?.exp * 1000);
          if (new Date() < expiresAt) {
            return token;
          } else {
            await localStorage.removeItem('token');
            return null;
          }
      }
    }
  } catch (error) {
    return null;
  }
};

interface IJwtPayload extends JwtPayload {
    user: any
}

export const getUserFromStorage = async () => {
  try {
    const token = await localStorage.getItem('token');
    if (token) {
      const decodedToken = await jwtDecode<IJwtPayload>(token);
      if(decodedToken){
          return decodedToken.user
      }
    }
  } catch (error) {
    return null;
  }
};