import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SinhVien} from '../components/Class/SinhVien';
import {masinhvien} from './DangNhapScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
const ThongTinSinhVienScreen = () => {
  const [thongtin, setThongtin] = useState<SinhVien>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://192.168.0.123:3000/sinhvien/search',
          {
            params: {
              column: 'MaSV',
              value: masinhvien,
            },
          },
        );
        console.log('API Response:', response.data); // Kiểm tra dữ liệu từ API
        if (response.data.status === 'Thành công') {
          const data = response.data.data[0];
          const sinhVien = new SinhVien(
            data?.MaSV ?? '',
            data?.HoTen ?? '',
            data?.NgaySinh ? new Date(data?.NgaySinh) : new Date(),
            data?.GioiTinh ?? '',
            data?.TenKhoa ?? '',
            data?.TenLop ?? '',
            data?.BacDaoTao ?? '',
            data?.LoaiHinhDaoTao ?? '',
            data?.KhoaHoc ?? '',
            data?.TenNganh ?? '',
            data?.NoiSinh ?? '',
            data?.DiaChi ?? '',
            data?.SoDienThoai ?? '',
            data?.TrangThai ?? '',
            data?.TenChuyenNganh ?? '',
          );
          setThongtin(sinhVien);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData(); // Gọi hàm lấy dữ liệu khi component được render
  }, []);

  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon style={styles.iconback} name="arrow-back-outline"></Icon>
          </TouchableOpacity>

          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: 25,
              color: 'white',
              marginRight: 30,
              marginTop: 20,
            }}>
            Thông tin sinh viên
          </Text>
        </View>
        <View style={styles.infomation}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 30,
              textAlign: 'center',
            }}>
            {thongtin?.HoTen}
          </Text>
          <View style={styles.row}>
            <Text style={styles.labelText}>Mã sinh viên:</Text>
            <Text style={styles.infoText}>{thongtin?.MaSV}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Ngày sinh:</Text>
            <Text style={styles.infoText}>
              {thongtin?.NgaySinh?.toLocaleDateString('vi-VN')}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Giới tính:</Text>
            <Text style={styles.infoText}>{thongtin?.GioiTinh}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Khoa:</Text>
            <Text style={styles.infoText}>{thongtin?.TenKhoa}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Lớp:</Text>
            <Text style={styles.infoText}>{thongtin?.TenLop}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Bậc đào tạo:</Text>
            <Text style={styles.infoText}>{thongtin?.BacDaoTao}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Loại hình đào tạo:</Text>
            <Text style={styles.infoText}>{thongtin?.LoaiHinhDaoTao}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Khóa học:</Text>
            <Text style={styles.infoText}>{thongtin?.KhoaHoc}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Ngành:</Text>
            <Text style={styles.infoText}>{thongtin?.TenNganh}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Chuyên ngành:</Text>
            <Text style={styles.infoText}>{thongtin?.TenChuyenNganh}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Nơi sinh:</Text>
            <Text style={styles.infoText}>{thongtin?.NoiSinh}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Địa chỉ:</Text>
            <Text style={styles.infoText}>{thongtin?.DiaChi}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Số điện thoại:</Text>
            <Text style={styles.infoText}>{thongtin?.SoDienThoai}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Trạng thái:</Text>
            <Text style={styles.infoText}>{thongtin?.TrangThai}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ThongTinSinhVienScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#0064e0',
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: '90%',
    paddingLeft: 30,
  },
  infomation: {
    backgroundColor: '#fff',
    marginTop: 80,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    alignItems: 'center',
  },
  labelText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    width: 150, // Đặt độ rộng cố định cho label để thẳng hàng
  },
  infoText: {
    color: '#333',
    fontSize: 16,
    flex: 1,
    textAlign: 'right', // Căn thông tin về bên phải
  },
  iconback: {
    marginTop: 40,
    fontSize: 25,
    color: 'white',
  },
});
