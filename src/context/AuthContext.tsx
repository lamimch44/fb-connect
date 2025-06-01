import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { User, FacebookPage } from '../types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  isFacebookConnected: boolean;
  user: User | null;
  pages: FacebookPage[];
  selectedPage: FacebookPage | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => void;
  connectPage: (page: FacebookPage) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isFacebookConnected: false,
  user: null,
  pages: [],
  selectedPage: null,
  login: async () => {},
  loginWithFacebook: async () => {},
  logout: () => {},
  connectPage: async () => {},
  isLoading: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFacebookConnected, setIsFacebookConnected] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [pages, setPages] = useState<FacebookPage[]>([]);
  const [selectedPage, setSelectedPage] = useState<FacebookPage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('https://front.growyourfund.xyz/api/user/login/', {
        email,
        password,
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      setIsAuthenticated(true);
      navigate('/connect');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithFacebook = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await new Promise<fb.StatusResponse>((resolve) => {
        FB.login((response) => resolve(response), {
          scope: 'public_profile,pages_show_list,pages_manage_posts'
        });
      });

      if (response.status === 'connected') {
        const userResponse = await new Promise<any>((resolve) => {
          FB.api('/me', { fields: 'id,name,email,picture' }, (response) => resolve(response));
        });

        const pagesResponse = await new Promise<any>((resolve) => {
          FB.api('/me/accounts', (response) => resolve(response));
        });

        const formattedPages = pagesResponse.data.map((page: any) => ({
          id: page.id,
          name: page.name,
          category: page.category,
          picture: `https://graph.facebook.com/${page.id}/picture?type=large`,
          isConnected: false,
          accessToken: page.access_token,
        }));

        setPages(formattedPages);
        setIsFacebookConnected(true);
      } else {
        setError('Facebook login failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Facebook login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const connectPage = async (page: FacebookPage) => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve, reject) => {
        FB.api(
          `/${page.id}`,
          { access_token: page.accessToken },
          (response) => {
            if (response.error) {
              reject(response.error);
            } else {
              resolve();
            }
          }
        );
      });

      const updatedPages = pages.map(p => 
        p.id === page.id ? { ...p, isConnected: true } : p
      );
      
      setPages(updatedPages);
      setSelectedPage({ ...page, isConnected: true });
    } catch (error) {
      setError('Error connecting page');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setIsFacebookConnected(false);
    setPages([]);
    setSelectedPage(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isFacebookConnected,
        user,
        pages,
        selectedPage,
        login,
        loginWithFacebook,
        logout,
        connectPage,
        isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
