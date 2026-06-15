import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Existing User Auth (Officer)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('mockUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('mockUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mockUser');
  };

  // Admin Auth
  const [adminUser, setAdminUser] = useState(() => {
    const savedAdmin = localStorage.getItem('mockAdminUser');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  const adminLogin = (userData) => {
    setAdminUser(userData);
    localStorage.setItem('mockAdminUser', JSON.stringify(userData));
  };

  const adminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('mockAdminUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, adminUser, adminLogin, adminLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
