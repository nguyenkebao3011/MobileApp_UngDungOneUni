import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Button,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/Fontisto';
type NavigationProp = StackNavigationProp<RootStackParamList, 'DangNhap'>;
const DangNhapScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <ImageBackground
      source={require('../assets/loginbkg-2.png')}
      style={styles.background}
      resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>ĐĂNG NHẬP</Text>
          <Text style={styles.subtitleText}>
            Vui lòng nhập thông tin để đăng nhập hệ thống!
          </Text>
        </View>

        {/* Form đăng nhập */}
        <View style={styles.form}>
          {/* Ô nhập tài khoản */}
          <View style={styles.inputContainer}>
            <Icon name="person" size={24} color="#999" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập tài khoản"
              placeholderTextColor="#ccc"
              // value={TaiKhoanDangNhap}
              // onChangeText={setUsername}
            />
          </View>

          {/* Ô nhập mật khẩu */}
          <View style={styles.inputContainer}>
            <Icon name="locked" size={24} color="#999" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu"
              placeholderTextColor="#ccc"
              secureTextEntry
              // value={MatKhau}
              // onChangeText={setPassword}
            />
          </View>
          {/* Nút đăng nhập */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              navigation.replace('Main');
            }}>
            <Text style={styles.btnText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    marginTop: 250,
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 40,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitleText: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'black',
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#1bcdff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DangNhapScreen;
