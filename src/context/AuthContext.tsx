
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import type { UserProfile } from '../types/marketplace';
import { DEMO_USERS } from '../data/mockMarketplace';

interface AuthContextType {
  currentUser: UserProfile | null;
  isGuest: boolean;
  isAuthenticated: boolean;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    college?: string;
    isStudent?: boolean;
    role?: 'buyer' | 'seller' | 'student';
  }) => Promise<boolean>;
  signin: (email: string, password: string) => Promise<boolean>;
  signinAsGuest: () => void;
  loginAsDemoUser: (userId: string) => void;
  signout: () => void;
  updateWalletBalance: (delta: number) => void;
  isSignupModalOpen: boolean;
  openSignupModal: () => void;
  closeSignupModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_KEY = 'bidz_is_guest_v1';

function mapSupabaseUser(user: User): UserProfile {
  const metadata = user.user_metadata ?? {};

  return {
    id: user.id,
    name: metadata.name || user.email?.split('@')[0] || 'Bidz User',
    email: user.email || '',
    avatar:
      metadata.avatar ||
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    college: metadata.college || undefined,
    isStudentVerified: Boolean(
      metadata.isStudent && metadata.college
    ),
    walletBalance: 2500,
    watchlist: [],
    role: metadata.role || (metadata.isStudent ? 'student' : 'buyer'),
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;

      if (error) {
        console.error('Could not restore session:', error.message);
        return;
      }

      if (data.session?.user) {
        setCurrentUser(mapSupabaseUser(data.session.user));
        setIsGuest(false);
        localStorage.removeItem(GUEST_KEY);
      } else if (localStorage.getItem(GUEST_KEY) === 'true') {
        setIsGuest(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      if (session?.user) {
        setCurrentUser(mapSupabaseUser(session.user));
        setIsGuest(false);
        localStorage.removeItem(GUEST_KEY);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signup: AuthContextType['signup'] = async (data) => {
    const { data: result, error } = await supabase.auth.signUp({
      email: data.email.trim(),
      password: data.password,
      options: {
        data: {
          name: data.name.trim(),
          college: data.college || '',
          isStudent: Boolean(data.isStudent),
          role: data.role || (data.isStudent ? 'student' : 'buyer'),
        },
      },
    });

    if (error) throw error;

    setIsGuest(false);
    localStorage.removeItem(GUEST_KEY);

    if (result.session && result.user) {
      setCurrentUser(mapSupabaseUser(result.user));
    }

    return true;
  };

  const signin: AuthContextType['signin'] = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) throw error;
    if (!data.user) throw new Error('Sign-in failed.');

    setCurrentUser(mapSupabaseUser(data.user));
    setIsGuest(false);
    localStorage.removeItem(GUEST_KEY);

    return true;
  };

  const signinAsGuest = () => {
    setCurrentUser(null);
    setIsGuest(true);
    localStorage.setItem(GUEST_KEY, 'true');
  };

  // Demo profiles are for demonstration only, not real authenticated accounts.
  const loginAsDemoUser = (userId: string) => {
    const user = DEMO_USERS.find((u) => u.id === userId) || DEMO_USERS[0];
    setCurrentUser(user);
    setIsGuest(false);
    localStorage.removeItem(GUEST_KEY);
  };

  const signout = () => {
    void supabase.auth.signOut().then(({ error }) => {
      if (error) console.error('Sign-out failed:', error.message);
    });

    setCurrentUser(null);
    setIsGuest(false);
    localStorage.removeItem(GUEST_KEY);
  };

  const updateWalletBalance = (delta: number) => {
    if (!currentUser) return;

    // Demo-only balance. Do not use this for real payments or bidding.
    setCurrentUser((user) =>
      user
        ? {
            ...user,
            walletBalance: Math.max(0, user.walletBalance + delta),
          }
        : null
    );
  };

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isGuest,
        isAuthenticated: !!currentUser,
        signup,
        signin,
        signinAsGuest,
        loginAsDemoUser,
        signout,
        updateWalletBalance,
        isSignupModalOpen,
        openSignupModal,
        closeSignupModal,
      }}
    >
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
