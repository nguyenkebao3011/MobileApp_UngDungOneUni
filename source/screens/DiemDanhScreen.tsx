import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
const DiemDanhScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={styles.iconback} name="arrow-back-outline"></Icon>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 'auto',
          }}>
          Thông tin điểm danh
        </Text>
      </View>
      <View style={styles.info}>
        <Image
          source={require('../assets/wow.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.noDataText}>Không có thông tin điểm danh</Text>
      </View>
    </SafeAreaView>
  );
};

export default DiemDanhScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    backgroundColor: '#0064e0',
    top: 0,
    left: 0,
    right: 0,
    width: width,
    position: 'absolute',
    height: 100,
    zIndex: 10,
  },
  noDataText: {
    fontSize: 16,
    color: '#7d8b9b',
    textAlign: 'center',
  },
  info: {
    marginTop: 260,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: width * 0.6, // Kích thước ảnh bằng 60% chiều rộng màn hình
    height: height * 0.3, // Kích thước ảnh bằng 30% chiều cao màn hình
    marginBottom: 20, // Khoảng cách giữa ảnh và văn bản
  },
  iconback: {
    marginTop: 40,
    fontSize: 25,
    color: 'white',
    marginLeft: 20,
  },
});
