import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {ChucNang} from '../components/Class/ChucNang';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {masinhvien} from './DangNhapScreen';

import axios from 'axios';

const Tab = createBottomTabNavigator();
type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
const Home = () => {
  const [hoTen, setHoTen] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const ListChucNang: ChucNang[] = [
    new ChucNang(7, 'Xem điểm', 'star', 'XemDiem', undefined, '#4A90E2'),
    new ChucNang(
      8,
      'Lịch học/Lịch thi',
      'calendar-outline',
      'LichHoc',
      undefined,
      '#7ED321',
    ),
    new ChucNang(
      9,
      'Thống kê điểm danh',
      'cellular-outline',
      'DiemDanh',
      undefined,
      '#F5A623',
    ),
    new ChucNang(
      10,
      'Thanh toán học phí',
      'card-outline',
      undefined,
      undefined,
      '#D0021B',
    ),
    new ChucNang(
      11,
      'Thành tích',
      'sparkles-outline',
      undefined,
      undefined,
      '#50E3C2',
    ),
  ];
  // const hoten =
  //   dsSinhVien.find(ma => ma.MaSV === masinhvien)?.HoTen || 'THIẾU TÊN';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.123:3000/sinhvien/search`,
          {
            params: {
              column: 'MaSV', // Tìm theo mã sinh viên
              value: masinhvien,
            },
          },
        );
        if (response.data.status === 'Thành công') {
          const data = response.data.data[0];
          setHoTen(data.HoTen);
        }
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể lấy thông tin sinh viên');
        console.error('Lỗi khi lấy thông tin sinh viên:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {/* Mảng xanh phía trên */}
      <View style={styles.header}>
        <Text
          style={{fontSize: 30, color: 'white', marginTop: 35, marginLeft: 20}}>
          Xin chào, <Text style={{fontWeight: 'bold'}}>{hoTen}</Text>
        </Text>
      </View>

      {/* Chức năng */}
      <Text style={styles.title}>Chức năng</Text>

      {/* Danh sách chức năng */}
      <View style={styles.list}>
        {ListChucNang.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() =>
              navigation.navigate(item.screen as keyof RootStackParamList)
            }>
            <View style={[styles.iconContainer, {backgroundColor: item.color}]}>
              <Icon name={item.icon} size={30} color="#FFF" />
            </View>
            <Text style={styles.label}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40, // Đẩy nội dung xuống dưới để tránh trùng vào viền trên
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 20, // Khoảng cách với danh sách
    backgroundColor: '#1bcdff',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly', // Chia đều khoảng cách giữa các ô
  },
  header: {
    backgroundColor: '#0a66b1',
    top: 0,
    left: 0,
    right: 0,
    bottom: '80%',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
    position: 'absolute',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 180, // Đẩy phần chức năng xuống dưới header
    marginBottom: 20,
  },
  item: {
    width: '28%', // Để trừ hao lề, tránh bị tràn
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30, // Tạo hình tròn
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
});
