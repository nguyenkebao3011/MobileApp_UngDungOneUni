import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');
type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
const DieuKhoan = () => {
  const [agreed, setAgreed] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const handleAgree = () => {
    if (agreed) {
      Alert.alert('Cảm ơn bạn đã đồng ý với điều khoản!');
      navigation.goBack();
    } else {
      Alert.alert('Vui lòng đồng ý với điều khoản trước khi tiếp tục.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon2 style={styles.iconback} name="arrow-back-outline"></Icon2>
        </TouchableOpacity>
        <Text style={styles.title}>ĐIỀU KHOẢN SỬ DỤNG</Text>
      </View>

      {/* Nội dung điều khoản */}
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.content}>
        <Text style={styles.text}>
          1. Khi sử dụng ứng dụng này, bạn đồng ý tuân thủ các điều khoản và
          điều kiện được nêu trong thỏa thuận sử dụng.{'\n\n'}
          2. Bạn không được phép sử dụng ứng dụng cho các mục đích bất hợp pháp
          hoặc vi phạm quyền của người khác.{'\n\n'}
          3. Ứng dụng có quyền thay đổi hoặc chấm dứt dịch vụ vào bất kỳ lúc nào
          mà không cần thông báo trước.{'\n\n'}
          4. Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh
          từ việc sử dụng ứng dụng.{'\n\n'}
          5. Bạn cam kết không thực hiện các hành vi gây ảnh hưởng đến hoạt động
          của ứng dụng.{'\n\n'}
          6. Khi sử dụng ứng dụng, bạn đồng ý với việc thu thập và xử lý thông
          tin cá nhân theo chính sách bảo mật của chúng tôi.{'\n\n'}
        </Text>
      </ScrollView>

      {/* Checkbox và Nút xác nhận */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAgreed(!agreed)}>
          <MaterialCommunityIcons
            name={agreed ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={24}
            color={agreed ? '#0064e0' : '#ccc'}
          />
          <Text style={styles.checkboxText}> Tôi đồng ý với điều khoản</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !agreed && styles.buttonDisabled]}
          onPress={handleAgree}
          disabled={!agreed}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DieuKhoan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: 100,
    backgroundColor: '#0064e0',
    zIndex: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    justifyContent: 'center',
    textAlign: 'center',
  },
  content: {
    marginTop: 120,
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#0064e0',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconback: {
    marginTop: 40,
    fontSize: 25,
    color: 'white',
    marginLeft: 20,
  },
});
