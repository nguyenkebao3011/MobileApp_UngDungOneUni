import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;
const GopY = () => {
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigation<NavigationProp>();
  const handleSubmit = () => {
    if (feedback.trim() === '') {
      Alert.alert('Vui lòng nhập nội dung góp ý!');
      return;
    }
    // Xử lý gửi góp ý
    console.log('Góp ý:', feedback);
    Alert.alert('Cảm ơn bạn đã gửi góp ý!');
    navigation.goBack();
    setFeedback('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={styles.iconback} name="arrow-back-outline"></Icon>
        </TouchableOpacity>
        <Text style={styles.title}>GÓP Ý</Text>
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        {/* Ô nhập góp ý */}
        <TextInput
          style={styles.input}
          placeholder="Nhập nội dung góp ý..."
          multiline
          numberOfLines={5}
          value={feedback}
          onChangeText={setFeedback}
        />

        {/* Nút gửi */}
        <TouchableOpacity
          style={[
            styles.button,
            feedback.trim() === '' && styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={feedback.trim() === ''}>
          <Text style={styles.buttonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GopY;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#0064e0',
    paddingTop: 40,
    paddingBottom: 20,
    zIndex: 10,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    marginRight: 10,
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: '#0064e0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', // Đảm bảo nút rộng theo container
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
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
