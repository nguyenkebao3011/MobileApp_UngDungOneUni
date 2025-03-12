import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DangNhapScreen from '../MyApp/source/screens/DangNhapScreen';
import MainTab from '../MyApp/source/screens/MainTab';
import ThongTinSinhVienScreen from './source/screens/ThongTinSinhVienScreen';
import DoiMatKhau from './source/screens/DoiMatKhau';
import DieuKhoan from './source/screens/DieuKhoan';
import GopY from './source/screens/GopY';
import LichHocScreen from './source/screens/LichHocScreen';
import DiemDanhScreen from './source/screens/DiemDanhScreen';

export type RootStackParamList = {
  DangNhap: undefined;
  Main: undefined;
  XemDiem: undefined;
  LichHoc: undefined;
  ThongKe: undefined;
  ThanhToan: undefined;
  ThanhTich: undefined;
  ThongTinSV: undefined;
  DoiMatKhau: undefined;
  DieuKhoan: undefined;
  GopY: undefined;
  DiemDanh: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="DangNhap"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="DangNhap" component={DangNhapScreen} />
          <Stack.Screen name="Main" component={MainTab} />
          <Stack.Screen name="ThongTinSV" component={ThongTinSinhVienScreen} />
          <Stack.Screen name="DoiMatKhau" component={DoiMatKhau} />
          <Stack.Screen name="DieuKhoan" component={DieuKhoan} />
          <Stack.Screen name="GopY" component={GopY} />
          <Stack.Screen name="LichHoc" component={LichHocScreen} />
          <Stack.Screen name="DiemDanh" component={DiemDanhScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
