import {
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithCredential,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setUser({ uid: firebaseUser.uid, ...userDoc.data() });
        } else {
          setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Sign up with email and password
  const signUp = async (email, password, additionalData = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user: firebaseUser } = userCredential;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        email: firebaseUser.email,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        ...additionalData
      });

      return { success: true, user: firebaseUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Sign in with Google
  const signInWithGoogle = async (idToken, accessToken) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken, accessToken);
      const userCredential = await signInWithCredential(auth, credential);
      const { user: firebaseUser } = userCredential;

      // Check if user document exists, if not create one
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      return { success: true, user: firebaseUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Update user profile in Firestore
  const updateUserProfile = async (data) => {
    if (!user?.uid) return { success: false, error: 'No user logged in' };
    
    try {
      await setDoc(doc(db, 'users', user.uid), {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Update local user state
      setUser(prev => ({ ...prev, ...data }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Save screen-specific data to Firestore
  const saveScreenData = async (screenName, data) => {
    if (!user?.uid) return { success: false, error: 'No user logged in' };
    
    try {
      await setDoc(doc(db, 'users', user.uid, 'screens', screenName), {
        ...data,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Get screen-specific data from Firestore
  const getScreenData = async (screenName) => {
    if (!user?.uid) return { success: false, error: 'No user logged in' };
    
    try {
      const docSnap = await getDoc(doc(db, 'users', user.uid, 'screens', screenName));
      if (docSnap.exists()) {
        return { success: true, data: docSnap.data() };
      }
      return { success: true, data: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      signInWithGoogle,
      updateUserProfile,
      saveScreenData,
      getScreenData,
    }}>
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

export default useAuth;
