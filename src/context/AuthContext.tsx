import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  team?: string;
  phone?: string;
  college?: string;
  track?: string;
  teamMembers?: string[];
  registeredAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegistrationData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  college?: string;
  track?: string;
  teamName?: string;
  teamMembers?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('vortex_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('vortex_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage when changed
  useEffect(() => {
    if (user) {
      localStorage.setItem('vortex_user', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in registered users
    const registeredUsers = JSON.parse(localStorage.getItem('vortex_registered_users') || '[]');
    const foundUser = registeredUsers.find((u: any) => u.email === email);
    
    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'No account found with this email. Please register first.' };
    }
    
    if (foundUser.password !== password) {
      setIsLoading(false);
      return { success: false, error: 'Incorrect password. Please try again.' };
    }
    
    // Remove password before setting user
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    setIsLoading(false);
    
    return { success: true };
  };

  const register = async (data: RegistrationData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if email already exists
    const registeredUsers = JSON.parse(localStorage.getItem('vortex_registered_users') || '[]');
    const existingUser = registeredUsers.find((u: any) => u.email === data.email);
    
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'An account with this email already exists.' };
    }
    
    // Create new user
    const newUser: User & { password: string } = {
      id: `user_${Date.now()}`,
      email: data.email,
      name: data.name,
      password: data.password,
      phone: data.phone,
      college: data.college,
      track: data.track,
      team: data.teamName,
      teamMembers: data.teamMembers,
      registeredAt: new Date(),
    };
    
    // Save to registered users
    registeredUsers.push(newUser);
    localStorage.setItem('vortex_registered_users', JSON.stringify(registeredUsers));
    
    // Set current user (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    setIsLoading(false);
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vortex_user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      // Update in registered users as well
      const registeredUsers = JSON.parse(localStorage.getItem('vortex_registered_users') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...data };
        localStorage.setItem('vortex_registered_users', JSON.stringify(registeredUsers));
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
