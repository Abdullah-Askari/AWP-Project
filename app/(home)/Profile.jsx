import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/useAuth';
import { useTheme } from '../../context/useTheme';
import { db } from '../../firebaseConfig';

const Profile = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    address: '',
    dob: ''
  });

  // Load profile data from Firestore
  useEffect(() => {
    const loadProfileData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.profile) {
              setProfileData(data.profile);
            } else {
              // Fallback to root level data
              setProfileData({
                name: data.displayName || '',
                email: data.email || '',
                address: data.address || '',
                dob: data.dob || ''
              });
            }
          }
          // Save profile visit
          await setDoc(doc(db, 'users', user.uid, 'screens', 'profile'), {
            lastVisited: serverTimestamp(),
          }, { merge: true });
        } catch (error) {
          console.log('Error loading profile data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    loadProfileData();
  }, [user]);

  // Save profile changes
  const handleSaveChanges = async () => {
    if (user?.uid) {
      try {
        await setDoc(doc(db, 'users', user.uid), {
          profile: profileData,
          updatedAt: serverTimestamp(),
        }, { merge: true });
        Alert.alert('Success', 'Profile saved successfully!');
      } catch (error) {
        Alert.alert('Error', 'Failed to save profile');
      }
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View className="flex-1">
      {/* Header */}
            <View className="shadow-md" style={{ backgroundColor: theme.primary, paddingTop: StatusBar.currentHeight }}>
              <View className="flex-row items-center h-20 px-4 gap-4">
                <Pressable className="p-2"
                onPress={()=>router.back()}>
                  <Ionicons name="arrow-back" size={28} color={theme.textInverse} />
                </Pressable>
                <Text className="font-semibold text-xl flex-1" style={{ color: theme.textInverse }}>Profile</Text>
              </View>
            </View>
            {/* Edit Button */}
            <View className="flex-1 p-6" style={{ backgroundColor: theme.background }}>
              <View className="flex-row justify-end mb-6">
                <TouchableOpacity 
                  className="flex-row items-center px-4 py-2 rounded-lg" 
                  style={{ 
                    backgroundColor: theme.primary,
                    borderWidth: 1,
                    borderColor: theme.primary,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 3
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons name="create-outline" size={20} color={theme.textInverse} />
                  <Text className="ml-2 font-medium" style={{ color: theme.textInverse }}>Edit</Text>
                </TouchableOpacity>
              </View>
              
              <View className="flex justify-center items-center mb-6">
                {/* Profile Picture */}
                <View className="w-40 h-40 rounded-full border-4 overflow-hidden" style={{ borderColor: theme.border }}>
                  <Image
                  source={require('../../assets/images/Illustration-1.png')}
                  style={{ width: 160, height: 160 }}
                  contentFit="cover"
                  />
                </View>
              </View>
              
              {/* User Information [name]*/}
              <View className="rounded-xl p-4 shadow-sm mb-4" style={{ backgroundColor: theme.surface }}>
                <Text className="text-sm mb-1" style={{ color: theme.textSecondary }}>Name</Text>
                <Text className="text-lg font-semibold" style={{ color: theme.text }}>{profileData.name || 'Not set'}</Text>
              </View>
                  
                  {/* User Information [email]*/}
                  <View className="rounded-xl p-4 shadow-sm mb-4" style={{ backgroundColor: theme.surface }}>
                    <Text className="text-sm mb-1" style={{ color: theme.textSecondary }}>Email</Text>
                    <Text className="text-lg font-semibold" style={{ color: theme.text }}>{profileData.email || 'Not set'}</Text>
                  </View>
                  {/* User Information [address]*/}
                  <View className="rounded-xl p-4 shadow-sm mb-4" style={{ backgroundColor: theme.surface }}>
                    <Text className="text-sm mb-1" style={{ color: theme.textSecondary }}>Address</Text>
                    <Text className="text-lg font-semibold" style={{ color: theme.text }}>{profileData.address || 'Not set'}</Text>
                  </View>

                  {/* User Information [D.O.B]*/}
                  <View className="rounded-xl p-4 shadow-sm" style={{ backgroundColor: theme.surface }}>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-1">
                        <Text className="text-sm mb-1" style={{ color: theme.textSecondary }}>D.O.B</Text>
                        <Text className="text-lg font-semibold" style={{ color: theme.text }}>{profileData.dob || 'Not set'}</Text>
                      </View>
                      <Pressable className="ml-4" onPress={() => console.log('Calendar pressed')}>
                        <Ionicons name="calendar-outline" size={20} color={theme.textSecondary} />
                      </Pressable>
                    </View>
                  </View>
                  
                  {/* Save Button */}
                  <TouchableOpacity 
                    className="rounded-xl p-4 shadow-sm mt-4 items-center" 
                    style={{ backgroundColor: theme.primary }}
                    onPress={handleSaveChanges}
                  >
                    <Text className="text-lg font-semibold" style={{ color: theme.textInverse }}>Save Changes</Text>
                  </TouchableOpacity>
                </View>
    </View>
  )
}

export default Profile