import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StatusBar, Text, View } from "react-native";
import { useAuth } from '../../context/useAuth';
import { useTheme } from '../../context/useTheme';
import { db } from '../../firebaseConfig';

export default function Schedule() {
  const router = useRouter();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [weeklySchedule, setWeeklySchedule] = useState([]);

  // Load schedule from Firestore
  useEffect(() => {
    const loadScheduleData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.schedule) {
              setWeeklySchedule(data.schedule);
            }
          }
          // Save visit
          await setDoc(doc(db, 'users', user.uid, 'screens', 'schedule'), {
            lastVisited: serverTimestamp(),
          }, { merge: true });
        } catch (error) {
          console.log('Error loading schedule data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    loadScheduleData();
  }, [user]);

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
          <Text className="font-semibold text-xl flex-1" style={{ color: theme.textInverse }}>Schedule</Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 p-6" style={{ backgroundColor: theme.background }}>
        <Text className="text-2xl font-bold mb-6" style={{ color: theme.text }}>This Week</Text>
        
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {weeklySchedule.map((daySchedule, dayIndex) => (
            <View key={dayIndex} className="mb-6">
              <Text className="text-lg font-bold mb-3" style={{ color: theme.text }}>{daySchedule.day}</Text>
              
              {daySchedule.classes.map((classItem, classIndex) => (
                <View 
                  key={classIndex} 
                  className="rounded-xl p-4 mb-3 shadow-sm"
                  style={{ backgroundColor: theme.surface }}
                >
                  <View className="flex-row items-center">
                    <View 
                      className="w-12 h-12 rounded-full items-center justify-center mr-4"
                      style={{ backgroundColor: classItem.color + '20' }}
                    >
                      <Ionicons name={classItem.icon} size={24} color={classItem.color} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold" style={{ color: theme.text }}>{classItem.subject}</Text>
                      <Text className="text-sm mt-1" style={{ color: theme.textSecondary }}>{classItem.time}</Text>
                      <View className="flex-row items-center mt-1">
                        <Ionicons name="location-outline" size={12} color={theme.textSecondary} />
                        <Text className="text-xs ml-1" style={{ color: theme.textTertiary }}>{classItem.room}</Text>
                        <Text className="mx-2" style={{ color: theme.textTertiary }}>•</Text>
                        <Text className="text-xs" style={{ color: theme.textTertiary }}>{classItem.professor}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
