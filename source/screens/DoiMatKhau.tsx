import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

const {width} = Dimensions.get('window');
type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
const DoiMatKhau = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFormValid =
    currentPassword !== '' && newPassword !== '' && confirmPassword !== '';

  const navigation = useNavigation<NavigationProp>();
  return (
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
          ĐỔI MẬT KHẨU
        </Text>
      </View>
      <View style={styles.form}>
        <Text>Mật khẩu hiện tại:</Text>
        <View style={styles.lable}>
          <TextInput
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrentPassword}
            style={styles.lableText}></TextInput>
          <TouchableOpacity
            onPress={() => setShowCurrentPassword(!showCurrentPassword)} // Xử lý khi nhấn vào con mắt
            style={styles.iconContainer}>
            <Icon
              name={showCurrentPassword ? 'eye-off' : 'eye'} // Icon động theo trạng thái
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
        <Text>Mật khẩu mới:</Text>
        <View style={styles.lable}>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            style={styles.lableText}></TextInput>
          <TouchableOpacity
            onPress={() => setShowNewPassword(!showNewPassword)} // Xử lý khi nhấn vào con mắt
            style={styles.iconContainer}>
            <Icon
              name={showNewPassword ? 'eye-off' : 'eye'} // Icon động theo trạng thái
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
        <Text>Nhập lại mật khẩu mới:</Text>
        <View style={styles.lable}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            style={styles.lableText}></TextInput>
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)} // Xử lý khi nhấn vào con mắt
            style={styles.iconContainer}>
            <Icon
              name={showConfirmPassword ? 'eye-off' : 'eye'} // Icon động theo trạng thái
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.btn, !isFormValid && styles.btnDisabled]}
        disabled={!isFormValid}>
        <Text style={styles.btnText}>XÁC NHẬN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DoiMatKhau;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    backgroundColor: '#0064e0',
    zIndex: 10,
  },
  form: {
    marginTop: 40,
  },
  lable: {
    borderWidth: 1,
    flexDirection: 'row',
  },
  lableText: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  iconContainer: {
    padding: 10,
    right: 10,
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#0064e0',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: '#aaa',
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  iconback: {
    marginTop: 40,
    fontSize: 25,
    color: 'white',
    marginLeft: 20,
  },
});
