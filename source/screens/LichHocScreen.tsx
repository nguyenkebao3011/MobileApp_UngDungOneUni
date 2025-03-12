import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import getFormattedDate from '../components/Date/GetDay';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
import {dsLichHoc} from '../components/Class/LichHoc';
import {dsMonHoc} from '../components/Class/MonHoc';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
const {width} = Dimensions.get('window');
const LichHocScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const onChange = (_event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false); // Ẩn DateTimePicker sau khi chọn
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const filteredLichHoc = dsLichHoc
    .filter(lich => {
      const selectedDate = new Date(date).setHours(0, 0, 0, 0);
      const ngayHoc = new Date(lich.ngayHoc).setHours(0, 0, 0, 0);
      return ngayHoc === selectedDate;
    })
    .flatMap(lich => lich.maMH.map(ma => dsMonHoc.find(mh => mh.maMH === ma)))
    .filter(monHoc => monHoc !== undefined);
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.subjectTitle}>{item?.tenMH}</Text>
      <Text style={styles.subjectDetail}>
        <Text style={styles.label}>Tiết:</Text> {item?.tiet}
      </Text>
      <Text style={styles.subjectDetail}>
        <Text style={styles.label}>Phòng:</Text> {item?.phong}
      </Text>
      <Text style={styles.subjectDetail}>
        <Text style={styles.label}>Giảng viên:</Text>{' '}
        <Text style={{fontWeight: 'bold'}}>{item?.giangVien}</Text>
      </Text>
    </View>
  );
  const navigation = useNavigation<NavigationProp>();
  return (
    <ScrollView>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon style={styles.iconback} name="arrow-back-outline"></Icon>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lịch học/lịch thi</Text>
        </View>

        {/* Date Picker */}
        <TouchableOpacity style={styles.tabDate} onPress={showDatePicker}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {getFormattedDate(date)}
          </Text>
          <Icon name="caret-down-outline" size={18} color="black" />
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        {/* Danh sách môn học */}
        <FlatList
          data={filteredLichHoc}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.noDataText}>Không có lịch học nào</Text>
          }
        />
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
  },
  tabDate: {
    flexDirection: 'row',
    backgroundColor: '#eef3f7',
    color: '#7d8b9b',
    borderRadius: 8,
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    marginRight: 30,
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
    color: '#2d3436',
    marginBottom: 5,
  },
  subjectDetail: {
    fontSize: 14,
    color: 'black',
    marginBottom: 3,
  },
  noDataText: {
    fontSize: 16,
    color: '#7d8b9b',
    textAlign: 'center',
    marginTop: 20,
  },
  label: {
    fontWeight: 'bold',
    color: '#2d3436',
  },
  iconback: {
    marginTop: 40,
    fontSize: 25,
    color: 'white',
    marginLeft: 20,
  },
});
