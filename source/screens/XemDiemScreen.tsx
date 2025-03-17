import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import axios from 'axios';
import {masinhvien} from './DangNhapScreen';
import {KetQuaHT} from '../components/Class/KetQuaHT';

const {width} = Dimensions.get('window');
type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const XemDiemScreen = () => {
  const [ketqua, setKq] = useState<KetQuaHT[]>([]);
  const [selectedMonHoc, setSelectedMonHoc] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.123:3000/ketquaht', {
          params: {
            MaSV: masinhvien,
          },
        });
        if (response.data.status === 'Thành công') {
          const data = response.data.data.map(
            (item: any) =>
              new KetQuaHT(
                item?.MaMH ?? '',
                item?.TenMH ?? '',
                item?.DiemQuaTrinh ?? 0,
                item?.DiemKT1 ?? 0,
                item?.DiemKT2 ?? 0,
                item?.DiemCuoiKy ?? 0,
              ),
          );
          setKq(data);
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon style={styles.iconback} name="arrow-back-outline" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Kết quả học tập</Text>
        </View>

        {/* Danh sách các môn học */}
        <View style={styles.infomation}>
          {ketqua.map(item => (
            <View key={item.MaMH}>
              {/* Tên môn học */}
              <TouchableOpacity
                style={styles.row}
                onPress={() =>
                  setSelectedMonHoc(
                    selectedMonHoc === item.MaMH ? null : item.MaMH,
                  )
                }>
                <Text style={styles.label_Text}>{item.TenMH}</Text>
              </TouchableOpacity>

              {/* Thông tin chi tiết khi nhấn vào */}
              {selectedMonHoc === item.MaMH && (
                <View style={styles.details}>
                  <View style={styles.row}>
                    <Text style={styles.labelText}>Điểm quá trình:</Text>
                    <Text style={styles.infoText}>{item.DiemQuaTrinh}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.labelText}>Điểm KT1:</Text>
                    <Text style={styles.infoText}>{item.DiemKT1}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.labelText}>Điểm KT2:</Text>
                    <Text style={styles.infoText}>{item.DiemKT2}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.labelText}>Điểm cuối kỳ:</Text>
                    <Text style={styles.infoText}>{item.DiemCuoiKy}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.labelText}>Điểm tổng kết:</Text>
                    <Text style={styles.infoText}>
                      {item.DiemTongKet.toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.labelText}>Kết quả:</Text>
                    <Text
                      style={[
                        styles.infoText,
                        item.KetQua === 'Giỏi'
                          ? styles.good
                          : item.KetQua === 'Khá'
                          ? styles.fair
                          : item.KetQua === 'Trung bình'
                          ? styles.average
                          : styles.poor,
                      ]}>
                      {item.KetQua}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default XemDiemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#F5F5F5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: 100,
    backgroundColor: '#0064e0',
    zIndex: 10,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    marginLeft: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infomation: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 10,
    padding: 15,
  },
  row: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  labelText: {
    color: '#black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label_Text: {
    color: '#0064e0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'right',
  },
  details: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 5,
    borderRadius: 8,
  },
  iconback: {
    fontSize: 25,
    color: 'white',
    marginTop: 40,
    marginLeft: 30,
  },
  good: {
    color: '#4CAF50',
  },
  fair: {
    color: '#FFC107',
  },
  average: {
    color: '#2196F3',
  },
  poor: {
    color: '#F44336',
  },
});
