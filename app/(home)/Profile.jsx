import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { uploadToCloudinary } from '../../cloudinaryConfig';
import { useAuth } from '../../context/useAuth';
import { useTheme } from '../../context/useTheme';

const Profile = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const { userData, updateUserProfile } = useAuth();
  const [uploading, setUploading] = useState(false);
  
  // Get profile data from centralized userData
  const profileData = userData?.profile || {
    name: '',
    email: '',
    address: '',
    dob: '',
    profilePicture: ''
  };

  // Pick image from gallery
  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to change your profile picture.');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  // Take photo with camera
  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera permissions to take a photo.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await uploadProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  // Upload image to Cloudinary and save URL
  const uploadProfilePicture = async (imageUri) => {
    setUploading(true);
    try {
      const { url } = await uploadToCloudinary(imageUri);
      
      // Update profile with new picture URL
      await updateUserProfile({ 
        profile: { 
          ...profileData, 
          profilePicture: url 
        } 
      });
      
      Alert.alert('Success', 'Profile picture updated!');
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', error.message || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  // Show options for changing profile picture
  const handleChangeProfilePicture = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  // Save profile changes
  const handleSaveChanges = async () => {
    try {
      await updateUserProfile({ profile: profileData });
      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile');
    }
  };

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
            {/* Content */}
            <View className="flex-1 p-6" style={{ backgroundColor: theme.background }}>
              
              <View className="flex justify-center items-center mb-6">
                {/* Profile Picture */}
                <TouchableOpacity 
                  onPress={handleChangeProfilePicture}
                  disabled={uploading}
                  activeOpacity={0.8}
                >
                  <View className="w-40 h-40 rounded-full border-4 overflow-hidden" style={{ borderColor: theme.border }}>
                    {uploading ? (
                      <View className="w-full h-full items-center justify-center" style={{ backgroundColor: theme.surface }}>
                        <ActivityIndicator size="large" color={theme.primary} />
                        <Text className="text-xs mt-2" style={{ color: theme.textSecondary }}>Uploading...</Text>
                      </View>
                    ) : (
                      <Image
                        source={profileData.profilePicture 
                          ? { uri: profileData.profilePicture } 
                          : require('../../assets/images/Illustration-1.png')
                        }
                        style={{ width: 160, height: 160 }}
                        contentFit="cover"
                      />
                    )}
                  </View>
                  {/* Camera Icon Overlay */}
                  <View 
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <Ionicons name="camera" size={20} color={theme.textInverse} />
                  </View>
                </TouchableOpacity>
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