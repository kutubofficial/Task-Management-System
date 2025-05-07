// Save token to localStorage
export const setToken = (token) => {
    localStorage.setItem('taskManagerToken', token);
  };
  
  // Get token from localStorage
  export const getToken = () => {
    return localStorage.getItem('taskManagerToken');
  };
  
  // Remove token from localStorage
  export const removeToken = () => {
    localStorage.removeItem('taskManagerToken');
  };
  
  // Check if user is authenticated
  export const isAuthenticated = () => {
    return !!getToken();
  };
  
  // Get user data from token
  export const getUserFromToken = () => {
    const token = getToken();
    if (!token) return null;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      return payload;
    } catch (error) {
      removeToken();
      return null;
    }
  };