import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import getFormattedDate from '../components/Date/GetDay';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import {masinhvien} from './DangNhapScreen';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const {width} = Dimensions.get('window');

interface LichHoc {
  NgayHoc: string;
  MonHoc: string;
  TietHoc: string;
  PhongHoc: string;
}

const LichHocScreen = () => {
  const [data, setData] = useState<LichHoc[]>([]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://192.168.0.123:3000/lichhoc', {
          params: {
            MaSV: masinhvien,
          },
        });
        console.log('API Response:', response.data);

        if (response.data.status === 'Thành công') {
          setData(response.data.data);
        } else {
          setError('Không có dữ liệu lịch học.');
        }
      } catch (err) {
        setError('Lỗi khi lấy dữ liệu từ máy chủ.');
        console.error('Lỗi khi lấy dữ liệu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hiển thị DateTimePicker
  const showDatePicker = () => setShowPicker(true);

  // Xử lý khi chọn ngày
  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  // Lọc dữ liệu theo ngày đã chọn
  const filteredData = data.filter(item => {
    const itemDate = new Date(item.NgayHoc).toDateString();
    const selectedDate = date.toDateString();
    return itemDate === selectedDate;
  });

  // Render item trong FlatList
  const renderItem = ({item}: {item: LichHoc}) => (
    <View style={styles.card}>
      <Text style={styles.subjectTitle}>{item.MonHoc}</Text>
      <Text style={styles.subjectDetail}>
        <Text style={styles.label}>Tiết học:</Text> {item.TietHoc}
      </Text>
      <Text style={styles.subjectDetail}>
        <Text style={styles.label}>Phòng học:</Text> {item.PhongHoc}
      </Text>
      <Text style={styles.subjectDetail}>
        <Text style={styles.label}>Ngày học:</Text>{' '}
        {getFormattedDate(new Date(item.NgayHoc))}
      </Text>
    </View>
  );

  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon style={styles.iconback} name="arrow-back-outline" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lịch học/Lịch thi</Text>
        </View>

        {/* CHỌN NGÀY */}
        <TouchableOpacity style={styles.tabDate} onPress={showDatePicker}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {getFormattedDate(date)}
          </Text>
          <Icon name="caret-down-outline" size={18} color="black" />
        </TouchableOpacity>

        {/* DateTimePicker */}
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        {/* HIỂN THỊ DỮ LIỆU */}
        {loading ? (
          <Text style={styles.noDataText}>Đang tải dữ liệu...</Text>
        ) : error ? (
          <Text style={styles.noDataText}>{error}</Text>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={item => item.NgayHoc}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <Text style={styles.noDataText}>Không có lịch học nào</Text>
            }
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default LichHocScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabDate: {
    flexDirection: 'row',
    backgroundColor: '#eef3f7',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 25,
    color: 'white',
  },
  listContainer: {
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subjectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subjectDetail: {
    fontSize: 14,
    marginBottom: 3,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  iconback: {
    fontSize: 25,
    color: 'white',
    marginRight: 350,
    marginTop: 30,
  },
});
