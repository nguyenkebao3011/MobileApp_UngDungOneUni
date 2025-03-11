import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import getFormattedDate from '../components/Date/GetDay';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';

const {width} = Dimensions.get('window');
const LichHocScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false); // Ẩn DateTimePicker sau khi chọn
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              justifyContent: 'center',
              textAlign: 'center',
              marginTop: 60,
              color: '#fff',
            }}>
            Lịch học/lịch thi
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.tabDate} onPress={showDatePicker}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {getFormattedDate(date)}
            </Text>
            <Icon name="caret-down-outline" size={18} color="black" />
          </TouchableOpacity>
        </View>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <View></View>
      </SafeAreaView>
    </>
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
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  tabDate: {
    flexDirection: 'row',
    backgroundColor: '#eef3f7',
    color: '#7d8b9b',
    borderRadius: 8,
  },
});
