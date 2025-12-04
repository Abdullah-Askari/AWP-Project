import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StatusBar, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/useTheme';

const Settings = () => {
  const router = useRouter();
  const { isDarkMode, toggleTheme, theme } = useTheme();

  const handleThemeToggle = async () => {
    await toggleTheme();
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <View className="shadow-md" style={{ 
        backgroundColor: theme.primary, 
        paddingTop: StatusBar.currentHeight 
      }}>
        <View className="flex-row items-center h-20 px-4 gap-4">
          <Pressable className="p-2" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={theme.textInverse} />
          </Pressable>
          <Text className="font-semibold text-xl flex-1" style={{ color: theme.textInverse }}>
            Settings
          </Text>
        </View>
      </View>
      
      {/* Content */}
      <View className="flex-1 p-6">
        <Text className="text-lg font-semibold mb-4 px-2" style={{ color: theme.text }}>
          Appearance
        </Text>
        
        <View className="rounded-xl shadow-sm" style={{ backgroundColor: theme.surface }}>
          <TouchableOpacity
            className="flex-row items-center p-6"
            disabled={true}
          >
            <View 
              className="w-14 h-14 rounded-lg items-center justify-center mr-4"
              style={{ backgroundColor: isDarkMode ? theme.primary + '20' : theme.accent + '20' }}
            >
              <Ionicons 
                name={isDarkMode ? 'moon' : 'sunny'} 
                size={28} 
                color={isDarkMode ? theme.primary : theme.accent} 
              />
            </View>
            
            <View className="flex-1">
              <Text className="text-xl font-semibold" style={{ color: theme.text }}>
                Dark Mode
              </Text>
              <Text className="text-sm mt-1" style={{ color: theme.textSecondary }}>
                {isDarkMode ? 'Dark theme enabled' : 'Light theme enabled'}
              </Text>
            </View>
            
            <Switch
              value={isDarkMode}
              onValueChange={handleThemeToggle}
              trackColor={{ false: theme.borderSecondary, true: theme.primary + '50' }}
              thumbColor={isDarkMode ? theme.primary : theme.accent}
              style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Settings