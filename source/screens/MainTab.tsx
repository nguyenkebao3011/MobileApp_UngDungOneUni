import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import LichHocScreen from './LichHocScreen';
import DiemDanhScreen from './DiemDanhScreen';
import CaNhanScreen from './CaNhanScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from 'react-native';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName: string;

            switch (route.name) {
              case 'Trang chủ':
                iconName = 'home-outline'; // Home icon
                break;
              case 'Lịch học':
                iconName = 'calendar-outline'; // Calendar icon
                break;
              case 'Điểm danh':
                iconName = 'checkbox-outline'; // Checkbox icon
                break;
              case 'Cá nhân':
                iconName = 'person-outline'; // Person icon
                break;
              default:
                iconName = 'alert-circle-outline';
                break;
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#1bcdff', // Màu icon khi được chọn
          tabBarInactiveTintColor: 'gray', // Màu icon khi không được chọn
          tabBarStyle: {
            backgroundColor: '#f8f8f8',
            height: 60, // Chiều cao của thanh Tab
            paddingBottom: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerShown: false, // Ẩn tiêu đề của màn hình
        })}>
        <Tab.Screen name="Trang chủ" component={HomeScreen} />
        <Tab.Screen name="Lịch học" component={LichHocScreen} />
        <Tab.Screen name="Điểm danh" component={DiemDanhScreen} />
        <Tab.Screen name="Cá nhân" component={CaNhanScreen} />
      </Tab.Navigator>
    </>
  );
};

export default MainTab;
