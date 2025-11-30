import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRef, useState } from 'react'
import { Animated, Dimensions, Pressable, StatusBar, Text, TouchableOpacity, View } from 'react-native'

const { width, height } = Dimensions.get('window')

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current
  const overlayAnim = useRef(new Animated.Value(0)).current

  const toggleDrawer = () => {
    const toValue = isDrawerOpen ? -width * 0.8 : 0
    const overlayValue = isDrawerOpen ? 0 : 0.5
    
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: overlayValue,
        duration: 350,
        useNativeDriver: true,
      })
    ]).start()
    
    setIsDrawerOpen(!isDrawerOpen)
  }

  const menuItems = [
    {
      icon:'book-outline', label:'Gradebook', color:'#000'
    },
    {
      icon:'calendar-outline', label:'Attendance', color:'#000'
    },
    {
      icon:'chatbubble-ellipses-outline', label:'Feedback', color:'#000'
    },
    {
      icon:'document-text-outline', label:'Invoices', color:'#000'
    },
    {
      icon:'settings-outline', label:'Settings', color:'#000'
    }
  ]
  const subjects = [
    {
        icon: 'calculator',
        name: 'Calculus',
        time: '9:00 AM - 10:30 AM',
        color: '#000'
    },
    {
        icon: 'flask',
        name: 'Physics',
        time: '11:00 AM - 12:30 PM',
        color: 'black'
    },
    {
        icon: 'desktop',
        name: 'Computer Science',
        time: '2:00 PM - 3:30 PM',
        color: '#000'
    }
  ]

  return (
    <View className="flex-1">
      {/* Header */}
      <View className="bg-[#86C3E5] shadow-md" style={{ paddingTop: StatusBar.currentHeight }}>
        <View className="flex-row items-center h-20 px-4">
          <TouchableOpacity 
            onPress={toggleDrawer} 
            className="mr-4 p-2 rounded-lg bg-white/20"
            activeOpacity={0.7}
          >
            <Image
            source={require('../../assets/images/Icon.png')}
            style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <Text className="text-black font-semibold text-xl flex-1" numberOfLines={1}>Dashboard</Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 bg-[#CEEDFF] p-6">
        
        {/* Subject Cards */}
        <View className="gap-4 mb-8">
          {subjects.map((subject, index) => (
            <View 
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm flex-row items-center"
            >
              <View 
                className="w-14 h-14 rounded-full items-center justify-center mr-4"
                style={{ backgroundColor: `${subject.color}20` }}
              >
                <Ionicons name={subject.icon} size={28} color={subject.color} />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">{subject.name}</Text>
                <Text className="text-gray-600 text-sm">{subject.time}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Quick Stats */}
        <View className="flex-row justify-between gap-4">
          <View className="bg-white p-4 rounded-xl shadow-sm flex-1 ml-2 items-center">
            <Ionicons name="ribbon-outline" size={32} color="#000" />
            <Text className="text-gray-600 mt-2">Grades</Text>
            <Text className="text-2xl font-bold text-gray-800">92%</Text>
          </View>
          <View className="bg-white p-4 rounded-xl shadow-sm flex-1 mr-2 items-center">
            <Ionicons name="checkmark-done-outline" size={32} color="#000" />
            <Text className="text-gray-600 mt-2">Attendance</Text>
            <Text className="text-2xl font-bold text-gray-800">95%</Text>
          </View>
        </View>
        <View 
        className="bg-white p-4 rounded-xl shadow-sm mt-4 items-center">
          <Ionicons name='cash-outline' size={32} color="#000" />
          <Text className="text-gray-600 mt-2">Pending Fees</Text>
          <Text className="text-2xl font-bold text-gray-800">$1,200</Text>
        </View>

      </View>

      {/* Animated Overlay */}
      <Animated.View 
        className="absolute inset-0 bg-black"
        style={{
          opacity: overlayAnim,
          height: height,
          pointerEvents: isDrawerOpen ? 'auto' : 'none'
        }}
        pointerEvents={isDrawerOpen ? 'auto' : 'none'}
      >
        <TouchableOpacity 
          activeOpacity={1}
          className="flex-1"
          onPress={toggleDrawer}
        />
      </Animated.View>

      {/* Drawer */}
      <Animated.View 
        className="absolute top-0 left-0 w-[80%] shadow-2xl bg-[#86C3E5]"
        style={{
          height: height,
          transform: [{ translateX: slideAnim }],
        }}
      >
       
          {/* Close Button */}
          <View className="absolute top-12 right-4 z-10">
            <Pressable
              onPress={toggleDrawer}
              className="p-2 rounded-full bg-white/30"
            >
              <Ionicons name="close" size={24} color="#000" />
            </Pressable>
          </View>

          {/* Drawer Header */}
          <View className="pt-16 pb-6 px-6">
            {/* Menu Image */}
            <View className="items-center">
              <Image
                source={require('../../assets/images/menu.png')}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </View>

          {/* Menu Items */}
          <View className="flex-1 px-6">
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                className="flex-row items-center py-4 px-4 mb-3 rounded-xl bg-white/90 shadow-sm"
                activeOpacity={0.7}
              >
                <View 
                  className="w-10 h-10 rounded-lg items-center justify-center mr-4"
                  style={{ backgroundColor: `${item.color}20` }}
                >
                  <Ionicons name={item.icon} size={20} color={item.color} />
                </View>
                <Text className="text-gray-800 text-lg font-medium">{item.label}</Text>
                <View className="flex-1" />
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Drawer Footer */}
          <View className="pb-24 px-6">
            <TouchableOpacity
              className="flex-row items-center py-4 px-4 rounded-xl bg-white/90 shadow-sm"
              activeOpacity={0.7}
            >
              <View className="w-10 h-10 rounded-lg items-center justify-center mr-4">
                <Image
                  source={require('../../assets/images/Logout Icon.png')}
                  style={{ width: 20, height: 20 }}
                />
              </View>
              <Text className="text-gray-800 text-lg font-medium">Logout</Text>
            </TouchableOpacity>
          </View>
      </Animated.View>
    </View>
  )
}

export default Dashboard