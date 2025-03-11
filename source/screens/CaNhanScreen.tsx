import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ChucNang} from '../components/Class/ChucNang';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const CaNhanScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation<NavigationProp>();
  const ListClass: ChucNang[] = [
    new ChucNang(
      1,
      'Thông tin sinh viên',
      'id-card',
      'ThongTinSV',
      'caret-forward',
    ),
    new ChucNang(2, 'Đổi mật khẩu', 'time', 'DoiMatKhau', 'caret-forward'),
    new ChucNang(
      3,
      'Điều khoản và chính sách ứng dụng',
      'document-text',
      'DieuKhoan',
      'caret-forward',
    ),
    new ChucNang(4, 'Góp ý ứng dụng', 'mail', 'GopY', 'caret-forward'),
    new ChucNang(5, 'Thông Báo', 'notifications', '', 'notification'),
    new ChucNang(6, 'Đăng xuất', 'log-out', 'DangNhap', 'caret-forward'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Mảng xanh phía trên */}
      <View style={styles.header}>
        <Text
          style={{
            marginLeft: 30,
            fontSize: 20,
            color: 'white',
            marginTop: 35,
            fontWeight: 'bold',
          }}>
          Nguyễn Kế Bảo
        </Text>
        <Text style={{marginLeft: 30, fontSize: 18, color: 'white'}}>
          MSSV:2001215616
        </Text>
      </View>
      <View style={styles.list}>
        {ListClass.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() =>
              navigation.navigate(item.screen as keyof RootStackParamList)
            }>
            <View style={[styles.iconContainer]}>
              <Icon name={item.icon} size={30} color="blue" />
            </View>
            <Text style={styles.label}>{item.name}</Text>

            {/* Switch cho mục "Thông Báo" */}
            {item.id === 5 ? (
              <Switch
                style={styles.icon2}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            ) : (
              item.icon2 && (
                <Icon style={styles.icon2} name={item.icon2 ?? ''} size={20} />
              )
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default CaNhanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40, // Đẩy nội dung xuống dưới để tránh trùng vào viền trên
  },
  header: {
    backgroundColor: '#0C74A2',
    top: 0,
    left: 0,
    right: 0,
    bottom: '90%',
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
    position: 'absolute',
  },
  list: {
    backgroundColor: '#fff',
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'stretch',
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row', // Sắp xếp icon và label trên cùng một hàng
    alignItems: 'center', // Căn giữa theo chiều dọc
  },

  iconContainer: {
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 20, // Tạo hình tròn
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D5D5D5',
  },
  label: {
    fontSize: 16,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon2: {
    position: 'absolute',
    right: 20,
    color: '#3D3D3D',
  },
});
